import TextAttributes from './TextAttributes.mjs';

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
   * @param {TextAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "content-item"; //todo

    element.setAttribute(TextAttributes.name, JSON.stringify(attributes));
    return element;
  }


  /**
   *
   * @return {Promise<void>}
   */
  async initializeCustomElement(style, publish) {

    customElements.define(
      this.tag,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
        }

        async connectedCallback() {
          this.shadowRoot.append(style.cloneNode(true));

          const additionalStyle = document.createElement('style');
          additionalStyle.innerHTML = `
           .breakWord {
            width: 100%;
            word-break: break-word;
          }
          `;
          this.shadowRoot.append(additionalStyle.cloneNode(true));



          /** @var {TextAttributes} attributes */
          const attributes = JSON.parse(this.getAttribute(TextAttributes.name));

          const element = document.createElement(attributes.htmlTag);
          element.setAttribute("class","breakWord");
          element.textContent = attributes.text;

          await this.shadowRoot.append(element)


          const address = this.id.replace(/-/g, '/')  + "/" + "textCreated";
          publish(address, attributes)
        }
      });
  }


}