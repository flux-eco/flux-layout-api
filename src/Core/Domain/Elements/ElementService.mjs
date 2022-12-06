import HeaderElement from './Header/HeaderElement.mjs';
import MenuElement from './Menu/MenuElement.mjs';
import MenuItemListElement from './MenuItemList/MenuItemListElement.mjs';
import PageElement from './Page/PageElement.mjs';
import LayoutElement from './Layout/LayoutElement.mjs';
import ContentContainerElement from './ContentContainer/ContentContainerElement.mjs';
import DetailsElement from './Details/DetailsElement.mjs';
import TextElement from './Text/TextElement.mjs';
import MapElement from './Map/MapElement.mjs';
import ButtonElement from './Button/ButtonElement.mjs';
import RequestStreamElement from "./RequestStream/RequestStreamElement.mjs";
import ProgressElement from "./Progress/ProgressElement.mjs";

export default class ElementService {

  /**
   * @var {ElementOutbounds}
   */
  #elementOutbounds;

  /**
   * @private
   */
  constructor(elementOutbounds) {
    this.#elementOutbounds = elementOutbounds;
  }

  /**
   * @return {Promise<ElementService>}
   */
  static async new(
    elementOutbounds
  ) {
    return new this(
      elementOutbounds
    );
  }


  /**
   * @return {boolean}
   */
  #isInitialized(tag) {
    return customElements.get(tag) !== undefined;
  }
  

  async createLayoutElement(attributes) {
    const obj = await LayoutElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createPageElement(attributes) {
    const obj = await PageElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createHeaderElement(attributes) {
    const obj = await HeaderElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createButtonElement(attributes) {
    const obj = await ButtonElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createMenuElement(attributes) {
    const obj = await MenuElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createMenuItemListElement(attributes) {
    const obj = await MenuItemListElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createContentContainerElement(attributes) {
    const obj = await ContentContainerElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createDetailsElement(attributes) {
    const obj = await DetailsElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createTextElement(attributes) {
    const obj = await TextElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createProgressElement(attributes) {
    const obj = await ProgressElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createRequestStreamElement(attributes) {
    const obj = await RequestStreamElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }

  async createMapElement(attributes) {
    const obj = await MapElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(this.#elementOutbounds)
    }
    return await obj.createElement(this.#elementOutbounds, attributes);
  }
}