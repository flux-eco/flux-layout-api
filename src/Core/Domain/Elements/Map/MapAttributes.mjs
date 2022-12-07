export default class MapAttributes {

  static keys = {
    parentId: "parentId",
    id: "id",
    title: "title",
    latitude: "latitude",
    longitude: "longitude",
    zoom: "zoom",
    triggerLocate: "triggerLocate",
    mapMarkersAttributeList: "mapMarkersAttributeList",
  }

  parentId;
  id;
  title;
  latitude;
  longitude;
  zoom;
  triggerLocate;
  /** @var array */
  mapMarkersAttributeList

  constructor(parentId, id, title, latitude, longitude, zoom, triggerLocate, mapMarkersAttributeList) {
    this.parentId = parentId;
    this.id = id;
    this.title = title;
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoom = zoom;
    this.triggerLocate = triggerLocate;
    this.mapMarkersAttributeList = mapMarkersAttributeList;
  }

  /**
   * @param {{ }} value
   * @param {object} schema
   * @return {MapAttributes}
   */
  static new({
               parentId,
               id,
               title,
               latitude,
               longitude,
               zoom,
               triggerLocate,
               mapMarkersAttributeList = []
             }, schema = null) {
    //todo validate with schema
    return new this(parentId,
      id,
      title,
      latitude,
      longitude,
      zoom,
      triggerLocate,
      mapMarkersAttributeList)
  }
}