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
      id: d.id,
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
              time:
                d.raster_dates &&
                !!d.raster_dates.length &&
                d.raster_dates[d.raster_dates.length - 1],
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
                availableDates: d.raster_dates,
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
    const { data: d } = myDatasetResponse;

    const myDataset = {
      id: d.id,
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
              time:
                d.raster_dates &&
                !!d.raster_dates.length &&
                d.raster_dates[d.raster_dates.length - 1],
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
                availableDates: d.raster_dates,
              },
            ],
            data_path: d.data_path,
          },
        ],
      },
    };

    trackEvent({
      category: "User Datasets",
      action: data.id ? "User edits myDataset" : "User creates myDataset",
      label: d.id,
    });

    return myDataset;
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

export const uploadDatasetFile = (
  file,
  dataset_id,
  onUploadProgress,
  onDownloadProgress
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("dataset_id", dataset_id);

  return myDataRequest({
    url: "/upload",
    method: "POST",
    data: formData,
    onUploadProgress,
    onDownloadProgress,
  }).then((uploadResponse) => {
    const { data: d } = uploadResponse;

    trackEvent({
      category: "User Datasets",
      action: "User uploads raster file to myDataset",
      label: d.dataset_id,
    });

    return d;
  });
};

export const getMyDatasetUploads = (datasetId) =>
  myDataRequest.get(`/dataset/${datasetId}/uploads`).then((res) => {
    const { data: myDatasetUploads } = res;

    return myDatasetUploads;
  });

export const deleteDatasetUploadFile = (uploadId) => {
  return myDataRequest.delete(`/upload/${uploadId}`).then((res) => {
    const upload = res.data;
    trackEvent({
      category: "User Datasets",
      action: "User deletes myDataset Upload",
      label: upload.dataset_id,
    });

    return upload;
  });
};

export const publishMyDatasetRaster = (data) => {
  return myDataRequest({
    method: "POST",
    url: "/raster/create",
    data,
  }).then((rasterResponse) => {
    const { data: d } = rasterResponse;

    trackEvent({
      category: "User Datasets",
      action: "User Publishes Dataset Raster",
      label: d.id,
    });

    const raster = d?.raster_files[0] || {};

    const { dataset_id } = raster;

    return getMyDatasetRasterFiles(dataset_id, true).then((dates) => {
      return {
        publishedRasters: d,
        datasetDates: dates.map((d) => d.file_date),
      };
    });
  });
};

export const getMyDatasetRasterFiles = (datasetId, datesOnly = false) =>
  myDataRequest
    .get(`/dataset/${datasetId}/rasters${datesOnly && "?dates_only"}`)
    .then((res) => {
      const { data: myDatasetRasters } = res;
      return myDatasetRasters;
    });
