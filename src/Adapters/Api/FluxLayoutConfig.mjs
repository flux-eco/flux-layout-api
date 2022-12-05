export default class FluxLayoutConfig {
  /** @var {string} */
  logEnabled;
  /** @var {string} */
  definitionsBaseUrl;
  /** @var {string} */
  srcPrimerCss;
  /** @var {string} */
  srcLeafletCss;

  /**
   * @private
   * @param {boolean} logEnabled
   * @param {string} definitionsBaseUrl
   * @param {string} srcPrimerCss
   * @param {string} srcLeafletCss
   */
  constructor(logEnabled, definitionsBaseUrl, srcPrimerCss, srcLeafletCss) {
    this.logEnabled = logEnabled
    this.definitionsBaseUrl = definitionsBaseUrl
    this.srcPrimerCss = srcPrimerCss
    this.srcLeafletCss = srcLeafletCss
  }

  /**
   * @param {boolean} logEnabled
   * @param {string} definitionsBaseUrl
   * @param {string} srcPrimerCss
   * @param {string} srcLeafletCss
   * @return {FluxLayoutConfig}
   */
  static new(logEnabled, definitionsBaseUrl, srcPrimerCss, srcLeafletCss) {
    return new this(logEnabled, definitionsBaseUrl, srcPrimerCss, srcLeafletCss);
  }

}