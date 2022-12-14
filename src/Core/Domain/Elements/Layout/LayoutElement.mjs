import HeaderAttributes from '../Header/HeaderAttributes.mjs';
import LayoutAttributes from './LayoutAttributes.mjs';

export default class LayoutElement {
  tag = 'flux-eco-layout';


  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.setAttribute(LayoutAttributes.name, JSON.stringify(attributes));
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
          const attributes = JSON.parse(this.getAttribute(LayoutAttributes.name));

          const address = this.id.replace(/-/g, '/') + "/" + "layoutCreated";
          elementOutbounds.publish(address, attributes)
        }
      });
  }
}