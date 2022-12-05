export default class MenuItemsAttribute {
  id;
  title;
  templateType;

  constructor(id, title, templateType) {
    this.id = id;
    this.title = title;
    this.templateType = templateType;
  }

  /**
   * @param {{id, title}} value
   * @param {object} schema
   * @return {MenuItemsAttribute}
   */
  static new({id, title, templateType}, schema = null) {
    //todo validate with schema
    return new this(id, title, templateType)
  }
}