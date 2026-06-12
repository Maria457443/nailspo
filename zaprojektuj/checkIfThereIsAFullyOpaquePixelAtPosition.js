import {readAlphaComponentOfRgbaColorFromImageDataAtPosition} from "./readAlphaComponentOfRgbaColorFromImageDataAtPosition.js";
export function checkIfThereIsAFullyOpaquePixelAtPosition(imageData, position) {
	const alphaComponent = readAlphaComponentOfRgbaColorFromImageDataAtPosition(imageData, position);
	const isFullyOpaque = alphaComponent.convertTo0To255Integer() === 255;
	return isFullyOpaque;
}
