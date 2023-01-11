import { myDataRequest } from "utils/request";

import { trackEvent } from "utils/analytics";

export const getMyDataset = (id, userToken = null) => {
  return myDataRequest.get(`/dataset/${id}`).then((myDatasetResponse) => {
    const { data: myDataset } = myDatasetResponse.data;

    return myDataset;
  });
};

export const getMyDatasets = () =>
  myDataRequest.get("/dataset").then((myDatasetsResponse) => {
    const { data: myDatasets } = myDatasetsResponse;

    return myDatasets.map((d) => ({
      datasetDetails: { ...d },
      mapDataset: {
        name: d.name,
        id: d.id,
        dataset: d.id,
        layer: d.id,
        layers: [
          {
            name: d.name,
            id: d.id,
            type: "layer",
            default: true,
            active: true,
            dataset: d.id,
            layerConfig: {
              type: "raster",
              source: {
                type: "raster",
                tiles: [
                  `http://localhost/ows/${d.user_id}/?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=${d.slug}`,
                ],
                minzoom: 3,
                maxzoom: 12,
              },
            },
            legendConfig: {},
            params: {
              time: "2022-03-30T06:00:00.000Z",
            },
            paramsSelectorConfig: [
              {
                key: "time",
                required: true,
                sentence: "{selector}",
                type: "datetime",
                dateFormat: {
                  currentTime: "yyyy-mm-dd HH:MM",
                },
                availableDates: ["2022-03-30T06:00:00.000Z"],
              },
            ],
            data_path: d.data_path,
          },
        ],
      },
    }));
  });

export const saveMyDataset = (data) => {
  return myDataRequest({
    method: data.id ? "PUT" : "POST",
    url: data.id ? `/dataset/${data.id}` : "/dataset",
    data,
  }).then((myDatasetResponse) => {
    const { data: dataset } = myDatasetResponse;
    trackEvent({
      category: "User Datasets",
      action: data.id ? "User edits myDataset" : "User creates myDataset",
      label: dataset.id,
    });

    return dataset;
  });
};

export const deleteMyDataset = (id) => {
  trackEvent({
    category: "User Datasets",
    action: "User deletes myDataset",
    label: id,
  });
  return myDataRequest.delete(`/dataset/${id}`);
};
