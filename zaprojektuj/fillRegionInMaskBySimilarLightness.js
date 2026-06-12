import {deltasOfNeighboringPositions} from "./deltasOfNeighboringPositions.js";
import {whiteRgbaColor} from "./whiteRgbaColor.js";
import {extractDimensionsFromImage} from "./extractDimensionsFromImage.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {HashingSet} from "./HashingSet.js";
export function fillRegionInMaskBySimilarLightness(imagePair, startingPosition, toleranceOfLightness,) {
	const colorsOfMask = new HashingSet();
	const isStartingPositionInImage = startingPosition.checkIfIsInDimensions(imagePair.dimensions);
	if (isStartingPositionInImage) {
		const colorAtStartingPosition = readRgbaColorFromImageDataAtPosition(imagePair.raw, startingPosition);
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
					const colorAtPositionToProcess = readRgbaColorFromImageDataAtPosition(imagePair.raw, positionToProcess);
					const colorAtPositionToProcessAsOklch = colorAtPositionToProcess.convertToOklch();
					const lightnessDifference = Math.abs(colorAtPositionToProcessAsOklch.lightnessComponent - targetLightness);
					if (lightnessDifference <= toleranceOfLightness) {
						colorsOfMask.add(colorAtPositionToProcess);
						putRgbaColorIntoImageDataAtPosition(whiteRgbaColor, imagePair.mask, positionToProcess);
						for (const delta of deltasOfNeighboringPositions) {
							const positionOfNeighbor = positionToProcess.add(delta);
							if (positionOfNeighbor.checkIfIsInDimensions(imagePair.dimensions)) {
								const colorAtPositionOfNeighbor = readRgbaColorFromImageDataAtPosition(imagePair.raw, positionOfNeighbor);
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
	} else {
		return colorsOfMask;
	}
}
