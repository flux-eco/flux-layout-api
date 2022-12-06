import HeaderElement from '../Domain/Elements/Header/HeaderElement.mjs';
import MenuElement from '../Domain/Elements/Menu/MenuElement.mjs';
import MenuItemListElement from '../Domain/Elements/MenuItemList/MenuItemListElement.mjs';
import PageElement from '../Domain/Elements/Page/PageElement.mjs';
import LayoutElement from '../Domain/Elements/Layout/LayoutElement.mjs';
import ContentContainerElement from '../Domain/Elements/ContentContainer/ContentContainerElement.mjs';
import DetailsElement from '../Domain/Elements/Details/DetailsElement.mjs';
import TextElement from '../Domain/Elements/Text/TextElement.mjs';
import MapElement from '../Domain/Elements/Map/MapElement.mjs';
import ButtonElement from '../Domain/Elements/Button/ButtonElement.mjs';
import RequestStreamElement from "../Domain/Elements/RequestStream/RequestStreamElement.mjs";
import ProgressElement from "../Domain/Elements/Progress/ProgressElement.mjs";

export default class ElementsRepository {

  #srcPrimerCss;
  #srcLeafletCss;
  #onPublish;

  /**
   * @private
   */
  constructor(srcPrimerCss,
              srcLeafletCss,
              onPublish) {
    this.#srcPrimerCss = srcPrimerCss;
    this.#srcLeafletCss = srcLeafletCss;
    this.#onPublish = onPublish;
  }

  /**
   * @return {Promise<ElementsRepository>}
   */
  static async new(
    srcPrimerCss,
    srcLeafletCss,
    onPublish
  ) {
    return new this(
      srcPrimerCss,
      srcLeafletCss,
      onPublish
    );
  }


  /**
   * @return {boolean}
   */
  #isInitialized(tag) {
    return customElements.get(tag) !== undefined;
  }

  async #getCssPrimerStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = await (await fetch(this.#srcPrimerCss)).text();
    return styleElement;
  }

  async #getLeafletStyleElement() {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = await (await fetch(this.#srcLeafletCss)).text();
    return styleElement;
  }

  async createLayoutElement(attributes) {
    const obj = await LayoutElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createPageElement(attributes) {
    const obj = await PageElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createHeaderElement(attributes) {
    const obj = await HeaderElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createButtonElement(attributes) {
    const obj = await ButtonElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createMenuElement(attributes) {
    const obj = await MenuElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createMenuItemListElement(attributes) {
    const obj = await MenuItemListElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createContentContainerElement(attributes) {
    const obj = await ContentContainerElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createDetailsElement(attributes) {
    const obj = await DetailsElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createTextElement(attributes) {
    const obj = await TextElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createProgressElement(attributes) {
    const obj = await ProgressElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createRequestStreamElement(attributes) {
    const obj = await RequestStreamElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getCssPrimerStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }

  async createMapElement(attributes) {
    const obj = await MapElement.new();
    if (this.#isInitialized(obj.tag) === false) {
      await obj.initializeCustomElement(await this.#getLeafletStyleElement(), this.#onPublish)
    }
    return await obj.createElement(attributes);
  }
}