export default class LayoutAttributes  {

  id;

  constructor(id) {
    this.id = id;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {LayoutAttributes}
   */
  static new({id}, schema = null) {
    //todo validate with schema
    return new this(id)
  }
}