export default class RequestStreamAttributes {
    static keys = {
        parentId: "parentId",
        id: "id",
        title: "title",
        totalToHandle: "totalToHandle",
        showProgress: "showProgress",
        requestAddress: "requestAddress",
    }

    parentId;
    id;
    title;
    totalToHandle;
    showProgress;
    requestAddress;

    constructor(parentId, id, title, totalToHandle, showProgress, requestAddress) {
        this.parentId = parentId;
        this.id = id;
        this.title = title;
        this.totalToHandle = totalToHandle;
        this.showProgress = showProgress;
        this.requestAddress = requestAddress;
    }

    /**
     * @param {{ }} value
     * @param {object} schema
     * @return {RequestStreamAttributes}
     */
    static new({parentId, id, title, totalToHandle, showProgress, requestAddress}, schema = null) {
        //todo validate with schema
        return new this(parentId, id, title, totalToHandle, showProgress, requestAddress)
    }
}