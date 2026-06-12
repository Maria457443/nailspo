import {deltasOfNeighboringPositions} from "./deltasOfNeighboringPositions.js";
import {whiteRgbaColor} from "./whiteRgbaColor.js";
import {extractDimensionsFromImage} from "./extractDimensionsFromImage.js";
import {readRgbColorFromImageDataAtPosition} from "./readRgbColorFromImageDataAtPosition.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {HashingSet} from "./HashingSet.js";
import {Coordinates} from "./Coordinates.js";
export function fillRegionInMask(imagePair, startingPosition, toleranceOfLightness,) {
	const isStartingPositionInImage = startingPosition.checkIfIsInDimensions(imagePair.dimensions);
	if (isStartingPositionInImage) {
		// const referenceColors = new HashingSet();
		// update lower and upper bounds of lightness with nearby colors
		// const radius = 5;
		// for (let deltaY = -radius; deltaY <= radius; deltaY = deltaY + 1) {
		// 	for (let deltaX = -radius; deltaX <= radius; deltaX = deltaX + 1) {
		// 		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		// 		if (distance <= radius) {
		// 			const position = startingPosition.add(new Coordinates(deltaX, deltaY));
		// 			if (position.checkIfIsInDimensions(imagePair.dimensions)) {
		// 				const colorAtPosition = readRgbColorFromImageDataAtPosition(imagePair.raw, position);
		// 				referenceColors.add(colorAtPosition);
		// 				continue;
		// 			} else {
		// 				continue;
		// 			}
		// 		} else {
		// 			continue;
		// 		}
		// 	}
		// 	continue;
		// }
		// function computeLowestDistanceOfColorToReferenceColors(color) {
		// 	let lowestDistance = null;
		// 	for (const referenceColor of referenceColors) {
		// 		const distance = color.computeDistanceTo(referenceColor);
		// 		if (lowestDistance === null || distance < lowestDistance) {
		// 			lowestDistance = distance;
		// 			continue;
		// 		} else {
		// 			continue;
		// 		}
		// 	}
		// 	return lowestDistance;
		// }
		const processedPositions = new HashingSet();
		const positionsToProcess = [startingPosition];
		for (;;) {
			const positionToProcess = positionsToProcess.shift();
			if (positionToProcess === undefined) {
				break;
			} else {
				if (processedPositions.has(positionToProcess)) {
					continue;
				} else {
					processedPositions.add(positionToProcess);
					const colorAtPositionToProcess = readRgbColorFromImageDataAtPosition(imagePair.raw, positionToProcess);
					// const lowestDistanceOfColorAtPositionToReferenceColors = computeLowestDistanceOfColorToReferenceColors(colorAtPositionToProcess);
					// if (
					// 	lowestDistanceOfColorAtPositionToReferenceColors !== null &&
					// 	lowestDistanceOfColorAtPositionToReferenceColors <= toleranceOfLightness
					// ) {
						putRgbaColorIntoImageDataAtPosition(whiteRgbaColor, imagePair.mask, positionToProcess);
						for (const delta of deltasOfNeighboringPositions) {
							const positionOfNeighbor = positionToProcess.add(delta);
							if (positionOfNeighbor.checkIfIsInDimensions(imagePair.dimensions)) {
								const colorAtPositionOfNeighbor = readRgbColorFromImageDataAtPosition(imagePair.raw, positionOfNeighbor);
								const distance = colorAtPositionToProcess.computeDistanceTo(colorAtPositionOfNeighbor);
								if (distance <= toleranceOfLightness) {
									positionsToProcess.push(positionOfNeighbor);
									continue;
								} else {
									// const colorAtPositionOfNeighborAsOklch = colorAtPositionOfNeighbor.convertToOklch();
									// positionsToProcess.push(positionOfNeighbor);
									continue;
								}
							} else {
								continue;
							}
						}
						continue;
					// } else {
					// 	continue;
					// }
				}
			}
		}
		const points = Array.from(processedPositions);
		if (points.length > 2) {
			const hull = computeConvexHull(points);
			const scaledHull = scaleHull(hull, 1.15);
			fillHull(scaledHull, imagePair);
		}
	} else {
		return;
	}
}

function scaleHull(hull, scaleFactor) {
	let sumX = 0;
	let sumY = 0;
	for (const point of hull) {
		sumX = sumX + point.x;
		sumY = sumY + point.y;
		continue;
	}
	const centerX = sumX / hull.length;
	const centerY = sumY / hull.length;
	const scaledHull = [];
	for (const point of hull) {
		const dx = point.x - centerX;
		const dy = point.y - centerY;
		const newX = centerX + dx * scaleFactor;
		const newY = centerY + dy * scaleFactor;
		scaledHull.push(new Coordinates(newX, newY).round());
		continue;
	}
	return scaledHull;
}

function computeConvexHull(points) {
	points.sort((a, b) => {
		if (a.x !== b.x) {
			return a.x - b.x;
		}
		return a.y - b.y;
	});
	const n = points.length;
	const hull = [];
	for (let i = 0; i < n; i = i + 1) {
		while (hull.length >= 2 && crossProduct(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
			hull.pop();
		}
		hull.push(points[i]);
		continue;
	}
	const lowerHullLength = hull.length;
	for (let i = n - 2; i >= 0; i = i - 1) {
		while (hull.length > lowerHullLength && crossProduct(hull[hull.length - 2], hull[hull.length - 1], points[i]) <= 0) {
			hull.pop();
		}
		hull.push(points[i]);
		continue;
	}
	hull.pop();
	return hull;
}

function crossProduct(a, b, c) {
	return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function fillHull(hull, imagePair) {
	const minXPerY = new Map();
	const maxXPerY = new Map();
	const updateExtremes = (x, y) => {
		if (!minXPerY.has(y) || x < minXPerY.get(y)) {
			minXPerY.set(y, x);
		}
		if (!maxXPerY.has(y) || x > maxXPerY.get(y)) {
			maxXPerY.set(y, x);
		}
		return;
	};
	for (let i = 0; i < hull.length; i = i + 1) {
		const p1 = hull[i];
		const p2 = hull[(i + 1) % hull.length];
		let x1 = p1.x;
		let y1 = p1.y;
		let x2 = p2.x;
		let y2 = p2.y;
		if (y1 === y2) {
			updateExtremes(x1, y1);
			updateExtremes(x2, y1);
		} else {
			if (y1 > y2) {
				const temporaryX = x1;
				x1 = x2;
				x2 = temporaryX;
				const temporaryY = y1;
				y1 = y2;
				y2 = temporaryY;
			}
			for (let y = y1; y <= y2; y = y + 1) {
				const x = x1 + (x2 - x1) * (y - y1) / (y2 - y1);
				updateExtremes(x, y);
				continue;
			}
		}
		continue;
	}
	for (const [y, minX] of minXPerY) {
		const maxX = maxXPerY.get(y);
		for (let x = Math.ceil(minX); x <= Math.floor(maxX); x = x + 1) {
			const position = new Coordinates(x, y);
			if (position.checkIfIsInDimensions(imagePair.dimensions)) {
				putRgbaColorIntoImageDataAtPosition(whiteRgbaColor, imagePair.mask, position);
			}
			continue;
		}
		continue;
	}
	return;
}
