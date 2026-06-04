import {mapImage} from "./mapImage.js";
import {RgbaColor} from "./RgbaColor.js";
import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
export function extractLightnessPreviewImage(inputImage) {
	const outputImage = mapImage(inputImage, function (color) {
		const colorAsOklch = color.convertToOklch();
		const result = RgbaColor.createFrom0To1Float(
			colorAsOklch.lightnessComponent,
			colorAsOklch.lightnessComponent,
			colorAsOklch.lightnessComponent,
			1,
		);
		return result;
	});
	return outputImage;
}
