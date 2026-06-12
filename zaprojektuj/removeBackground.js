import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {HashingSet} from "./HashingSet.js";
import {RgbaColor} from "./RgbaColor.js";

export function removeBackground(image) {
	const dimensions = new Dimensions(image.width, image.height);
	const sampledBoundaryPoints = [];
	const sampleRate = 20;
	for (let x = 0; x < image.width; x += Math.max(1, Math.floor(image.width / sampleRate))) {
		sampledBoundaryPoints.push(new Coordinates(x, 0));
		sampledBoundaryPoints.push(new Coordinates(x, image.height - 1));
	}
	for (let y = 0; y < image.height; y += Math.max(1, Math.floor(image.height / sampleRate))) {
		sampledBoundaryPoints.push(new Coordinates(0, y));
		sampledBoundaryPoints.push(new Coordinates(image.width - 1, y));
	}

	const boundaryColors = sampledBoundaryPoints.map(pos => readRgbaColorFromImageDataAtPosition(image, pos).convertToOklch());
	
	const avgL = boundaryColors.reduce((sum, c) => sum + c.lightnessComponent, 0) / boundaryColors.length;
	const avgC = boundaryColors.reduce((sum, c) => sum + c.chromaComponent, 0) / boundaryColors.length;

	const toleranceL = 0.15;
	const toleranceC = 0.1;
	const transparent = RgbaColor.createFrom0To255Integer(0, 0, 0, 0);
	const processedPositions = new HashingSet();
	const positionsToProcess = [];
	
	for (let x = 0; x < image.width; x++) {
		positionsToProcess.push(new Coordinates(x, 0));
		positionsToProcess.push(new Coordinates(x, image.height - 1));
	}
	for (let y = 0; y < image.height; y++) {
		positionsToProcess.push(new Coordinates(0, y));
		positionsToProcess.push(new Coordinates(image.width - 1, y));
	}

	const deltas = [
		new Coordinates(0, -1),
		new Coordinates(0, 1),
		new Coordinates(-1, 0),
		new Coordinates(1, 0),
	];

	while (positionsToProcess.length > 0) {
		const pos = positionsToProcess.shift();
		if (processedPositions.has(pos)) {
			continue;
		} else {
			processedPositions.add(pos);
			const color = readRgbaColorFromImageDataAtPosition(image, pos).convertToOklch();
			
			const diffL = Math.abs(color.lightnessComponent - avgL);
			const diffC = Math.abs(color.chromaComponent - avgC);

			if (diffL < toleranceL && diffC < toleranceC) {
				putRgbaColorIntoImageDataAtPosition(transparent, image, pos);
				for (const delta of deltas) {
					const neighbor = pos.add(delta);
					if (neighbor.checkIfIsInDimensions(dimensions)) {
						positionsToProcess.push(neighbor);
					}
				}
			}
		}
	}
	return image;
}
