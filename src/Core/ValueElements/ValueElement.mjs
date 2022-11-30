import ContentElement from './ContentElement.mjs';
import DetailsElement from './DetailsElement.mjs';
import TextElement from './TextElement.mjs';

export default class ValueElement {

  /**
   * @var {string} templateId
   */
  templateId
  /**
   * @var {string} slotName
   */
  slotName
  /**
   * @var {ShadowRoot} shadowRoot
   */
  shadowRoot;
  /**
   * @function()
   */
  templateLoader;




  constructor(templateId, slotName, shadowRoot, templateLoader) {
    this.templateId = templateId
    this.slotName = slotName
    this.shadowRoot = shadowRoot;
    this.templateLoader = templateLoader;
  }

  async loadTemplate(templateId) {
    console.log(templateId);
    if (this.shadowRoot.getElementById(templateId)) {
      return;
    }
    const template = await this.templateLoader(templateId)
    this.shadowRoot.appendChild(template);
  }

  async getNewElementContainer(parentId) {
    const elementContainerId = parentId + "/" + this.slotName;
    let elementContainer = null;
    elementContainer = this.shadowRoot.getElementById(elementContainerId);
    if (elementContainer) {
      elementContainer.remove();
    }
    elementContainer = document.createElement('div');
    elementContainer.id = elementContainerId;
    elementContainer.slot = this.slotName;

    return elementContainer;
  }

  async getTemplateContent() {
     return this.shadowRoot.getElementById(this.templateId).content.cloneNode(true)
  }

  details(shadowRoot, templateLoader) {
    return DetailsElement.new(shadowRoot, templateLoader)
  }

  text(shadowRoot, templateLoader) {
    return TextElement.new(shadowRoot, templateLoader)
  }
}