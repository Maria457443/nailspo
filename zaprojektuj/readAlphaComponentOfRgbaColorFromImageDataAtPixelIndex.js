import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
export function readAlphaComponentOfRgbaColorFromImageDataAtPixelIndex(imageData, index) {
	const value = imageData.data[index + 3];
	const alphaComponent = new AlphaComponentOfRgbaColor(value);
	return alphaComponent;
}
