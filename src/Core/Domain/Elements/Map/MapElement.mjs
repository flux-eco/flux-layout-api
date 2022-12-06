import * as L from './../../../../../libs/leaflet/dist/leaflet-src.esm.js';
import MapAttributes from './MapAttributes.mjs';
import { MapTemplate } from './MapTemplate.mjs';

export default class MapElement {

  tag = 'flux-eco-map';


  /**
   * @private
   */
  constructor() {

  }

  static async new() {
    return new this();
  }

  /**
   * @param {MapAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.slot = "content-item";

    for (let attribute in attributes) {
      if (attribute === 'mapMarkersAttributeList') {
        const asJson = JSON.stringify(attributes[attribute]);
        element.setAttribute(attribute, asJson);
        continue;
      }
      element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
  }

  /**
   * @return {void}
   */
  async initializeCustomElement(style, publish) {
    customElements.define(
      this.tag,
      class extends HTMLElement {

        #map = null;
        #mapMarkers = [];

        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
        }

        async connectedCallback() {
          this.shadowRoot.append(style.cloneNode(true));
          await this.shadowRoot.append(await MapTemplate.content.cloneNode(true))
          await this.#createMap();

          const address = this.id.replace(/-/g, '/') + "/" + "mapCreated";
          publish(address, await this.#getAttributes())
        }

        static get observedAttributes() {
          return Object.values(MapAttributes.keys);
        }

        async #getAttributes() {
          const attributes = [];
          for (let attribute in MapAttributes.keys) {
            attributes[attribute] = this.getAttribute(attribute);
          }
          return MapAttributes.new(attributes)
        }

        //map = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 16});

        async #getParentId() {
          return this.getAttribute(MapAttributes.keys.parentId);
        }

        async #getTitle() {
          this.getAttribute(MapAttributes.keys.title);
        }

        async #getLatitude() {
          return this.getAttribute(MapAttributes.keys.latitude);
        }

        async #getLongitude() {
          return this.getAttribute(MapAttributes.keys.longitude);
        }

        async #getZoom() {
          return this.getAttribute(MapAttributes.keys.zoom);
        }

        async #getMapMarkersAttributeList() {
          return JSON.parse(this.getAttribute(MapAttributes.keys.mapMarkersAttributeList));
        }

        #onChanged = {
          latitude: (oldValue, newValue) => this.#onLatitudeChanged(oldValue, newValue),
          longitude: (oldValue, newValue) => this.#onLongitudeChanged(oldValue, newValue),
          zoom: (oldValue, newValue) => this.#onZoomChanged(oldValue, newValue),
          mapmarkersattributelist: (oldValue, newValue) => this.#onMapMarkersAttributeListChanged(
            JSON.parse(oldValue),
            JSON.parse(newValue)
          ),
        };

        attributeChangedCallback(name, oldValue, newValue) {
          console.log(name);
          if (this.#onChanged.hasOwnProperty(name) && this.#map !== null) {
            this.#onChanged[name](oldValue, newValue)
          }
        }


        async #onLatitudeChanged(oldValue, newValue) {
          console.log(this.#map);
          if (this.#map._lastCenter.lat !== newValue) {
            await this.#applyLatitudeChanged(oldValue, newValue)
          }
        }

        async #applyLatitudeChanged(oldValue, newValue) {
          await this.#changeMapPosition();
        }

        async #onLongitudeChanged(oldValue, newValue) {
          if (this.#map._lastCenter.lng !== newValue) {
            await this.#applyLongitudeChanged(oldValue, newValue)
          }
        }

        async #applyLongitudeChanged(oldValue, newValue) {
          await this.#changeMapPosition();
        }

        async #onZoomChanged(oldValue, newValue) {
          if (this.#map._zoom !== newValue) {
            await this.#applyZoomChanged(oldValue, newValue)
          }
        }

        async #applyZoomChanged(oldValue, newValue) {
          await this.#changeZoom()
        }

        async #onMapMarkersAttributeListChanged(oldValue, newValue) {
          await this.#applyMapMarkersAttributeListChanged(oldValue, newValue);
        }

        async #applyMapMarkersAttributeListChanged(oldValue, newValue) {

          const removedMarkers = this.#getRemovedItems(oldValue, newValue);
          if (removedMarkers.length > 0) {
            removedMarkers.forEach(mapMarkerAttributes => this.#removeMarker(
              {mapMarkerAttributes: mapMarkerAttributes}
              )
            )
          }

          const appendedMarkers = this.#getAppendedItems(oldValue, newValue);
          if (appendedMarkers.length > 0) {
            appendedMarkers.forEach(mapMarkerAttributes => this.#appendMapMarker(
              {mapMarkerAttributes: mapMarkerAttributes}
              )
            )
          }
        }

        #getRemovedItems(oldValue, newValue) {
          return this.#getDifference(oldValue, newValue)
        }

        #getAppendedItems(oldValue, newValue) {
          return this.#getDifference(newValue, oldValue)
        }

        #getDifference(array1, array2) {
          return array1.filter(obj1 => {
            return !array2.some(ob2 => {
              return obj1.id === ob2.id
            });
          })
        }


        async #createMap() {
          const content = await this.shadowRoot.querySelector('div')
          // this.#map =  L.map(content);
          // await this.#changeView();
          let map = L.map(content).setView([await this.#getLatitude(), await this.#getLongitude()],
            await this.#getZoom());
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
          this.#map = map

          const mapMarkerAttributesList = await this.#getMapMarkersAttributeList();
          console.log(mapMarkerAttributesList);
          if (mapMarkerAttributesList.length > 0) {
            mapMarkerAttributesList.forEach(mapMarkerAttributes => this.#appendMapMarker(
              {mapMarkerAttributes}))
          }
        }

        /**
         * @param {MapMarkerAttributes} mapMarkerAttributes
         * @return {Promise<void>}
         */
        async #appendMapMarker({mapMarkerAttributes}) {

          const popUpElement = document.createElement('div');
          if (mapMarkerAttributes.link !== null) {
            console.log(mapMarkerAttributes.link)
            const link = document.createElement('a');
            link.href = mapMarkerAttributes.link;
            link.text = mapMarkerAttributes.title;
            popUpElement.appendChild(link)
          } else {
            popUpElement.appendChild(mapMarkerAttributes.title)
          }
          const textElement = document.createElement('p');
          textElement.textContent = mapMarkerAttributes.text;
          popUpElement.appendChild(textElement);


          const markerIcon = L.icon({iconUrl: '../../images/markerIcon.png'});  //todo

          const marker = L.marker([
            mapMarkerAttributes.latitude,
            mapMarkerAttributes.longitude,
          ], {icon: markerIcon})

          marker.addTo(this.#map).bindPopup(popUpElement);

          await this.#applyMapMarkerAppended({ id: mapMarkerAttributes.id, marker: marker })
        }

        async #applyMapMarkerAppended({ id, marker }) {
          this.#mapMarkers[id] = marker;
        }

        /**
         * @param {MapMarkerAttributes} mapMarkerAttributes
         * @return {Promise<void>}
         */
        async #removeMarker({ mapMarkerAttributes }) {
          const marker = this.#mapMarkers[mapMarkerAttributes.id];
          marker.remove({ id: mapMarkerAttributes.id });
        }

        /**
         * @return {Promise<void>}
         */
        async #applyMarkerRemoved({ id }) {
          delete this.#mapMarkers[id];
        }

        async #changeMapPosition() {
          this.#map.panTo(new L.LatLng(await this.#getLatitude(), await this.#getLongitude()));
        }

        async #changeZoom() {
          this.#map.setZoom(await this.#getZoom());
        }
      }
    );
  }

}