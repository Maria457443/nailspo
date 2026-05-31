import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {readAlphaFromImageDataAtPixelIndex} from "./readAlphaFromImageDataAtPixelIndex.js";
export function readAlphaFromImageDataAtPosition(imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	const alphaComponent = readAlphaFromImageDataAtPixelIndex(imageData, indexOfPixel);
	return alphaComponent;
}
