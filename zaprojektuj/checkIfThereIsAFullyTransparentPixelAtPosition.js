import {readAlphaComponentOfRgbaColorFromImageDataAtPosition} from "./readAlphaComponentOfRgbaColorFromImageDataAtPosition.js";
export function checkIfThereIsAFullyTransparentPixelAtPosition(image, position) {
	const alphaComponent = readAlphaComponentOfRgbaColorFromImageDataAtPosition(image, position);
	const isFullyTransparent = alphaComponent.convertTo0To255Integer() === 0;
	return isFullyTransparent;
}
	