import {Coordinates} from "./Coordinates.js";
import {checkIfPositionIsInNail} from "./checkIfPositionIsInNail.js";
import {checkIfThereIsAFullyOpaquePixelAtPosition} from "./checkIfThereIsAFullyOpaquePixelAtPosition.js";
export function* computePositionsOfNails(image) {
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			const isThereAFullyOpaquePixelAtPosition = checkIfThereIsAFullyOpaquePixelAtPosition(image, position);
			if (isThereAFullyOpaquePixelAtPosition) {
				const isInNail = checkIfPositionIsInNail(image, position);
				if (isInNail) {
					yield position;
					continue;
				} else {
					continue;
				}
			} else {
				continue;
			}
		}
		continue;
	}
	return;
}
