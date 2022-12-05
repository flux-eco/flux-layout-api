export default class HeaderAttributes  {
  parentId;
  id;

  constructor(parentId, id) {
    this.parentId = parentId;
    this.id = id;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {HeaderAttributes}
   */
  static new({ parentId, id}, schema = null) {
    //todo validate with schema
    return new this(parentId, id)
  }
}