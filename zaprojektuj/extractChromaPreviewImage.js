import {mapImage} from "./mapImage.js";
import {RgbaColor} from "./RgbaColor.js";
import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
import {maximalChroma} from "./maximalChroma.js";
export function extractChromaPreviewImage(inputImage) {
	const outputImage = mapImage(inputImage, function (color) {
		const colorAsOklch = color.convertToOklch();
		const normalizedChromeComponentOfColorAsOklch = colorAsOklch.chromaComponent / maximalChroma;
		const result = RgbaColor.createFrom0To1Float(
			normalizedChromeComponentOfColorAsOklch,
			normalizedChromeComponentOfColorAsOklch,
			normalizedChromeComponentOfColorAsOklch,
			1,
		);
		return result;
	});
	return outputImage;
}
