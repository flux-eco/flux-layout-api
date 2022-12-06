import { ContentContainerTemplate } from './ContentContainerTemplate.mjs';
import ContentContainerAttributes from './ContentContainerAttributes.mjs';
import MapAttributes from '../Map/MapAttributes.mjs';

export default class ContentContainerElement {

  tag = 'flux-eco-layout-content-container';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param {ContentContainerAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "middle"; //todo

    for (let attribute in attributes) {
      if(typeof attributes[attribute] === 'object') {
        element.setAttribute(attribute, JSON.stringify(attributes[attribute]));
        continue;
      }
      element.setAttribute(attribute,  attributes[attribute]);
    }
    return element;
  }


  /**
   *
   * @return {Promise<void>}
   */
  async initializeCustomElement(elementOutbounds) {

    customElements.define(
      this.tag,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
        }

        async #getAttributes() {
          const attributes = [];
          for (let attribute in ContentContainerAttributes.keys) {
            attributes[attribute] = this.getAttribute(attribute);
          }
          return ContentContainerAttributes.new(attributes)
        }

        async #getParentId() {
          return this.getAttribute(ContentContainerAttributes.keys.parentId);
        }

        async #getTitle() {
          this.getAttribute(ContentContainerAttributes.keys.title);
        }

        async connectedCallback() {
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));
          const content = await ContentContainerTemplate.content.cloneNode(true);
          content.querySelector('#title').innerText = await this.#getTitle();
          await this.shadowRoot.append(content)


          const address = this.id.replace(/-/g, '/') + "/" + "contentContainerCreated";
          elementOutbounds.publish(address,  await this.#getAttributes())
        }
      });
  }


}