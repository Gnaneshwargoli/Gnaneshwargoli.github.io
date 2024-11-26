import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';
import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";

export class GnanWebRequestSOAPDev extends LitElement {

   


    static properties = {
      who: {type: String},
       response: { type: String },
    };

    static getMetaConfig() {
        return {
          controlName: 'Test Plugin Dev',
          fallbackDisableSubmit: false,
          version: '1.2',
          properties: {
            who: {
              type: 'string',
              title: 'Who',
              description: 'Who to say hello to'
            }
          }
        };
      }	
      
    constructor() {
      super();
      this.who = 'World';
       this.response='';

    }	

    connectedCallback() {      
   
    super.connectedCallback(); 
       this.makeSoapRequest();
    
  }

   // Send SOAP request when the component is first updated 
    updated(changedProperties) {
        super.updated(changedProperties);
        if (!changedProperties.has('response')) { this.makeSoapRequest(); }
    }

    async makeSoapRequest() {
       const serviceID='ERA-PMT-PNCIHierarchyInfo-serviceID';
       const servicePassword='R404?d!$5dsiC3YagT+1A$M*iSUcqZ';
       const nonce='BwFC2HW6jfMgHr/N9OCyfw==';
       const createdDate='2017-12-14T21:23:28.843Z';
       const repIDInfo='1234';
        const soapEnvelope = `
          <soapenv:Envelope xmlns:get=\"http://www.pnc.com/pmt/GetRKIInfoService/\" xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\"> 
              <soapenv:Header> 
              <wsse:Security soapenv:mustUnderstand=\"1\" xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\" xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">
                  <wsse:UsernameToken wsu:Id=\"UsernameToken-1\">
                      <wsse:Username>  ${serviceID} </wsse:Username>
                      <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\"> ${servicePassword} </wsse:Password>
                      <wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\"> ${nonce}</wsse:Nonce>
                      <wsu:Created> ${createdDate} </wsu:Created>
                  </wsse:UsernameToken>
              </wsse:Security>
              </soapenv:Header>
              <soapenv:Body>
                  <get:PNCIHierarchyInfoRequest >${repIDInfo} </get:PNCIHierarchyInfoRequest>
               </soapenv:Body>
          </soapenv:Envelope>`;
        try {
            const response = await fetch('https://pmt-sst-qa.pncint.net/pmt-getrkiinfoService', {
                method: 'POST', headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                    'SOAPAction': 'getPNCIHierarchyInfo',
                    // Modify the action based on your SOAP service 
                },
                body: soapEnvelope,
            });
            if (response.ok) {
                const xml = await response.text();
                this.response = xml;
                // Handle the XML response here 
            }
            else { this.response = 'Error: ' + response.statusText; }
        }
        catch (error) {
            this.response = 'Error: ' + error.message;
        }
    }
                              
    render() {
      return html`<p>Hello ${this.who} ${this.response}<p/>`;
    }
  }

const elementName = 'gnanplugin-webrequestdev';
customElements.define(elementName, GnanWebRequestSOAPDev);

