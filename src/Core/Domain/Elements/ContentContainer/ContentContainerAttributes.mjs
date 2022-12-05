export default class ContentContainerAttributes {
  parentId;
  id;
  title;

  constructor(parentId, id, title) {
    this.parentId = parentId;
    this.id = id;
    this.title = title;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {ContentContainerAttributes}
   */
  static new({ parentId, id, title}, schema = null) {
    //todo validate with schema
    return new this(parentId, id, title)
  }
}