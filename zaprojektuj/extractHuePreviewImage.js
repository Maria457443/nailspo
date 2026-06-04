import {mapImage} from "./mapImage.js";
import {RgbaColor} from "./RgbaColor.js";
import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
export function extractHuePreviewImage(inputImage) {
	const outputImage = mapImage(inputImage, function (color) {
		const colorAsOklch = color.convertToOklch();
		const normalizedHueComponentOfColorAsOklch = colorAsOklch.hueComponent / (2 * Math.PI);
		const result = RgbaColor.createFrom0To1Float(
			normalizedHueComponentOfColorAsOklch,
			normalizedHueComponentOfColorAsOklch,
			normalizedHueComponentOfColorAsOklch,
			1,
		);
		return result;
	});
	return outputImage;
}
