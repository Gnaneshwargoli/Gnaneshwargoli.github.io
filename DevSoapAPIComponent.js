import { LitElement, html, css, customElement, property } from 'lit';
@customElement('soap-api-component')

export class SoapApiComponent extends LitElement {

    @property({ type: String }) response = '';

    // Method to send SOAP request 
    async callSoapApi() {
        const url = 'http://example.com/soap-endpoint'; // Replace with your SOAP service endpoint 
        const soapRequest = ` 
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://example.com/"> 
            <soapenv:Header/> 
                <soapenv:Body> 
                    <web:SomeSOAPMethod> 
                        <web:param1>value1</web:param1> 
                        <web:param2>value2</web:param2> 
                    </web:SomeSOAPMethod> 
                </soapenv:Body> 
        </soapenv:Envelope> `;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'SOAPAction': '"http://example.com/SomeSOAPMethod"' // Replace with actual SOAPAction if necessary 
                },
                body: soapRequest
            });

            const text = await response.text();
            this.response = text;
            // Store the response XML as a string 
        }
        catch (error) {
            console.error('Error calling SOAP API:', error);
            this.response = 'Error calling SOAP API';
        }
    }

    static styles = css` 
    button 
    { 
        font-size: 16px; 
        padding: 10px 20px; 
        cursor: pointer; 
        } 
        
        pre 
        { 
        background-color: #f4f4f4;
         padding: 10px; 
         border: 1px solid #ccc; 
         white-space: pre-wrap; 
         word-wrap: break-word; 
         } 
         `;

    // Render method 
    render() {
        return html` <div> <button @click="${this.callSoapApi}">Call SOAP API</button> <pre>${this.response}</pre> </div> `;
    }
}