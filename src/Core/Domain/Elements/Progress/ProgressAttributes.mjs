export default class ProgressAttributes {
  static keys = {
    parentId: "parentId",
    id: "id",
    totalToHandle: "totalToHandle",
    totalHandled: "totalHandled",
    totalHandledInPercent: "totalHandledInPercent"
  }

  parentId;
  id;
  totalToHandle;
  totalHandled;

  constructor(parentId, id, requestAddress, totalToHandle, totalHandled, totalHandledInPercent) {
    this.parentId = parentId;
    this.id = id;
    this.totalToHandle = totalToHandle;
    this.totalHandled = totalHandled;
    this.totalHandledInPercent = totalHandledInPercent;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {ProgressAttributes}
   */
  static new({ parentId, id, totalToHandle = 0, totalHandled = 0, totalHandledInPercent = 0}, schema = null) {
    //todo validate with schema
    return new this(parentId, id, totalToHandle, totalHandled, totalHandledInPercent)
  }
}