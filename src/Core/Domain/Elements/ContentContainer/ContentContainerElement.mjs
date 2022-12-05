import { ContentContainerTemplate } from './ContentContainerTemplate.mjs';
import ContentContainerAttributes from './ContentContainerAttributes.mjs';

export default class ContentContainerElement {

  tag = 'flux-eco-layout-content-container';

  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }


  /**
   * @param {ContentContainerAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "middle"; //todo

    element.setAttribute(ContentContainerAttributes.name, JSON.stringify(attributes));
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
          const attributes = JSON.parse(this.getAttribute(ContentContainerAttributes.name));
          const content = await ContentContainerTemplate.content.cloneNode(true);
          content.querySelector('#title').innerText = attributes.title;
          await this.shadowRoot.append(content)


          const address = this.id.replace(/-/g, '/') + "/" + "contentContainerCreated";
          publish(address, attributes)
        }
      });
  }


}