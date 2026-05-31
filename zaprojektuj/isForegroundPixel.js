import {Coordinates} from "./Coordinates.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
export function isForegroundPixel(imageData, position) {
	const color = readRgbaColorFromImageDataAtPosition(imageData, position);
	return (color.redComponent.value + color.greenComponent.value + color.blueComponent.value) > 0;
}