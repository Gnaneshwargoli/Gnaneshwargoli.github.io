import { html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class RicohTestBasicPlugin extends LitElement {

    static properties = {
        who: { type: String },
    };

    // return a promise for contract changes.
    static getMetaConfig() {
        return {
             //groupName : "ONC Custom (Dont use)",
            controlName: 'Hello World',
            fallbackDisableSubmit: false,
            version: '1.0',
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
    }

    render() {
        return html`<p>Hello ${this.who}<p/>`;
    }
}

// registering the web component
const elementName = 'ricoh-testplugin-test1';
customElements.define(elementName, RicohTestBasicPlugin);