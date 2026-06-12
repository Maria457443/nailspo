import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
import {checkIfColorIsBackgroundColor} from "./checkIfColorIsBackgroundColor.js";
import {putAlphaComponentOfRgbaColorIntoImageDataAtPosition} from "./putAlphaComponentOfRgbaColorIntoImageDataAtPosition.js";
import {copyImage} from "./copyImage.js";
import {transparentAlphaComponentOfRgbaColor} from "./transparentAlphaComponentOfRgbaColor.js";
import {deltasOfNeighboringPositions} from "./deltasOfNeighboringPositions.js";
import {HashingSet} from "./HashingSet.js";
export function removeBackgroundCopying(image) {
	const dimensions = new Dimensions(image.width, image.height);
	const positionsToSample = [
		new Coordinates(0, 0),
		new Coordinates(0, dimensions.height - 1),
		new Coordinates(dimensions.width - 1, 0),
		new Coordinates(dimensions.width - 1, dimensions.height - 1),
	];
	const backgroundColors = positionsToSample.map(function (position) {
		const color = readRgbaColorFromImageDataAtPosition(image, position);
		return color;
	});
	const imageWithRemovedBackground = copyImage(image);
	const toleranceOfLightness = 0.2;
	const toleranceOfChroma = 0.3;
	const toleranceOfHue = 5;
	const processedPositions = new HashingSet();
	const positionsToProcess = [...positionsToSample];
	for (;;) {
		const positionToProcess = positionsToProcess.shift();
		if (positionToProcess === undefined) {
			return imageWithRemovedBackground;
		} else {
			if (processedPositions.has(positionToProcess)) {
				continue;
			} else {
				processedPositions.add(positionToProcess);
				const color = readRgbaColorFromImageDataAtPosition(image, positionToProcess);
				const isBackgroundColor = checkIfColorIsBackgroundColor(backgroundColors, color, toleranceOfLightness, toleranceOfChroma, toleranceOfHue);
				if (isBackgroundColor) {
					putAlphaComponentOfRgbaColorIntoImageDataAtPosition(transparentAlphaComponentOfRgbaColor, imageWithRemovedBackground, positionToProcess);
					for (const delta of deltasOfNeighboringPositions) {
						const positionOfNeighbor = positionToProcess.add(delta);
						if (positionOfNeighbor.checkIfIsInDimensions(dimensions)) {
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
}
