import {RequestStreamTemplate} from './RequestStreamTemplate.mjs';
import {RequestStreamMessageTemplate} from './RequestStreamMessageTemplate.mjs';
import RequestStreamAttributes from './RequestStreamAttributes.mjs';

export default class RequestStreamElement {

    tag = 'flux-eco-request-stream';

    /**
     * @private
     */
    constructor() {

    }

    static async new() {
        return new this();
    }


    /**
     * @param {ElementOutbounds} elementOutbounds
     * @param {RequestStreamAttributes} attributes
     * @return {Promise<HTMLElement>}
     */
    async createElement(elementOutbounds, attributes) {
        const element = document.createElement(this.tag);
        element.id = attributes.id;
        element.slot = "content-item"; //todo

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
                    for (let attribute in RequestStreamAttributes.keys) {
                        attributes[attribute] = this.getAttribute(attribute);
                    }
                    return RequestStreamAttributes.new(attributes)
                }

                async #getParentId() {
                    return this.getAttribute(await elementOutbounds.camelToDash(RequestStreamAttributes.keys.parentId));
                }

                async #getTitle() {
                    return this.getAttribute(await elementOutbounds.camelToDash(RequestStreamAttributes.keys.title));
                }

                async #getTotalToHandle() {
                    return this.getAttribute(await elementOutbounds.camelToDash(RequestStreamAttributes.keys.totalToHandle));
                }

                async #getShowProgress() {
                    return this.getAttribute(await elementOutbounds.camelToDash(RequestStreamAttributes.keys.showProgress));
                }

                async #getRequestAddress() {
                    return this.getAttribute(await elementOutbounds.camelToDash(RequestStreamAttributes.keys.requestAddress));
                }

                async connectedCallback() {
                    this.shadowRoot.append(elementOutbounds.primerStyleElement.cloneNode(true));
                    const attributes = JSON.parse(this.getAttribute(RequestStreamAttributes.name));
                    const content = await RequestStreamTemplate.content.cloneNode(true);
                    content.querySelector('#title').innerText = await this.#getTitle();
                    await this.shadowRoot.append(content);

                    const showProgress = await this.#getShowProgress();
                    console.log(showProgress);
                    if (showProgress === true) {
                        console.log("ddd");
                        await this.#appendProgress();
                    }

                    const address = this.id.replace(/-/g, '/') + "/" + "requestStreamCreated";
                    elementOutbounds.publish(address, attributes);

                    this.handleRequest();
                }

                async #appendProgress() {
                    console.log("ddddd");
                    elementOutbounds.publish('flux/eco/layout/createProgress', {progressAttributes: {
                        id: this.id + "-progress",
                        parentId: this.id,
                        totalToHandle: await this.#getTotalToHandle()
                    }});
                }

                async handleRequest() {

                    const streamMessagesContainer = this.shadowRoot.querySelector('#stream-messages-container');


                    fetch(await this.#getRequestAddress()).then(async res => {
                        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
                        let handled = 0;
                        while (true) {
                            const {done, value} = await reader.read();
                            if (done) return;

                            handled = handled + 1;
                            elementOutbounds.publish('flux/eco/layout/changeAttributes', {attributes: {
                                    id: "flux-eco-layout-request-stream-user-import-progress",
                                    totalHandled: handled
                                }});

                            let streamMessage = RequestStreamMessageTemplate.content.cloneNode(true);
                            console.log(value);
                            streamMessage.append("");
                            streamMessagesContainer.appendChild(streamMessage);
                        }
                    });


                }

            });
    }
}