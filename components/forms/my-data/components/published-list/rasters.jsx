import React, { PureComponent } from "react";

class RasterFiles extends PureComponent {
  componentDidMount() {
    const { getMyDataRasters, activeMyDataset } = this.props;

    if (activeMyDataset && activeMyDataset.id) {
      getMyDataRasters(activeMyDataset.id);
    }
  }
  render() {
    const { myDataRasterFiles, activeMyDataset } = this.props;

    const activeDatasetRasterFiles =
      activeMyDataset &&
      activeMyDataset.id &&
      myDataRasterFiles &&
      myDataRasterFiles[activeMyDataset.id];

    const hasRasterFiles =
      activeDatasetRasterFiles && !!activeDatasetRasterFiles.length;

    if (!hasRasterFiles) {
      return <div>No Raster files yet. Create by uploading files</div>;
    }

    return (
      <div>
        {activeDatasetRasterFiles.map((raster) => {
          return <div key={raster.id}>{raster.file_date}</div>;
        })}
      </div>
    );
  }
}

export default RasterFiles;
