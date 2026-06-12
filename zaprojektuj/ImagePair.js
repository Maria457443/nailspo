import {resizeImage} from "./resizeImage.js";
import {Dimensions} from "./Dimensions.js";
import {scaleImage} from "./scaleImage.js";
import {extractDimensionsFromImage} from "./extractDimensionsFromImage.js";
export class ImagePair {
	constructor(mask, raw) {
		this.mask = mask;
		this.raw = raw;
		const dimensionsOfMask = extractDimensionsFromImage(mask);
		const dimensionsOfRaw = extractDimensionsFromImage(raw);
		const areDimensionsOfMaskAndRawEqual = dimensionsOfMask.equals(dimensionsOfRaw);
		if (areDimensionsOfMaskAndRawEqual) {
			this.dimensions = dimensionsOfMask;
		} else {
			const error = new Error("Dimensions of mask and raw are not equal");
			throw error;
		}
	}
	mask;
	raw;
	resize(dimensions) {
		const resizedMaskOfThis = resizeImage(this.mask, dimensions.width, dimensions.height);
		const resizedRawOfThis = resizeImage(this.raw, dimensions.width, dimensions.height);
		const resizedThis = new ImagePair(resizedMaskOfThis, resizedRawOfThis);
		return resizedThis;
	}
	scale(scaleFactor) {
		const scaledMaskOfThis = scaleImage(this.mask, scaleFactor);
		const scaledRawOfThis = scaleImage(this.raw, scaleFactor);
		const scaledThis = new ImagePair(scaledMaskOfThis, scaledRawOfThis);
		return scaledThis;
	}
}
