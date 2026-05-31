import {resizeImage} from "./resizeImage.js";
import {Dimensions} from "./Dimensions.js";
import {rotateImage} from "./rotateImage.js";
import {scaleImage} from "./scaleImage.js";
export class ImagePair {
	constructor(mask, raw) {
		this.mask = mask;
		this.raw = raw;
	}
	mask;
	raw;
	rotate(angleRadians) {
		const rotatedMaskOfThis = rotateImage(this.mask, angleRadians);
		const rotatedRawOfThis = rotateImage(this.raw, angleRadians);
		const rotatedThis = new ImagePair(rotatedMaskOfThis, rotatedRawOfThis);
		return rotatedThis;
	}
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
