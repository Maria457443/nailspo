import {Coordinates} from "./Coordinates.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {Builder0To1OfRgbaColor} from "./Builder0To1OfRgbaColor.js";
import {ComponentOfBuilder0To1OfRgbaColor} from "./ComponentOfBuilder0To1OfRgbaColor.js";
import {correlateImageWithKernelAtPosition} from "./correlateImageWithKernelAtPosition.js";
export function computeNailMask(image, kernels) {
	const mask = new ImageData(image.width, image.height);
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			let bestScore = 0;
			for (const kernel of kernels) {
				const correlation = correlateImageWithKernelAtPosition(image, kernel, position);
				const score = (
					correlation.redComponent.value
					+ correlation.greenComponent.value
					+ correlation.blueComponent.value
				) / 3;
				if (score > bestScore) {
					bestScore = score;
					continue;
				} else {
					continue;
				}
			}
			const adjustedBestScore = bestScore ** 200;
			const recordCorrelation = new Builder0To1OfRgbaColor(
				new ComponentOfBuilder0To1OfRgbaColor(adjustedBestScore),
				new ComponentOfBuilder0To1OfRgbaColor(adjustedBestScore),
				new ComponentOfBuilder0To1OfRgbaColor(adjustedBestScore),
				new ComponentOfBuilder0To1OfRgbaColor(1),
			);
			const color = recordCorrelation.build();
			putRgbaColorIntoImageDataAtPosition(color, mask, position,);
			continue;
		}
		continue;
	}
	return mask;
}
