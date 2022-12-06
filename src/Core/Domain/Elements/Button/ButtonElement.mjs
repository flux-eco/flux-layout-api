import { ButtonTemplate } from './ButtonTemplate.mjs';
import ButtonAttributes from './ButtonAttributes.mjs';
import MapAttributes from '../Map/MapAttributes.mjs';

export default class ButtonElement {

  tag = 'flux-eco-layout-button';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }

  /**
   * @param {ButtonAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {

    const element = document.createElement(this.tag);
    element.id = attributes.id
    element.slot = "content-item";

    for (let attribute in attributes) {
      attribute = elementOutbounds.camelToDash(attribute)
      if (attribute === 'taskAttributes') {
        const asJson = JSON.stringify(attributes[attribute]);
        element.setAttribute(attribute, asJson);
        continue;
      }
      element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
  }


  /**
   * @var {ElementOutbounds} elementOutbounds
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

        async #getType() {
          return this.getAttribute(ButtonAttributes.keys.type);
        }

        async #getTaskAddress() {
          return this.getAttribute(ButtonAttributes.keys.taskAddress);
        }

        async #getTaskAttributes() {
          return this.getAttribute(ButtonAttributes.keys.taskAttributes);
        }

        async #getAttributes() {
          const attributes = [];
          for (let attribute in ButtonAttributes.keys) {
            attributes[attribute] = this.getAttribute(attribute);
          }
          return ButtonAttributes.new(attributes)
        }

        async connectedCallback() {
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));

          const content = await ButtonTemplate[await this.#getType()].content.cloneNode(true)
          const button = content.querySelector('button');
          button.addEventListener('click', e => this.onClick());
          await this.shadowRoot.append(button)

          const address = this.id.replace(/-/g, '/') + "/" + "buttonCreated";
          elementOutbounds.publish(address, this.#getAttributes())
        }

        async onClick() {
          console.log(this.#getTaskAttributes())
          elementOutbounds.publish(await this.#getTaskAddress(), await this.#getTaskAttributes())
        }
      });


  }
}