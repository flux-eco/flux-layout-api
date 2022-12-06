import Actor from "../../Core/Domain/Actor.mjs";
import MessageStream from '../../Adapters/MessageStream/MessageStream.mjs';
import SchemaRepository from '../Repositories/SchemaRepository.mjs';
import ElementOutbounds from '../../Core/Ports/ElementOutbounds.mjs';


export default class FluxLayoutApi {
  /** @var {string} */
  static actorName = "flux/eco/layout";
  /** @var {string} */
  static actorColor = '#420039'
  /** @var {Actor} */
  #actor;
  /** @var {MessageStream} */
  #messageStream;
  /** @var {SchemaRepository} */
  #schemaRepository;

  /**
   * @private
   */
  constructor(messageStream, schemaRepository) {
    this.#messageStream = messageStream;
    this.#schemaRepository = schemaRepository;
  }

  /**
   * @param {FluxLayoutConfig} config
   * @return {FluxLayoutApi}
   */
  static async new(config) {

    const messageStream = await MessageStream.new(
      this.actorName,
      config.logEnabled,
      this.actorColor
    );

    const schemaRepository = await SchemaRepository.new(config.definitionsBaseUrl);

    const elementOutbounds = await ElementOutbounds.new(
      config.srcPrimerCss,
      config.srcLeafletCss,
      messageStream
    )

    const obj = new this(messageStream, schemaRepository);

    obj.#actor = await Actor.new(elementOutbounds);
    await obj.#initTasks();

    return obj;
  }

  async #initTasks() {
    const apiSchema = await this.#schemaRepository.getApi();

    for (const [taskName, task] of Object.entries(await apiSchema.tasks)) {
      //todo we should make real bundle of the api.json first
      const taskSchema = await this.#schemaRepository.getTask(taskName);
      const address = taskSchema.address;
      const publishToAddress = await taskSchema.publishes.address;

      this.#messageStream.register(address, (taskValues) => {
          this.#handle(taskName, taskValues, publishToAddress)
        }
      )
    }
  }

  async #handle(taskName, taskValues, publishToAddress) {
    try {
      this.#actor[taskName](
        taskValues,
        (eventValues) => this.#messageStream.publish(publishToAddress, eventValues)
      );
    }
    catch (e) {
      console.error(taskName + " " + e)
    }
  }
}