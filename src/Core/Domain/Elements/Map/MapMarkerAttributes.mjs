export default class MapMarkerAttributes  {

  static keys = {
    id: "id",
    title: "title",
    link: "link",
    text: "text",
    latitude: "latitude",
    longitude: "longitude",
    radius: "radius",
  }

  id;
  title;
  link;
  text;
  latitude;
  longitude;
  radius;

  constructor(id, title, link, text, latitude, longitude, radius) {
    this.id = id;
    this.title = title;
    this.link = link;
    this.text = text;
    this.latitude = latitude;
    this.longitude = longitude;
    this.radius = radius;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {MapAttributes}
   */
  static new({ id, title, link, text, latitude, longitude, radius}, schema = null) {
    //todo validate with schema
    return new this(id, title, link, text, latitude, longitude, radius)
  }
}