export default class TextAttributes {

  static keys = {
    parentId: "parentId",
    id: "id",
    htmlTag: "htmlTag",
    text: "text"
  }

  parentId;
  id;
  htmlTag;
  text;

  constructor(parentId, id, htmlTag, text) {
    this.parentId = parentId;
    this.id = id;
    this.htmlTag = htmlTag;
    this.text = text;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {TextAttributes}
   */
  static new({ parentId, id, htmlTag, text}, schema = null) {
    //todo validate with schema

    const parser = new DOMParser();
    const validTags = ["p","h1","h2","h3","h4","h5","h6","b","em"]

    if(validTags.includes(htmlTag) === false) {
      console.error('invalid tag ' + htmlTag)
      return;
    }

    return new this(parentId, id, htmlTag, parser.parseFromString(text, "text/html").body.firstChild.textContent)
  }
}