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
       console.log("calling soap endpoint -start");
      // this.Testsoap();
    console.log("calling soap endpoint -end");
  }

   // Send SOAP request when the component is first updated 
    updated(changedProperties) {
        super.updated(changedProperties);
        if (!changedProperties.has('response')) { //this.makeSoapRequest(); }
    }

    Testsoap_bak() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://pmt-sst-qa.pncint.net/pmt-eradblookupservice/', true);

            // build SOAP request
            var sr =`
               <?xml version="1.0" encoding="utf-8"?>
                <soapenv:Envelope 
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    xmlns:api="http://www.pnc.com/pmt/ERADBLookupService" 
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                    <soapenv:Body>
                        <api:some_api_call soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
                            <username xsi:type="xsd:string">era-pmt-branchinfo-serviceid</username>
                            <password xsi:type="xsd:string">_pkJ59$=XVs.gWM7wP:539p$_$@]uX</password>
                        </api:some_api_call>
                    </soapenv:Body>
                </soapenv:Envelope>`;

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        //alert(xmlhttp.responseText);
                       
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.send(sr);
            // send request
            // ...
        }

   

    async makeSoapRequest() {
       const serviceID='era-pmt-branchinfo-serviceid';
       const servicePassword='_pkJ59$=XVs.gWM7wP:539p$_$@]uX';
       const nonce='BwFC2HW6jfMgHr/N9OCyfw==';
       const createdDate='2017-12-14T21:23:28.843Z';
       const repIDInfo='1234';
        const soapEnvelope = `
          <soapenv:Envelope xmlns:erad="http://www.pnc.com/pmt/ERADBLookupService" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
                <soapenv:Header>
                    <wsse:Security soapenv:mustUnderstand="1" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
                        <wsse:UsernameToken wsu:Id="UsernameToken-4EC151B4BE18CC0AB515084488315391">
                            <wsse:Username>${serviceID}</wsse:Username>
                            <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText">${servicePassword}</wsse:Password>
                        </wsse:UsernameToken>
                    </wsse:Security>
                </soapenv:Header>
                <soapenv:Body>
                    <erad:MarketNameRequest>
                        <erad:listMarkets>true</erad:listMarkets>
                         <erad:listFutureMarkets>false</erad:listFutureMarkets>
                    </erad:MarketNameRequest>
                </soapenv:Body>
            </soapenv:Envelope>`;
        try {
            const response = await fetch('https://pmt-sst-qa.pncint.net/pmt-eradblookupservice/', {
                method: "POST", 
               headers: {
                    'Content-Type': 'text/xml; charset="utf-8"',
                    'SOAPAction': 'getMarketNameList',
                    // Modify the action based on your SOAP service 
                },
                body: soapEnvelope,
            });
            if (response.ok) {
                const xml = await response.text();
               console.log("Response:",xml);
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

