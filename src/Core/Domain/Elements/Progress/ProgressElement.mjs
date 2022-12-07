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
     *
     * @param {ProgressAttributes} attributes
     * @return {Promise<HTMLElement>}
     */
    async createElement(elementOutbounds, attributes) {
        const element = document.createElement(this.tag);
        element.id = attributes.id;
        element.slot = "progress"; //todo

        for (let key in attributes) {
            const attributeName = await elementOutbounds.camelToDash(key)
            element.setAttribute(attributeName, attributes[key]);
        }
        return element;
    }


    /**
     *
     * @return {Promise<void>}
     */
    async initializeCustomElement(elementOutbounds) {

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
                    return this.getAttribute(await elementOutbounds.camelToDash(ProgressAttributes.keys.parentId));
                }


                async #getTotalHandled() {
                    return this.getAttribute(await elementOutbounds.camelToDash(ProgressAttributes.keys.totalHandled));
                }

                async #getTotalToHandle() {
                    return this.getAttribute(await elementOutbounds.camelToDash(ProgressAttributes.keys.totalToHandle));
                }


                async connectedCallback() {
                    this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));
                    const attributes = JSON.parse(this.getAttribute(ProgressAttributes.name));
                    const content = await ProgressTemplate.content.cloneNode(true);
                    await this.shadowRoot.append(content)

                    this.#applyTotalToHandleChanged();

                    const address = this.id.replace(/-/g, '/') + "/" + "progressCreated";
                    elementOutbounds.publish(address, attributes)
                }

                static get  observedAttributes() {
                    return [
                        'total-handled'
                    ]
                }

                #onChanged = {
                    totalToHandle: (oldValue, newValue) => this.#onTotalToHandleChanged(oldValue, newValue),
                    totalHandled: (oldValue, newValue) => this.#onTotalToHandleChanged(oldValue, newValue)
                };

                attributeChangedCallback(name, oldValue, newValue) {
                    console.log(name); //todo
                    if (this.#onChanged.hasOwnProperty('totalToHandle') && this.id !== null) {
                        this.#onChanged['totalToHandle'](oldValue, newValue)
                    }
                }

                async #onTotalToHandleChanged(oldValue, newValue) {
                    await this.#applyTotalToHandleChanged();
                }

                async #applyTotalToHandleChanged() {
                    console.log('test');
                    const totalToHandle = await this.shadowRoot.querySelector('#totalToHandle');
                    totalToHandle.textContent = await this.#getTotalToHandle();
                    await this.#changetTotalHandledInPercent();
                }

                async #onTotalHandledChanged(oldValue, newValue) {
                    await this.#applyTotalToHandledChanged()
                }

                async #applyTotalToHandledChanged() {
                    console.log("ddddd");
                    const totalHanled = await this.shadowRoot.querySelector('#totalHandled');
                    totalHanled.textContent = await this.#getTotalHandled();

                    //await this.#changetTotalHandledInPercent();
                }


                async #changetTotalHandledInPercent() {
                    const percentage = 100 * (await this.#getTotalToHandle() / await this.#getTotalHandled());
                    /*const inPercentElement = await this.shadowRoot.querySelector('#totalHandledInPercent');
                    console.log(inPercentElement);
                    inPercentElement.setAttribute('style', 'width:' + percentage);*/
                }


            });
    }
}