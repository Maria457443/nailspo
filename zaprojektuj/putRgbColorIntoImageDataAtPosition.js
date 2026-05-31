import {putRgbColorIntoImageDataAtPixelIndex} from "./putRgbColorIntoImageDataAtPixelIndex.js";
import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
export function putRgbColorIntoImageDataAtPosition(color, imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	putRgbColorIntoImageDataAtPixelIndex(color, imageData, indexOfPixel);
	return;
}
