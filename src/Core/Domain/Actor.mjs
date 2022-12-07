import ElementService from './Elements/ElementService.mjs';
import ElementAttributesService from './Elements/ElementAttributesService.mjs';

export default class Actor {
  /**
   * @var id
   */
  static id = "flux-eco-layout"

  /**
   * @var {ElementOutbounds}
   */
  #elementOutbounds;
  /**
   * @var {ElementService}
   */
  #elementService;
  /**
   * @var {ElementAttributesService}
   */
  #elementAttributesService;


  /**
   * @param {elementOutbounds} elementOutbounds
   * @param {ElementService} elementService
   * @param {ElementAttributesService} elementAttributesService
   */
  constructor(elementOutbounds, elementService, elementAttributesService) {
    this.#elementOutbounds = elementOutbounds;
    this.#elementService = elementService;
    this.#elementAttributesService = elementAttributesService;
  }

  /**
   * @param {ElementOutbounds} elementOutbounds
   * @return Actor
   */
  static async new(elementOutbounds) {
    const elementService = await ElementService.new(elementOutbounds)
    const elementAttributeService = await ElementAttributesService.new()

    const obj = new this(elementOutbounds, elementService,elementAttributeService);
    document.body.append(
      await elementService.createLayoutElement(
        await elementAttributeService.createLayoutAttributes({ id: Actor.id })
      )
    );
    return obj;
  }

  async #getMainShadow() {
    const element = await document.querySelector('#' + Actor.id);
    return element.shadowRoot;
  }

  async #appendElement(parentId, element) {
    const mainShadow = await this.#getMainShadow();
    let parentElement = null;
    if (parentId === Actor.id) {
      parentElement = mainShadow
    } else {
      parentElement = await mainShadow.querySelector('#' + parentId);
    }
    parentElement.append(element);
  }

  async #removeExistingElement(id) {
    const mainShadow = await this.#getMainShadow();
    if (mainShadow) {
      const element = mainShadow.querySelector('#' + id);
      if (element !== null) {
        element.remove()
      }
    }
  }

  async createPage({ pageAttributes }) {
    const attributes = await this.#elementAttributesService.createPageAttributes(pageAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createPageElement(attributes)
    );
  }

  async createHeader({ headerAttributes }) {
    const attributes = await this.#elementAttributesService.createHeaderAttributes(headerAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createHeaderElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async createButton({ buttonAttributes }) {
    const attributes = await this.#elementAttributesService.createButtonAttributes(buttonAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createButtonElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async createMenu({ menuAttributes }) {
    const attributes = await this.#elementAttributesService.createMenuAttributes(menuAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createMenuElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async changeMenuItemList({ menuItemListAttributes }) {
    const attributes = await this.#elementAttributesService.createMenuItemListAttributes(
      menuItemListAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createMenuItemListElement(attributes)
    );
  }

  async createContentContainer({ contentContainerAttributes }) {
    const attributes = await this.#elementAttributesService.createContentContainerAttributes(
      contentContainerAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createContentContainerElement(attributes)
    );
  }

  async createDetails({ detailsAttributes }) {
    const attributes = await this.#elementAttributesService.createDetailsAttributes(detailsAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createDetailsElement(attributes)
    );
  }

  async createText({ textAttributes }) {
    const attributes = await this.#elementAttributesService.createTextAttributes(textAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createTextElement(attributes)
    );
  }

  async createProgress({ progressAttributes }) {
    const attributes = await this.#elementAttributesService.createProgressAttributes(progressAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
        attributes.parentId,
        await this.#elementService.createProgressElement(attributes)
    );
  }

  async createRequestStream({ requestStreamAttributes }) {
    const attributes = await this.#elementAttributesService.createRequestStreamAttributes(requestStreamAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
        attributes.parentId,
        await this.#elementService.createRequestStreamElement(attributes)
    );
  }

  async createMap({ mapAttributes }) {
    const attributes = await this.#elementAttributesService.createMapAttributes(mapAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
      attributes.parentId,
      await this.#elementService.createMapElement(attributes)
    );
  }

  async changeAttributes({ attributes }) {
    const mainShadow = await this.#getMainShadow();
    const element = await mainShadow.querySelector('#' + attributes.id);
    for (let key in attributes) {
      const attributeName = await this.#elementOutbounds.camelToDash(key)
      const attributeValue = attributes[key];

      if(typeof attributeValue === 'object') {
        element.setAttribute(attributeName, JSON.stringify(attributeValue));
        continue;
      }

      element.setAttribute(attributeName, attributes[key]);
    }
  }
}