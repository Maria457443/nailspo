import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {putRgbaColorIntoImageDataAtPixelIndex} from "./putRgbaColorIntoImageDataAtPixelIndex.js";
export function putRgbaColorIntoImageDataAtPosition(color, image, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(image, position);
	putRgbaColorIntoImageDataAtPixelIndex(color, image, indexOfPixel);
	return;
}
