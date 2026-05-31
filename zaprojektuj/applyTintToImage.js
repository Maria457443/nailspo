import {RgbColor} from "./RgbColor.js";
import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {computeIndexOfPixelInImageDataAtPosition} from "./computeIndexOfPixelInImageDataAtPosition.js";
import {putRgbaColorIntoImageDataAtPixelIndex} from "./putRgbaColorIntoImageDataAtPixelIndex.js";
import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
import {readAlphaComponentFromImageDataAtPixelIndex} from "./readAlphaComponentFromImageDataAtPixelIndex.js";
import {readRgbColorFromImageDataAtPixelIndex} from "./readRgbColorFromImageDataAtPixelIndex.js";
import {computeStrengthOfMaskAtPixelIndex} from "./computeStrengthOfMaskAtPixelIndex.js";
import {applyTintToRgbColor} from "./applyTintToRgbColor.js";
export function applyTintToImage(tint, image, nailMask) {
	const tintedImage = new ImageData(image.width, image.height);
	for (let indexOfPixel = 0; indexOfPixel < image.data.length; indexOfPixel = indexOfPixel + 4) {
		const strengthOfMask = computeStrengthOfMaskAtPixelIndex(nailMask, indexOfPixel);
		const originalColorOfPixel = readRgbColorFromImageDataAtPixelIndex(image, indexOfPixel);
		const tintedColorOfPixel = applyTintToRgbColor(tint, originalColorOfPixel, strengthOfMask);
		const alphaComponent = readAlphaComponentFromImageDataAtPixelIndex(image, indexOfPixel);
		const tintedColorWithAlphaComponent = tintedColorOfPixel.withAlphaComponent(alphaComponent);
		putRgbaColorIntoImageDataAtPixelIndex(tintedColorWithAlphaComponent, tintedImage, indexOfPixel);
		continue;
	}
	return tintedImage;
}
