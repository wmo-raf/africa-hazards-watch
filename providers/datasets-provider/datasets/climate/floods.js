export default [
  {
    name: "Rapid Impact Assessment",
    id: "flood_rapid_impact_assessment",
    dataset: "flood_rapid_impact_assessment",
    layer: "flood_rapid_impact_assessment",
    category: 2,
    sub_category: 2,
    active: true,
    metadata: "f3e377ec-c6ce-4823-8d53-3f0e98f999fb",
    layers: [
      {
        name: "Rapid Impact Assessment",
        id: "flood_rapid_impact_assessment",
        dataset: "flood_rapid_impact_assessment",
        disclaimer: "NOTE: This information is EXPERIMENTAL",
        layerConfig: {
          source: {
            maxzoom: 12,
            minzoom: 3,
            tiles: [
              `https://eahazardswatch.icpac.net/cors/http://globalfloods-ows.ecmwf.int/glofas-ows/ows.py?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&BBOX={bbox-epsg-3857}&CRS=EPSG:3857&WIDTH=1152&HEIGHT=1152&LAYERS=RapidImpactAssessment&MAP_RESOLUTION=180&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE`,
            ],
            type: "raster",
          },
          type: "raster",
        },
        legendConfig: {},
        legendImage: {
          url:
            "https://www.globalfloods.eu/media/layers/wms_layer/1/18/legend.png",
        },
        moreInfo: {
          linkText: "More details - GLOFAS",
          linkUrl:
            "https://www.globalfloods.eu/technical-information/glofas-impact-forecasts/",
          text:
            "Potential impact of floods on population and land use (agriculture, urban).",
        },
      },
    ],
  },
];
