import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
export function putAlphaIntoImageDataAtPosition(component, imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	imageData.data[indexOfPixel + 3] = component.value;
	return;
}
