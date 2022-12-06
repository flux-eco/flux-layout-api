import HeaderAttributes from './Header/HeaderAttributes.mjs';
import MenuAttributes from './Menu/MenuAttributes.mjs';
import MenuItemListAttributes from './MenuItemList/MenuItemListAttributes.mjs';
import PageAttributes from './Page/PageAttributes.mjs';
import LayoutAttributes from './Layout/LayoutAttributes.mjs';
import ContentContainerAttributes from './ContentContainer/ContentContainerAttributes.mjs';
import DetailsAttributes from './Details/DetailsAttributes.mjs';
import TextAttributes from './Text/TextAttributes.mjs';
import MapAttributes from './Map/MapAttributes.mjs';
import MapMarkerAttributes from './Map/MapMarkerAttributes.mjs';
import ButtonAttributes from './Button/ButtonAttributes.mjs';
import RequestStreamAttributes from "./RequestStream/RequestStreamAttributes.mjs";
import ProgressAttributes from "./Progress/ProgressAttributes.mjs";

export default class ElementAttributesService {

  /**
   * @private
   */
  constructor() { }

  /**
   * @return {Promise<ElementAttributesService>}
   */
  static async new() {
    return new this();
  }


  async createLayoutAttributes(attributes) {
     return LayoutAttributes.new(attributes);
  }

  async createPageAttributes(attributes) {
    return PageAttributes.new(attributes);
  }

  async createHeaderAttributes(attributes) {
    return HeaderAttributes.new(attributes);
  }

  async createButtonAttributes(attributes) {
    return ButtonAttributes.new(attributes);
  }

  async createMenuAttributes(attributes) {
    return MenuAttributes.new(attributes);

  }

  async createMenuItemListAttributes(attributes) {
    return MenuItemListAttributes.new(attributes);
  }

  async createContentContainerAttributes(attributes) {
    return ContentContainerAttributes.new(attributes);

  }

  async createDetailsAttributes(attributes) {
    return DetailsAttributes.new(attributes);
  }

  async createTextAttributes(attributes) {
    return TextAttributes.new(attributes);
  }

  async createProgressAttributes(attributes) {
    return ProgressAttributes.new(attributes);
  }

  async createRequestStreamAttributes(attributes) {
    return RequestStreamAttributes.new(attributes);
  }

  async createMapAttributes(attributes) {
    return MapAttributes.new(attributes);
  }

}