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