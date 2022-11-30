import ValueElement from './ValueElement.mjs';
import ContentElement from './ContentElement.mjs';

export default class DetailsElement {

  #valueElement;

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
  constructor(shadowRoot, templateLoader) {
    this.#valueElement = new ValueElement('details-template',
      'details',
      shadowRoot,
      templateLoader);
  }

  /**
   * @param {ShadowRoot} shadowRoot
   * @param {function()} templateLoader
   */
  static new(shadowRoot, templateLoader) {
    return new DetailsElement(shadowRoot, templateLoader);
  }


  /**
   * @param {string} parentId
   * @param {Content} value
   * @return {Promise<void>}
   */
  async change(parentId, valueObject) {
    await this.#valueElement.loadTemplate(this.#valueElement.templateId);
    const elementContainer = await this.#valueElement.getNewElementContainer(parentId);

    console.log(valueObject);

    const templateContent = await this.#valueElement.getTemplateContent();

    const element = templateContent.children[0].cloneNode(true);
    const valueId = "value";
    const value = element.querySelector('#' + valueId);
    value.textContent = valueObject.value;
    const elementId = parentId + "/" + this.#valueElement.slotName + "/" + valueId + "/" + valueObject.id
    value.id = elementId

    if (valueObject.contentList) {

      valueObject.contentList.forEach(detailsValueObject => {
        const contentValueId = "details-content";
        const contentValue = element.querySelector('#' + contentValueId);

        console.log(contentValue);
        console.log(element);

        if (contentValue) {
          const clonedContent = contentValue;
          clonedContent.textContent = detailsValueObject.value
          const contentValueElementId = elementId + "/" + contentValueId + "/" + detailsValueObject.id
          clonedContent.id = contentValueElementId
          element.appendChild(contentValue)
        }
      });


    }

    elementContainer.appendChild(element);


    this.#valueElement.shadowRoot.appendChild(elementContainer);
  }

  contentList(shadowRoot, templateLoader) {
    return ContentElement.new(shadowRoot, templateLoader)
  }
}