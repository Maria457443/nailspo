import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {RgbColor} from "./RgbColor.js";
export function readRgbColorFromImageDataAtPixelIndex(imageData, index) {
	const redComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 0]);
	const greenComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 1]);
	const blueComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 2]);
	const color = new RgbColor(
		redComponentOfColor,
		greenComponentOfColor,
		blueComponentOfColor
	);
	return color;
}
