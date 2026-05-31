import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
export function checkIfThereIsAWhitePixelAtPosition(mask, position) {
	const color = readRgbaColorFromImageDataAtPosition(mask, position);
	return color.redComponent.value === 255 && color.greenComponent.value === 255 && color.blueComponent.value === 255;
}
