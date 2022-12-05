export default class SchemaRepository {
  #schemaDefinitionsPath;

  /**
   * @private
   */
  constructor(definitionsBaseUrl) {
    this.#schemaDefinitionsPath = definitionsBaseUrl + "/schemas"
  }

  static async new(definitionsBaseUrl) { return new this(definitionsBaseUrl)}

  async getApi() {
    const schemaFilePath =  this.#schemaDefinitionsPath + "/api.json";
    const schema = await fetch(schemaFilePath)
    return await schema.json();
  }

  async getTask(schemaName) {
    const schemaFilePath =  this.#schemaDefinitionsPath + "/tasks/" + schemaName + ".json";
    const schema = await fetch(schemaFilePath)
    return await schema.json();
  }
}