import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {RgbaColor} from "./RgbaColor.js";
export function readRgbaColorFromImageDataAtPixelIndex(imageData, index) {
	const color = RgbaColor.createFrom0To255Integer(
		imageData.data[index + 0],
		imageData.data[index + 1],
		imageData.data[index + 2],
		imageData.data[index + 3],
	);
	return color;
}
