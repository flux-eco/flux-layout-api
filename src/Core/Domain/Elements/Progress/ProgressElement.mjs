import {ProgressTemplate} from './ProgressTemplate.mjs';
import ProgressAttributes from './ProgressAttributes.mjs';

export default class ProgressElement {

    tag = 'flux-eco-progress';

    /**
     * @private
     */
    constructor() {

    }

    static async new() {
        return new this();
    }


    /**
     * @param {ProgressAttributes} attributes
     * @return {Promise<HTMLElement>}
     */
    async createElement(attributes) {
        const element = document.createElement(this.tag);
        element.id = attributes.id;
        element.slot = "progress"; //todo

        for (let attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
        return element;
    }


    /**
     *
     * @return {Promise<void>}
     */
    async initializeCustomElement(style, publish) {

        customElements.define(
            this.tag,
            class extends HTMLElement {
                constructor() {
                    super();
                    this.attachShadow({mode: 'open'})
                }

                async #getAttributes() {
                    const attributes = [];
                    for (let attribute in ProgressAttributes.keys) {
                        attributes[attribute] = this.getAttribute(attribute);
                    }
                    return ProgressAttributes.new(attributes)
                }

                async #getParentId() {
                    return this.getAttribute(ProgressAttributes.keys.parentId);
                }


                async #getTotalHandled() {
                    return this.getAttribute(ProgressAttributes.keys.totalHandled);
                }

                async #getTotalToHandle() {
                    return this.getAttribute(ProgressAttributes.keys.totalToHandle);
                }


                async connectedCallback() {
                    this.shadowRoot.append(style.cloneNode(true));
                    const attributes = JSON.parse(this.getAttribute(ProgressAttributes.name));
                    const content = await ProgressTemplate.content.cloneNode(true);
                    await this.shadowRoot.append(content)

                    this.#applyTotalToHandleChanged();

                    const address = this.id.replace(/-/g, '/') + "/" + "progressCreated";
                    publish(address, attributes)
                }

                static get observedAttributes() {
                    return Object.values(ProgressAttributes.keys);
                }

                #onChanged = {
                    totalToHandle: (oldValue, newValue) => this.#onTotalToHandleChanged(oldValue, newValue),
                    totalHandled: (oldValue, newValue) => this.#onTotalToHandleChanged(oldValue, newValue)
                };

                attributeChangedCallback(name, oldValue, newValue) {
                    console.log(name);
                    if (this.#onChanged.hasOwnProperty(name) && this.id !== null) {
                        this.#onChanged[name](oldValue, newValue)
                    }
                }

                async #onTotalToHandleChanged(oldValue, newValue) {
                   this.#applyTotalToHandleChanged();
                }
                async #applyTotalToHandleChanged() {
                    this.shadowRoot.querySelector('#totalToHandle').textContent = await this.#getTotalToHandle();
                    await this.#changetTotalHandledInPercent();
                }

                async #onTotalHandledChanged(oldValue, newValue) {
                    await this.#applyTotalToHandledChanged()
                }
                async #applyTotalToHandledChanged() {
                    this.shadowRoot.querySelector('#totalHandled').textContent = await this.#getTotalHandled();
                    await this.#changetTotalHandledInPercent();
                }


                async #changetTotalHandledInPercent() {
                    const percentage = 100 * (await this.#getTotalToHandle() / await this.#getTotalHandled());
                    const inPercentElement =  await this.shadowRoot.querySelector('#totalHandledInPercent');
                    console.log(inPercentElement);
                    inPercentElement.setAttribute('style', 'width:' + percentage);
                }


            });
    }
}