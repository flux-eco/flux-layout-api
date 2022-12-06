import { PageTemplate } from './PageTemplate.mjs';
import PageAttributes from './PageAttributes.mjs';


export default class PageElement {

  tag = 'flux-eco-layout-page';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param attributes
   * @return {Promise<*>}
   */
  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;

    element.setAttribute(PageAttributes.name, JSON.stringify(attributes));
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
          /** @var {PageAttributes} attributes */
          const attributes = await JSON.parse(this.getAttribute(PageAttributes.name));
          const templateType = attributes.templateType
          await this.shadowRoot.appendChild(PageTemplate[templateType].content.cloneNode(true));


          const address = this.id.replace(/-/g, '/') + "/" + "pageCreated";
          elementOutbounds.publish(address, attributes)
        }
      });
  }
}