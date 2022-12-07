import TextAttributes from './TextAttributes.mjs';
import RequestStreamAttributes from '../RequestStream/RequestStreamAttributes.mjs';

export default class TextElement {

  tag = 'flux-eco-layout-text';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param {ElementOutbounds} elementOutbounds
   * @param {TextAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(elementOutbounds, attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "content-item"; //todo

    for (let key in attributes) {
      const attributeName = await elementOutbounds.camelToDash(key)
      element.setAttribute(attributeName, attributes[key]);
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
          for (let key in RequestStreamAttributes.keys) {
            attributes[key] = this.getAttribute(elementOutbounds.camelToDash(key));
          }
          return RequestStreamAttributes.new(attributes)
        }

        async connectedCallback() {
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));

          const additionalStyle = document.createElement('style');
          additionalStyle.innerHTML = `
           .breakWord {
            width: 100%;
            word-break: break-word;
          }
          `;
          this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));

          const element = document.createElement(this.getAttribute(elementOutbounds.camelToDash(TextAttributes.keys.htmlTag)));
          element.setAttribute("class","breakWord");
          element.textContent = this.getAttribute(await elementOutbounds.camelToDash(TextAttributes.keys.text));

          await this.shadowRoot.append(element)


          const address = this.id.replace(/-/g, '/')  + "/" + "textCreated";
          elementOutbounds.publish(address, await this.#getAttributes())
        }
      });
  }


}