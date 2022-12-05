import { MenuItemListTemplate } from './MenuItemListTemplate.mjs';
import MenuItemListAttributes from './MenuItemListAttributes.mjs';

export default class MenuItemListElement {

  tag = 'flux-eco-layout-menu-items';
  #slot =  'menu-item-list'; //todo

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   *
   * @param {MenuItemListAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(attributes) {
      const element = document.createElement(this.tag);
      element.id = attributes.id
      element.setAttribute(MenuItemListAttributes.name, JSON.stringify(attributes));
      element.slot = this.#slot; //todo
      return element;
  }

  /**
   *
   * @return {Promise<void>}
   */
  async initializeCustomElement(style, publish) {

    const tag = this.tag;

    customElements.define(
      tag,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' })

        }

        async connectedCallback() {
          this.shadowRoot.append(style.cloneNode(true));

          /**
           * @type {MenuItemListAttributes}
           */
          const attributes = JSON.parse(this.getAttribute(MenuItemListAttributes.name));
          attributes.menuItemsAttributes.forEach(menuItemAttributes => {
              const content = MenuItemListTemplate.content.cloneNode(true);
              const button = content.querySelector('button')
              button.innerText = menuItemAttributes.title;
              button.id = menuItemAttributes.id;

              button.addEventListener('click', e => this.onClick(menuItemAttributes));
              this.shadowRoot.appendChild(button);

              const address = this.id.replace(/-/g, '/') + "/" + "menuListCreated";
              publish(address, attributes)
          });
        }

        onClick(attributes) {
          let address = this.id.replace(/-/g, '/') + "/" + attributes.id + "/" + "clicked";
          publish(address, attributes)

          address = tag.replace(/-/g, '/') + "/" + "clicked";
          publish(address, attributes)
        }
      });
  }
}