export default class ElementOutbounds {

  primerStyleElement;
  leafletStyleElement;

  /** @var object */
  #messageStream;

  /**
   * @private
   */
  constructor(messageStream) {
    this.#messageStream = messageStream;
  }

  static async new(
    srcPrimerCss,
    srcLeafletCss,
    messageStream
  ) {
    const obj = await new this(messageStream)
    obj.primerStyleElement = await obj.#loadStyleElement(srcPrimerCss);
    obj.leafletStyleElement = await obj.#loadStyleElement(srcLeafletCss);
    return obj;
  }

  async #loadStyleElement(src) {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = await (await fetch(src)).text();
    return styleElement;
  }

  async publish(publishTo, attributes) {
    this.#messageStream.publish(publishTo, attributes)
  }

  /**
   * @param {string} str
   * @return {Promise<string>}
   */
  async camelToDash(str) {
    if (str !== str.toLowerCase()) {
      str = str.replace(/[A-Z]/g, m => "-" + m.toLowerCase());
    }
    return str;
  }

  async dashToCamel(str){
    return str.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
  }

}