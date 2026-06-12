import {Coordinates} from "./Coordinates.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {computePositionsOfNails} from "./computePositionsOfNails.js";
import {blackRgbaColor} from "./blackRgbaColor.js";
import {whiteRgbaColor} from "./whiteRgbaColor.js";
import {HashingSet} from "./HashingSet.js";
import {fillRegionInMask} from "./fillRegionInMask.js";
import {ImagePair} from "./ImagePair.js";
export function computeNailMask(image) {
	const mask = new ImageData(image.width, image.height);
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			putRgbaColorIntoImageDataAtPosition(blackRgbaColor, mask, position);
			continue;
		}
		continue;
	}
	const positionsOfNails = computePositionsOfNails(image);
	const imagePair = new ImagePair(mask, image);
	for (const position of positionsOfNails) {
		putRgbaColorIntoImageDataAtPosition(whiteRgbaColor, imagePair.mask, position);
		fillRegionInMask(imagePair, position, 5);
		continue;
	}
	return mask;
}
