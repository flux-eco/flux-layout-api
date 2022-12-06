import {RequestStreamTemplate} from './RequestStreamTemplate.mjs';
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
     * @param {RequestStreamAttributes} attributes
     * @return {Promise<HTMLElement>}
     */
    async createElement(attributes) {
        const element = document.createElement(this.tag);
        element.id = attributes.id;
        element.slot = "content-item"; //todo

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
                    for (let attribute in RequestStreamAttributes.keys) {
                        attributes[attribute] = this.getAttribute(attribute);
                    }
                    return RequestStreamAttributes.new(attributes)
                }

                async #getParentId() {
                    return this.getAttribute(RequestStreamAttributes.keys.parentId);
                }

                async #getTitle() {
                    return this.getAttribute(RequestStreamAttributes.keys.title);
                }

                async #getTotalToHandle() {
                    return this.getAttribute(RequestStreamAttributes.keys.totalToHandle);
                }

                async #getShowProgress() {
                    return this.getAttribute(RequestStreamAttributes.keys.showProgress);
                }

                async #getRequestAddress() {
                    return this.getAttribute(RequestStreamAttributes.keys.requestAddress);
                }

                async connectedCallback() {
                    this.shadowRoot.append(style.cloneNode(true));
                    const attributes = JSON.parse(this.getAttribute(RequestStreamAttributes.name));
                    const content = await RequestStreamTemplate.content.cloneNode(true);
                    content.querySelector('#title').innerText = await this.#getTitle();
                    await this.shadowRoot.append(content);

                    const showProgress = await this.#getShowProgress();
                    console.log(showProgress);
                   // if (showProgress === true) {
                        console.log("ddd");
                        await this.#appendProgress();
                    //}

                    const address = this.id.replace(/-/g, '/') + "/" + "requestStreamCreated";
                    publish(address, attributes)
                }

                async #appendProgress() {
                    console.log("ddddd");
                    publish('flux/eco/layout/createProgress', {progressAttributes: {
                        id: this.id + "-progress",
                        parentId: this.id,
                        totalToHandle: await this.#getTotalToHandle()
                    }});
                }

                async handleRequest() {
                    fetch(this.#getRequestAddress()).then(async res => {
                        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
                        let handled = 0;
                        while (true) {
                            const {done, value} = await reader.read();
                            if (done) return;

                            handled = handled + 1;
                            publish('flux/eco/layout/changeAttributes', {attributes: {
                                    id: "flux-eco-layout-request-stream-user-import-progress",
                                    totalHandled: handled
                                }});

                            output.append(value);
                        }
                    });


                }

            });
    }
}