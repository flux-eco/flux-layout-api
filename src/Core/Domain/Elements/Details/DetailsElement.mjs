import { DetailsTemplate } from './DetailsTemplate.mjs';
import DetailsAttributes from './DetailsAttributes.mjs';

export default class DetailsElement {

  tag = 'flux-eco-layout-details';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param {DetailsAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "content-item"; //todo

    element.setAttribute(DetailsAttributes.name, JSON.stringify(attributes));
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

        async connectedCallback() {
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));
          const attributes = JSON.parse(this.getAttribute(DetailsAttributes.name));
          const content = await DetailsTemplate.content.cloneNode(true);
          content.querySelector('#title').innerText = attributes.title;
          await this.shadowRoot.append(content)

          const address = this.id.replace(/-/g, '/') + "/" + "detailsCreated";
          elementOutbounds.publish(address, attributes)
        }
      });
  }


}