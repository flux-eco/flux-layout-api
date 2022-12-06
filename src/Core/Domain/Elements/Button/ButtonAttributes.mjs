export default class ButtonAttributes {

  static keys = {
    parentId: "parentId",
    id: "id",
    title: "title",
    type: "type",
    taskAddress: "taskAddress",
    taskAttributes: "taskAttributes"
  }

  parentId;
  id;
  title;
  type;
  taskAddress;
  taskAttributes;

  constructor(parentId, id, title, type, taskAddress, taskAttributes) {
    this.parentId = parentId;
    this.id = id;
    this.title = title;
    this.type = type;
    this.taskAddress = taskAddress;
    this.taskAttributes = taskAttributes;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {ButtonAttributes}
   */
  static new({ parentId, id, title, type, taskAddress, taskAttributes }, schema = null) {
    //todo validate with schema
    return new this(parentId, id, title, type, taskAddress, taskAttributes)
  }
}