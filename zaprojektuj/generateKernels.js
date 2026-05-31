import {cropImage} from "./cropImage.js";
import {BoundingBox} from "./BoundingBox.js";
import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {readRgbaColorFromImageDataAtPixelIndex} from "./readRgbaColorFromImageDataAtPixelIndex.js";
import {checkIfThereIsAWhitePixelAtPosition} from "./checkIfThereIsAWhitePixelAtPosition.js";
export function* generateKernels(options, imagePair) {
	const kernelDimensions = new Dimensions(options.sizeOfKernel, options.sizeOfKernel);
	for (const scaleFactor of options.scaleFactors) {
		const scaledImagePair = imagePair.scale(scaleFactor);
		for (const angleInRadians of options.anglesInRadians) {
			const rotatedScaledImagePair = scaledImagePair.rotate(angleInRadians);
			for (let y = 0; y < rotatedScaledImagePair.mask.height; y = y + 1) {
				for (let x = 0; x < rotatedScaledImagePair.mask.width; x = x + 1) {
					const position = new Coordinates(x, y);
					if (checkIfThereIsAWhitePixelAtPosition(rotatedScaledImagePair.mask, position)) {
						const boundingBox = new BoundingBox(position, kernelDimensions);
						const kernel = cropImage(rotatedScaledImagePair.raw, boundingBox);
						yield kernel;
						continue;
					} else {
						continue;
					}
				}
			}
			continue;
		}
		continue;
	}
	return;
}
