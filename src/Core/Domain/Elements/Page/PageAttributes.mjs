export default class PageAttributes  {
  parentId;
  id;
  templateType;

  constructor(parentId, id, templateType) {
    this.parentId = parentId;
    this.id = id;
    this.templateType = templateType;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {PageAttributes}
   */
  static new({ parentId, id, templateType}, schema = null) {
    //todo validate with schema
    return new this(parentId, id, templateType)
  }
}