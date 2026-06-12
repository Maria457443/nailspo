import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
export function checkIfThereIsAWhitePixelAtPosition(mask, position) {
	const color = readRgbColorFromImageDataAtPosition(mask, position);
	const areColorsEqual = whiteRgbColor.equals(color);
	return areColorsEqual;
}
