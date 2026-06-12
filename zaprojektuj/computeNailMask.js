import {Coordinates} from "./Coordinates.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {fillMaskInterior} from "./fillMaskInterior.js";
import {RgbaColor} from "./RgbaColor.js";
import {computePositionsOfNails} from "./computePositionsOfNails.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
const blackColor = RgbaColor.createFrom0To255Integer(0, 0, 0, 255);
const whiteColor = RgbaColor.createFrom0To255Integer(255, 255, 255, 255);
export function computeNailMask(image) {
	const mask = new ImageData(image.width, image.height);
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			putRgbaColorIntoImageDataAtPosition(blackColor, mask, position);
			continue;
		}
		continue;
	}
	const positionsOfNails = Array.from(computePositionsOfNails(image));
	const colorsOfMask = new HashingSet();
	for (const position of positionsOfNails) {
		const roundedPosition = position.round();
		putRgbaColorIntoImageDataAtPosition(whiteColor, mask, roundedPosition);
		// fillRegionByLightnessHueAndChroma(image, mask, roundedPosition, 0.00,);
		const colorsOfCurrentNail = fillRegionByLightnessHueAndChroma(image, mask, roundedPosition, 0.02,);
		for (const color of colorsOfCurrentNail) {
			colorsOfMask.add(color);
			continue;
		}
		continue;
	}
	console.log(colorsOfMask);
	// function expandHashingSetOfColorsBySimilarColorsOfImage(hashingSet) {
	// 	const expandedHashingSet = new HashingSet();
	// 	for (const color1 of hashingSet) {
	// 		expandedHashingSet.add(color1);
	// 		for (const color2 of hashingSet) {
	// 			const interpolatedColor = color1.interpolateTo(0.5, color2);
	// 			expandedHashingSet.add(interpolatedColor);
	// 			continue;
	// 		}
	// 		continue;
	// 	}
	// 	return expandedHashingSet;
	// }
	// const expandedColorsOfMask = expandHashingSetOfColorsBySimilarColorsOfImage(colorsOfMask);
	// for (const position of positionsOfNails) {
	// 	const roundedPosition = position.round();
	// 	fillRegionBySimilarColors(image, mask, roundedPosition, expandedColorsOfMask);
	// 	continue;
	// }
	return mask;
}
function extractDimensionsFromImage(image) {
	const dimensions = new Dimensions(image.width, image.height);
	return dimensions;
}
import {Dimensions} from "./Dimensions.js";
import {HashingSet} from "./HashingSet.js";
const deltas = [
	new Coordinates(0, -1),
	new Coordinates(0, 1),
	new Coordinates(-1, 0),
	new Coordinates(1, 0),
];
function fillRegionBySimilarColors(image, mask, startingPosition, knownColors) {
	console.log(fillRegionBySimilarColors);
	const dimensionsOfImage = extractDimensionsFromImage(image);
	let count = 0;
	if (startingPosition.checkIfIsInDimensions(dimensionsOfImage)) {
		const processedPositions = new HashingSet();
		const positionsToProcess = [startingPosition];
		for (;;) {
			const positionToProcess = positionsToProcess.shift();
			if (positionToProcess === undefined) {
				console.log(count);
				return;
			} else {
				if (processedPositions.has(positionToProcess)) {
					continue;
				} else {
					processedPositions.add(positionToProcess);
					const colorAtPositionToProcess = readRgbaColorFromImageDataAtPosition(image, positionToProcess);
					if (knownColors.has(colorAtPositionToProcess)) {
						putRgbaColorIntoImageDataAtPosition(whiteColor, mask, positionToProcess);
						count = count + 1;
						for (const delta of deltas) {
							const positionOfNeighbor = positionToProcess.add(delta);
							if (positionOfNeighbor.checkIfIsInDimensions(dimensionsOfImage)) {
								positionsToProcess.push(positionOfNeighbor);
								continue;
							} else {
								continue;
							}
						}
						continue;
					} else {
						continue;
					}
				}
			}
		}
	} else {
		console.log(count, `out of bounds`);
		return;
	}
}
function fillRegionByLightnessHueAndChroma(image, mask, startingPosition, toleranceOfLightness,) {
	const colorsOfMask = new HashingSet();
	const dimensionsOfImage = extractDimensionsFromImage(image);
	if (startingPosition.checkIfIsInDimensions(dimensionsOfImage)) {
		const colorAtStartingPosition = readRgbaColorFromImageDataAtPosition(image, startingPosition);
		const colorAtStartingPositionAsOklch = colorAtStartingPosition.convertToOklch();
		const targetLightness = colorAtStartingPositionAsOklch.lightnessComponent;
		const processedPositions = new HashingSet();
		const positionsToProcess = [startingPosition];
		for (;;) {
			const positionToProcess = positionsToProcess.shift();
			if (positionToProcess === undefined) {
				return colorsOfMask;
			} else {
				if (processedPositions.has(positionToProcess)) {
					continue;
				} else {
					processedPositions.add(positionToProcess);
					const colorAtPositionToProcess = readRgbaColorFromImageDataAtPosition(image, positionToProcess);
					const colorAtPositionToProcessAsOklch = colorAtPositionToProcess.convertToOklch();
					const lightnessDifference = Math.abs(colorAtPositionToProcessAsOklch.lightnessComponent - targetLightness);
					if (lightnessDifference <= toleranceOfLightness) {
						colorsOfMask.add(colorAtPositionToProcess);
						putRgbaColorIntoImageDataAtPosition(whiteColor, mask, positionToProcess);
						for (const delta of deltas) {
							const positionOfNeighbor = positionToProcess.add(delta);
							if (positionOfNeighbor.checkIfIsInDimensions(dimensionsOfImage)) {
								const colorAtPositionOfNeighbor = readRgbaColorFromImageDataAtPosition(image, positionOfNeighbor);
								const colorAtPositionOfNeighborAsOklch = colorAtPositionOfNeighbor.convertToOklch();
								const lightnessDifference = Math.abs(colorAtPositionOfNeighborAsOklch.lightnessComponent - targetLightness);
								if (lightnessDifference <= toleranceOfLightness) {
									positionsToProcess.push(positionOfNeighbor);
									continue;
								} else {
									continue;
								}
							} else {
								continue;
							}
						}
						continue;
					} else {
						continue;
					}
				}
			}
		}
		return colorsOfMask;
	} else {
		return colorsOfMask;
	}
}
