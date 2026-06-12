import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {readAlphaComponentOfRgbaColorFromImageDataAtPixelIndex} from "./readAlphaComponentOfRgbaColorFromImageDataAtPixelIndex.js";
export function readAlphaComponentOfRgbaColorFromImageDataAtPosition(imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	const alphaComponent = readAlphaComponentOfRgbaColorFromImageDataAtPixelIndex(imageData, indexOfPixel);
	return alphaComponent;
}
