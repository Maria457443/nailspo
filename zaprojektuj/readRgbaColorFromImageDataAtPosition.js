import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {readRgbaColorFromImageDataAtPixelIndex} from "./readRgbaColorFromImageDataAtPixelIndex.js";
export function readRgbaColorFromImageDataAtPosition(imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	const color = readRgbaColorFromImageDataAtPixelIndex(imageData, indexOfPixel);
	return color;
}
