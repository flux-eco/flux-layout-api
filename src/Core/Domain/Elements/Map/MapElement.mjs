import * as L from './../../../../../libs/leaflet/dist/leaflet-src.esm.js';
import MapAttributes from './MapAttributes.mjs';

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

  static async initialize() {
    return new this();
  }

  /**
   * @param {MapAttributes} attributes
   * @return {Promise<HTMLElement>}
   */
  async createElement(attributes) {
    const element = document.createElement(this.tag);
    element.id = attributes.id;
    element.setAttribute(MapAttributes.name, JSON.stringify(attributes));
    return element;
  }

  /**
   * @return {void}
   */
  async initializeCustomElement(style, publish) {
    customElements.define(
      this.tag,
      class extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: 'open' })
        }

        connectedCallback() {
          this.shadowRoot.append(style.cloneNode(true));
          /** @var {MapAttributes} attributes */
          const attributes = JSON.parse(this.getAttribute(MapAttributes.name));

          const mapdiv = document.createElement('div');
          mapdiv.style = "z-index: 1";
          mapdiv.id = 'mapid';
          mapdiv.style.height = "500px";
          this.shadowRoot.appendChild(mapdiv);

          //todo
          let map = L.map(mapdiv).setView([attributes.latitude, attributes.longitude], attributes.zoom);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          function onMapClick(e) {
            L.popup()
            .setLatLng(e.latlng)
            .setContent(`${e.latlng.toString()}`)
            .openOn(map);
          }
          map.on('click', onMapClick);

          this.addEventListener('slotchange', event => {
            let slots = this.querySelectorAll('slot');
            let markerGroup = L.featureGroup();
            //if(map.hasLayer(markerGroup)) {
              //todo
            markerGroup.clearLayers();
            //}
            //marker
            if (slots[0]) {
              slots[0].assignedNodes().forEach((props, key) => {
                props.childNodes.forEach((props, index) => {
                  this.setMarker(map, markerGroup, props)
                });
              })
            }

            //mapCoordinates
            if (slots[1]) {
              slots[1].assignedNodes().forEach((elementList, index) => {
                this.changeMapCoordinates(map, markerGroup, elementList)
              });
            }
          });

          const address = this.id.replace(/-/g, '/') + "/" + "menuCreated";
          publish(address, attributes)
        }

        setMarker(map, markerGroup, coordinates, radius) {
          L.circle([
            coordinates.childNodes[0].getAttribute('content'),
            coordinates.childNodes[1].getAttribute('content')
          ], {
            color: 'violet',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: radius
          }).addTo(markerGroup).bindPopup( coordinates.childNodes[1].getAttribute('content'));
          map.addLayer(markerGroup);
        }

        changeMapCoordinates(map, markerGroup, coordinates) {
          map.setView([
            coordinates.childNodes[0].getAttribute('content'),
            coordinates.childNodes[1].getAttribute('content')
            ],
            coordinates.childNodes[3].getAttribute('content'));
          //radius
          if(coordinates.childNodes[2].getAttribute('content') > 0) {
            this.setMarker(map, markerGroup, coordinates, coordinates.childNodes[2].getAttribute('content'))
          }
        }
      }
    );
  }

}