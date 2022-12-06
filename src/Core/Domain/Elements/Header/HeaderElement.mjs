import { HeaderTemplate } from './HeaderTemplate.mjs';
import HeaderAttributes from './HeaderAttributes.mjs';

export default class HeaderElement  {

  tag = 'flux-eco-layout-header';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param {HeaderAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "top"; //todo

    element.setAttribute(HeaderAttributes.name, JSON.stringify(attributes));

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
          const attributes = JSON.parse(this.getAttribute(HeaderAttributes.name));
          await this.shadowRoot.append(await HeaderTemplate.content.cloneNode(true))

          const address = this.id.replace(/-/g, '/') + "/headerCreated";
          elementOutbounds.publish(address, attributes)
        }
      });
  }


}