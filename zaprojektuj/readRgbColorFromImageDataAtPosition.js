import {RgbColor} from "./RgbColor.js";
import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {readRgbColorFromImageDataAtPixelIndex} from "./readRgbColorFromImageDataAtPixelIndex.js";
export function readRgbColorFromImageDataAtPosition(imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	const color = readRgbColorFromImageDataAtPixelIndex(imageData, indexOfPixel);
	return color;
}