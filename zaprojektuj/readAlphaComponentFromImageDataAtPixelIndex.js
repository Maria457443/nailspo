import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
export function readAlphaComponentFromImageDataAtPixelIndex(imageData, index) {
	const alphaComponent = new AlphaComponentOfRgbaColor(imageData.data[index + 3]);
	return alphaComponent;
}
