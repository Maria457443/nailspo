import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
export function readAlphaFromImageDataAtPixelIndex(imageData, index) {
	const alphaComponent = new ComponentOfRgbColor(imageData.data[index + 3]);
 	return alphaComponent;
}
