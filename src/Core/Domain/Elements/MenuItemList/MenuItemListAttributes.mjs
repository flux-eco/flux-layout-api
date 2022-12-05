export default class MenuItemListAttributes {

  parentId;
  id;
  /** @var {MenuItemsAttribute[]} */
  menuItemsAttributes;

  /**
   * @param parentId
   * @param id
   * @param {MenuItemsAttribute[]} menuItemsAttributes
   */
  constructor(parentId, id, menuItemsAttributes) {
    this.parentId = parentId;
    this.id = id;
    this.menuItemsAttributes = menuItemsAttributes;
  }


  /**
   * @param {{parentId, menuItemsAttributes}} value
   * @param {object} schema
   * @return {MenuItemListAttributes}
   */
  static new({ parentId, id, menuItemsAttributes }, schema = null) {
    //todo validate with schema
    return new this(parentId, id, menuItemsAttributes)
  }
}