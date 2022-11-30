import ValueElement from './ValueElement.mjs';

export default class TextElement {

  #valueElement;

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
  constructor(shadowRoot, templateLoader) {
    this.#valueElement = new ValueElement('text-template', 'text', shadowRoot, templateLoader);
  }

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
   static new(shadowRoot, templateLoader) {
    return new this(shadowRoot, templateLoader);
  }


  /**
   * @param {string} parentId

   * @return {Promise<void>}
   */
  async change(parentId, valueObject) {
    await this.#valueElement.loadTemplate(this.#valueElement.templateId);
    const elementContainer = await this.#valueElement.getNewElementContainer(parentId);
    const templateContent = await  this.#valueElement.getTemplateContent();


      const element = templateContent.children[0].cloneNode(true);
      const contentId = "text";

      element.textContent = valueObject.value;
      element.id = parentId + "/" + this.#valueElement.slotName + "/" + contentId + "/" + valueObject.id
      elementContainer.appendChild(element);



    this.#valueElement.shadowRoot.appendChild(elementContainer);
  }
}