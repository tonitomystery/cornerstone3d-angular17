import { Injectable } from '@angular/core';
import * as cornerstone3d from '@cornerstonejs/core';

import { init as csRenderInit } from '@cornerstonejs/core';

import { init as csToolsInit } from '@cornerstonejs/tools';

import { init as csInit } from '@cornerstonejs/core';
import * as csTools3d from '@cornerstonejs/tools';

declare const cornerstoneDICOMImageLoader: any;
declare const dicomParser: any;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {
    console.log('init cornerstone 3d');
    this.initCornerstoneDICOMImageLoader();
  }

  renderingEngine: any;
  renderingEngineId = 'renderId';

  async initCornerstoneDICOMImageLoader() {
    const { preferSizeOverAccuracy, useNorm16Texture } =
      cornerstone3d.getConfiguration().rendering;

    cornerstoneDICOMImageLoader.external.cornerstone = cornerstone3d;
    cornerstoneDICOMImageLoader.external.dicomParser = dicomParser;

    (window as any).cornerstone3d = cornerstone3d;

    // dicomlineTools.external.Hammer = Hammer;

    cornerstoneDICOMImageLoader.configure({
      useWebWorkers: true,
      decodeConfig: {
        convertFloatPixelDataToInt: false,
        use16BitDataType: preferSizeOverAccuracy || useNorm16Texture,
      },
    });

    let maxWebWorkers = 1;

    if (navigator.hardwareConcurrency) {
      maxWebWorkers = Math.min(navigator.hardwareConcurrency, 7);
    }

    const config = {
      maxWebWorkers,
      startWebWorkersOnDemand: false,
      taskConfiguration: {
        decodeTask: {
          initializeCodecsOnStartup: false,
          strict: false,
        },
      },
    };

    cornerstoneDICOMImageLoader.webWorkerManager.initialize(config);

    await csToolsInit();
    await csRenderInit();
    this.renderingEngine = new cornerstone3d.RenderingEngine(
      this.renderingEngineId
    );
  }
  
  loadDataSetFromURL(url: any) {
    return cornerstoneDICOMImageLoader.wadouri.dataSetCacheManager.load(
      url,
      cornerstoneDICOMImageLoader.internal.xhrRequest
    );
  }

  loadImage(imageId: any) {
    return cornerstoneDICOMImageLoader.wadouri.loadImage(imageId).promise;
  }

  getImageIdFromFile(file: any) {
    return cornerstoneDICOMImageLoader.wadouri.fileManager.add(file);
  }
}
