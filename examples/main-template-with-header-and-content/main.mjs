import FluxLayoutApi from "../../src/Adapters/Api/FluxLayoutApi.mjs";
import FluxLayoutConfig from "../../src/Adapters/Api/FluxLayoutConfig.mjs";

await FluxLayoutApi.new(
  FluxLayoutConfig.new(
    true,
    window.location + "../../definitions",
    window.location + "../../definitions/css/stylesheet.css",
    window.location + "../../libs/dist/leaflet.css",
  )
);