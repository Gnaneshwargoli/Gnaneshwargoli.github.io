import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import {JSONPath} from 'https://cdn.jsdelivr.net/npm/jsonpath-plus@10.1.0/dist/index-browser-esm.min.js';
import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";

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
      var titlefield=$("#_FDkgP4OPY8f");

    }						
                              
    render() {
      return html`<p>Hello ${this.who} ${this.titlefield}<p/>`;
    }
  }

const elementName = 'gnanplugin-webrequestdev';
customElements.define(elementName, GnanWebRequestSOAPDev);

