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

    //   {
    //     "name": "Precipitation Forecast",
    //     "id": "gfs_precipitation_1_hr",
    //     "dataset": "gfs_precipitation_1_hr",
    //     "layer": "gfs_precipitation_1_hr",
    //     "category": 1,
    //     "sub_category": 1,
    //     "metadata": "4ba0fb8c-3e9e-42ea-8956-f961dc80f71f",
    //     "citation": "GFS, Hourly for the next 5 days",
    //     "layers": [
    //         {
    //             "name": "Precipitation Forecast",
    //             "id": "gfs_precipitation_1_hr",
    //             "type": "layer",
    //             "default": true,
    //             "active": true,
    //             "dataset": "gfs_precipitation_1_hr",
    //             "layerConfig": {
    //                 "type": "raster",
    //                 "source": {
    //                     "type": "raster",
    //                     "tiles": [
    //                         "http://197.254.13.228:8081/ows/gfs?service=WMS&request=GetMap&version=1.1.1&width=256&height=256&styles=&transparent=true&srs=EPSG:3857&bbox={bbox-epsg-3857}&format=image/png&time={time}&layers=gfs_precipitation_1_hr&clip_feature={clip_feature}"
    //                     ],
    //                     "minzoom": 3,
    //                     "maxzoom": 12
    //                 },
    //                 "canClipToGeom": true
    //             },
    //             "legendConfig": {
    //                 "type": "gradient",
    //                 "items": [
    //                     {
    //                         "name": "",
    //                         "color": "#4f57b7"
    //                     },
    //                     {
    //                         "name": 0.2,
    //                         "color": "#554eb1"
    //                     },
    //                     {
    //                         "name": "",
    //                         "color": "#4369c4"
    //                     },
    //                     {
    //                         "name": 1,
    //                         "color": "#40a0b4"
    //                     },
    //                     {
    //                         "name": "",
    //                         "color": "#4ec262"
    //                     },
    //                     {
    //                         "name": 4,
    //                         "color": "#95db46"
    //                     },
    //                     {
    //                         "name": "",
    //                         "color": "#dcea37"
    //                     },
    //                     {
    //                         "name": 8,
    //                         "color": "#ebc038"
    //                     },
    //                     {
    //                         "name": "",
    //                         "color": "#eaa43e"
    //                     },
    //                     {
    //                         "name": 15,
    //                         "color": "#e97b48"
    //                     },
    //                     {
    //                         "name": "",
    //                         "color": "#e1545d"
    //                     },
    //                     {
    //                         "name": 30,
    //                         "color": "#be3066"
    //                     },
    //                     {
    //                         "name": "40 mm",
    //                         "color": "#93174e"
    //                     }
    //                 ]
    //             },
    //             "params": {
    //                 "time": "",
    //                 "clip_feature": ""
    //             },
    //             "paramsSelectorConfig": [
    //                 {
    //                     "key": "time",
    //                     "required": true,
    //                     "sentence": "{selector}",
    //                     "type": "datetime",
    //                     "dateFormat": {
    //                         "currentTime": "yyyy-mm-dd HH:MM"
    //                     },
    //                     "availableDates": []
    //                 }
    //             ],
    //             "timeParamSentenceConfig": {
    //                 "param": "time",
    //                 "format": "do MMM y hh:mm",
    //                 "add": 7,
    //                 "template": "Selected Period : {time}"
    //             },
    //             "hidePastTimestamps": true,
    //             "data_path": "/gskydata/gfs/gfs-precipitation-1-hr",
    //             "analysisConfig": [
    //                 {
    //                     "key": "forecast",
    //                     "type": "admin"
    //                 }
    //             ]
    //         }
    //     ],
    //     "active": false
    // }

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
              time: "",
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
                availableDates: [],
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
