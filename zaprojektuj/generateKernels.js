import {cropImage} from "./cropImage.js";
import {BoundingBox} from "./BoundingBox.js";
import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {readRgbaColorFromImageDataAtPixelIndex} from "./readRgbaColorFromImageDataAtPixelIndex.js";
import {checkIfThereIsAWhitePixelAtPosition} from "./checkIfThereIsAWhitePixelAtPosition.js";
// Function taking two kernels of same dimensions and returning a number in range 0 (not similar) to 1 (identical) representing how similar the kernels are. Used to filter out duplicate kernels.
function compareKernels(kernel1, kernel2) {
	if (kernel1.width !== kernel2.width || kernel1.height !== kernel2.height) {
		throw new Error(`compareKernels: kernels must have same dimensions`);
	}
	const totalPixels = kernel1.width * kernel1.height;
	let totalDifferenc = 0;
	for (let i = 0; i < totalPixels; i = i + 1) {
		const color1 = readRgbaColorFromImageDataAtPixelIndex(kernel1, i);
		const color2 = readRgbaColorFromImageDataAtPixelIndex(kernel2, i);
		const difference = Math.max(
			color1.redComponent.computeDistanceTo(color2.redComponent),
			color1.greenComponent.computeDistanceTo(color2.greenComponent),
			color1.blueComponent.computeDistanceTo(color2.blueComponent),
			color1.alphaComponent.computeDistanceTo(color2.alphaComponent),
		) / 255;
		totalDifferenc = totalDifferenc + difference;
	}
	const averageDifference = totalDifferenc / totalPixels;
	const similarity = 1 - averageDifference;
	return similarity;
}
function checkIfKernelIsUnique(kernel, uniqueKernels, similarityThreshold) {
	for (const uniqueKernel of uniqueKernels) {
		const similarity = compareKernels(kernel, uniqueKernel);
		if (similarity > similarityThreshold) {
			return false;
		} else {
			continue;
		}
	}
	return true;
}
export function* generateKernels(options, imagePair) {
	const kernelDimensions = new Dimensions(options.sizeOfKernel, options.sizeOfKernel);
	for (const scaleFactor of options.scaleFactors) {
		const scaledImagePair = scaleFactor === 1 ? imagePair : imagePair.scale(scaleFactor);
		const uniqueKernels = new Set();
		for (const angleInRadians of options.anglesInRadians) {
			const rotatedScaledImagePair = angleInRadians === 0 ? scaledImagePair : scaledImagePair.rotate(angleInRadians);
			for (let y = 0; y < rotatedScaledImagePair.mask.height; y = y + 1) {
				for (let x = 0; x < rotatedScaledImagePair.mask.width; x = x + 1) {
					const position = new Coordinates(x, y);
					if (Math.random() < 0.01) {
					}
					if (checkIfThereIsAWhitePixelAtPosition(rotatedScaledImagePair.mask, position)) {
						const boundingBox = new BoundingBox(position, kernelDimensions);
						const kernel = cropImage(rotatedScaledImagePair.raw, boundingBox);
						if (checkIfKernelIsUnique(kernel, uniqueKernels, 0.95)) {
							uniqueKernels.add(kernel);
							yield kernel;
						} else {
							continue;
						}
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
