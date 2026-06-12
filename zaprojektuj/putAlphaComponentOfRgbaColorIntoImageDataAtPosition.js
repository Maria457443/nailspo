import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
export function putAlphaComponentOfRgbaColorIntoImageDataAtPosition(component, imageData, position) {
	const indexOfPixel = computeIndexOfPixelInImageDataAtPosition(imageData, position);
	imageData.data[indexOfPixel + 3] = component.convertTo0To255Integer();
	return;
}
