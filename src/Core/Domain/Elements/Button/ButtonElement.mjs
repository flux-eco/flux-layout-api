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
   * @param elementOutbounds
   * @param {ButtonAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {



    const element = document.createElement(this.tag);
    element.id = attributes.id
    element.slot = "content-item";

    for (let key in attributes) {
      const attributeName = await elementOutbounds.camelToDash(key)
      const attributeValue = attributes[key];
      if (attributeName === 'task-attributes') {
        const asJson = JSON.stringify(attributeValue);
        element.setAttribute(attributeName, asJson);
        continue;
      }
      element.setAttribute(attributeName, attributeValue);
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
        #connected = false;

        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
        }

        async connectedCallback() {
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));

          const content = await ButtonTemplate[await this.#getType()].content.cloneNode(true)
          const button = content.querySelector('button');
          button.addEventListener('click', e => this.onClick());
          await this.shadowRoot.append(button)

          this.#applyTitleChanged()

          const address = this.id.replace(/-/g, '/') + "/" + "buttonCreated";
          elementOutbounds.publish(address, await this.#getAttributes())

          this.#connected = true;
        }

        static #getAttributeNames() {
          const attributeNames = [];
          for (let key in ButtonAttributes.keys) {
            attributeNames.push(elementOutbounds.camelToDash(key));
          }
          return attributeNames
        }

        async #getAttributes() {
          const attributes = [];
          for (let key in ButtonAttributes.keys) {
            attributes[key] = this.getAttribute(await elementOutbounds.camelToDash(key));
          }
          return ButtonAttributes.new(attributes)
        }

        async #getType() {
          return this.getAttribute(await elementOutbounds.camelToDash(ButtonAttributes.keys.type));
        }

        async #getTitle() {
          return this.getAttribute(await elementOutbounds.camelToDash(MapAttributes.keys.title));
        }

        async #getTaskAddress() {
          return this.getAttribute(await elementOutbounds.camelToDash(ButtonAttributes.keys.taskAddress));
        }

        async #getTaskAttributes() {
          return this.getAttribute(await elementOutbounds.camelToDash(ButtonAttributes.keys.taskAttributes));
        }

        static get observedAttributes() {
          return this.#getAttributeNames()
        }

        #onChanged = {
          title: (oldValue, newValue) => this.#onTitleChanged(oldValue, newValue),
        };

        attributeChangedCallback(name, oldValue, newValue) {
          const attributeKey = elementOutbounds.dashToCamel(name);
          if (this.#onChanged.hasOwnProperty(attributeKey) &&  this.#connected  === true) {
            this.#onChanged[attributeKey](oldValue, newValue)
          }
        }

        async #onTitleChanged(oldValue, newValue) {
          const textContent = this.shadowRoot.querySelector('button').textContent;
          if(textContent !== newValue) {
              this.#applyTitleChanged(newValue)
          }
        }

        async #applyTitleChanged() {
          this.shadowRoot.querySelector('button').textContent = await this.#getTitle();
        }






        async onClick() {
          console.log(this.#getTaskAttributes())
          elementOutbounds.publish(await this.#getTaskAddress(), JSON.parse(await this.#getTaskAttributes()))
        }
      });


  }
}