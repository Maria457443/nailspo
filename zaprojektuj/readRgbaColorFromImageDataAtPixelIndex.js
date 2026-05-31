import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {RgbaColor} from "./RgbaColor.js";
export function readRgbaColorFromImageDataAtPixelIndex(imageData, index) {
	const redComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 0]);
	const greenComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 1]);
	const blueComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 2]);
	const alphaComponentOfColor = new ComponentOfRgbColor(imageData.data[index + 3]);
	const color = new RgbaColor(
		redComponentOfColor,
		greenComponentOfColor,
		blueComponentOfColor,
		alphaComponentOfColor
	);
	return color;
}
