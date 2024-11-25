import { html,LitElement,css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';
import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";

class DevSoapRequestComponent extends LitElement {
    static styles = css` /* Add any CSS styles here */ `;
    static properties = {
        response: { type: String },
    };

    
    constructor() {
        super();
        this.response = '';
    }
    // Send SOAP request when the component is first updated 
    updated(changedProperties) {
        super.updated(changedProperties);
        if (!changedProperties.has('response')) { this.makeSoapRequest(); }
    }
    async makeSoapRequest() {
        const soapEnvelope = ` <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.example.com/webservice"> <soapenv:Header/> <soapenv:Body> <web:YourMethod> <web:Parameter1>Value1</web:Parameter1> <web:Parameter2>Value2</web:Parameter2> </web:YourMethod> </soapenv:Body> </soapenv:Envelope> `;
        try {
            const response = await fetch('https://your-soap-service-url', {
                method: 'POST', headers: {
                    'Content-Type': 'text/xml; charset=utf-8',
                    'SOAPAction': 'http://www.example.com/webservice/YourMethod',
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
        return html` <div> <h2>SOAP Request Example</h2> <pre>${this.response}</pre> </div> `;
    }
}
customElements.define('soap-request-component', DevSoapRequestComponent);
