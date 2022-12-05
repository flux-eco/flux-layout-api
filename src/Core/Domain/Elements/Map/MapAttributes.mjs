export default class MapAttributes  {
  parentId;
  id;
  title;
  latitude;
  longitude;
  zoom;

  constructor(parentId, id, title, latitude, longitude, zoom) {
    this.parentId = parentId;
    this.id = id;
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {MapAttributes}
   */
  static new({ parentId, id, title, latitude, longitude, zoom}, schema = null) {
    //todo validate with schema
    return new this(parentId, id, title,  latitude, longitude, zoom)
  }
}