import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
export class GnanWebRequestSOAPDev extends LitElement {
    static properties = {
      who: {type: String},
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
    }						
                              
    render() {
      return html`<p>Hello ${this.who}<p/>`;
    }
  }

const elementName = 'GnanPlugin-WebrequestDev';
customElements.define(elementName, GnanWebRequestSOAPDev);

