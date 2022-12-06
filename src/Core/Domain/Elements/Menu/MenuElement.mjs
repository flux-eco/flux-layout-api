import { MenuTemplate } from './MenuTemplate.mjs';
import MenuAttributes from './MenuAttributes.mjs';

export default class MenuElement {


  tag = 'flux-eco-layout-menu';



  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }

  /**
   * @param {MenuAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {
      const element = document.createElement(this.tag);
      element.id = attributes.id
      element.slot = 'menu'; //todo
      element.setAttribute(MenuAttributes.name, JSON.stringify(attributes));
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

          /** @var {MenuAttributes} attributes */
          const attributes = JSON.parse(this.getAttribute(MenuAttributes.name));
          const menu = await MenuTemplate.content.cloneNode(true);
          menu.querySelector('#title').innerText = attributes.title;
          await this.shadowRoot.append(menu)

          const address = this.id.replace(/-/g, '/') + "/" + "menuCreated";
          elementOutbounds.publish(address, attributes)
        }
      });
  }
}