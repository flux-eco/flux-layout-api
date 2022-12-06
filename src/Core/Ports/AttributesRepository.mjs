import HeaderAttributes from '../Domain/Elements/Header/HeaderAttributes.mjs';
import MenuAttributes from '../Domain/Elements/Menu/MenuAttributes.mjs';
import MenuItemListAttributes from '../Domain/Elements/MenuItemList/MenuItemListAttributes.mjs';
import PageAttributes from '../Domain/Elements/Page/PageAttributes.mjs';
import LayoutAttributes from '../Domain/Elements/Layout/LayoutAttributes.mjs';
import ContentContainerAttributes from '../Domain/Elements/ContentContainer/ContentContainerAttributes.mjs';
import DetailsAttributes from '../Domain/Elements/Details/DetailsAttributes.mjs';
import TextAttributes from '../Domain/Elements/Text/TextAttributes.mjs';
import MapAttributes from '../Domain/Elements/Map/MapAttributes.mjs';
import MapMarkerAttributes from '../Domain/Elements/Map/MapMarkerAttributes.mjs';
import ButtonAttributes from '../Domain/Elements/Button/ButtonAttributes.mjs';

export default class AttributesRepository {

  /**
   * @private
   */
  constructor() { }

  /**
   * @return {Promise<AttributesRepository>}
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

  async createMapAttributes(attributes) {
    return MapAttributes.new(attributes);
  }

}