export default class Actor {
  /**
   * @var id
   */
  static id = "flux-eco-layout"
  /**
   * @var {ElementsRepository}
   */
  #elementsRepository;
  /**
   * @var {AttributesRepository}
   */
  #attributesRepository;


  /**
   * @param {ElementsRepository} elementsRepository
   * @param {AttributesRepository} attributesRepository
   */
  constructor(elementsRepository, attributesRepository) {
    this.#elementsRepository = elementsRepository;
    this.#attributesRepository = attributesRepository;
  }

  /**
   * @param {ElementsRepository} elementsRepository
   * @param {AttributesRepository} attributesRepository
   * @return Actor
   */
  static async new(elementsRepository, attributesRepository) {
    const obj = new this(elementsRepository, attributesRepository);
    document.body.append(
      await elementsRepository.createLayoutElement(
        await attributesRepository.createLayoutAttributes({ id: Actor.id })
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
    const attributes = await this.#attributesRepository.createPageAttributes(pageAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createPageElement(attributes)
    );
  }

  async createHeader({ headerAttributes }) {
    const attributes = await this.#attributesRepository.createHeaderAttributes(headerAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createHeaderElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async createButton({ buttonAttributes }) {
    const attributes = await this.#attributesRepository.createButtonAttributes(buttonAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createButtonElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async createMenu({ menuAttributes }) {
    const attributes = await this.#attributesRepository.createMenuAttributes(menuAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createMenuElement(attributes)
    );
  }

  /**
   * @param values
   * @return {Promise<void>}
   */
  async changeMenuItemList({ menuItemListAttributes }) {
    const attributes = await this.#attributesRepository.createMenuItemListAttributes(
      menuItemListAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createMenuItemListElement(attributes)
    );
  }

  async createContentContainer({ contentContainerAttributes }) {
    const attributes = await this.#attributesRepository.createContentContainerAttributes(
      contentContainerAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createContentContainerElement(attributes)
    );
  }

  async createDetails({ detailsAttributes }) {
    const attributes = await this.#attributesRepository.createDetailsAttributes(detailsAttributes);
    await this.#removeExistingElement(attributes.id);

    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createDetailsElement(attributes)
    );
  }

  async createText({ textAttributes }) {
    const attributes = await this.#attributesRepository.createTextAttributes(textAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createTextElement(attributes)
    );
  }

  async createProgress({ progressAttributes }) {
    const attributes = await this.#attributesRepository.createProgressAttributes(progressAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
        attributes.parentId,
        await this.#elementsRepository.createProgressElement(attributes)
    );
  }

  async createRequestStream({ requestStreamAttributes }) {
    const attributes = await this.#attributesRepository.createRequestStreamAttributes(requestStreamAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
        attributes.parentId,
        await this.#elementsRepository.createRequestStreamElement(attributes)
    );
  }





  async createMap({ mapAttributes }) {
    const attributes = await this.#attributesRepository.createMapAttributes(mapAttributes);
    await this.#removeExistingElement(attributes.id);
    await this.#appendElement(
      attributes.parentId,
      await this.#elementsRepository.createMapElement(attributes)
    );
  }

  async changeAttributes({ id, attributes }) {
    const mainShadow = await this.#getMainShadow();
    const element = await mainShadow.querySelector('#' + id);
    for (let attribute in attributes) {

      const attributeValue = attributes[attribute];
      if(typeof attributeValue === 'object') {
        element.setAttribute(attribute, JSON.stringify(attributeValue));
        continue;
      }
      element.setAttribute(attribute, attributeValue);
    }
  }
}