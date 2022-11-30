import ValueElement from './ValueElement.mjs';

export default class ContentElement {

  #valueElement;
  #id;

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
  constructor(shadowRoot, templateLoader) {
    this.#valueElement = new ValueElement('content-template', 'content-list', shadowRoot, templateLoader);
  }

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
  static new(shadowRoot, templateLoader) {
    return new ContentElement(shadowRoot, templateLoader);
  }


  /**
   * @param {string} parentId
   * @param {Content[]} values
   * @return {Promise<void>}
   */
  async change(parentId, values) {
    await this.#valueElement.loadTemplate(this.#valueElement.templateId);

    const elementContainer = await  this.#valueElement.getNewElementContainer(parentId);
    const templateContent = await  this.#valueElement.getTemplateContent();
    const element = await templateContent.children[0].cloneNode(true);
    this.#id = parentId + "/" +   this.#valueElement.slotName;
    element.id = this.#id;
    await elementContainer.appendChild(element);
    await this.#valueElement.shadowRoot.appendChild(elementContainer);

    values.forEach(valueObject => {
      this.#valueElement[valueObject.name](  this.#valueElement.shadowRoot,   this.#valueElement.templateLoader).change(this.#id, valueObject);
    });

  }
}