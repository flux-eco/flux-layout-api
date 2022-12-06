import FluxLayoutApi from "../../src/Adapters/Api/FluxLayoutApi.mjs";
import FluxLayoutConfig from "../../src/Adapters/Api/FluxLayoutConfig.mjs";

await FluxLayoutApi.new(
  FluxLayoutConfig.new(
    true,
    window.location + "../../definitions",
    window.location + "../../definitions/css/stylesheet.css",
    "http://localhost:8080/Customizing/global/plugins/Services/Repository/RepositoryObject/Learnplaces/pwa/libs/layout/libs/leaflet/dist/leaflet.css",
  )
);

fetch('http://127.0.0.1:81').then(async res => {
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) return;
        console.log(value)

    }
});

let handled = 0;
while (true) {
    const {done, value} = {}
    if (done) return;

    handled = handled + 1;

    publish('flux/eco/layout/changeAttributes', {attributes: {
            id: "flux-eco-layout-request-stream-user-import-progress",
            totalHandled: handled
        }});


}
