import {scaleImage} from "./scaleImage.js";
export function scaleImageUntil(image, dimensions) {
	const scaleFactorOfWidth = dimensions.width / image.width;
	const scaleFactorOfHeight = dimensions.height / image.height;
	const scaleFactor = Math.min(scaleFactorOfWidth, scaleFactorOfHeight);
	const scaledImage = scaleImage(image, scaleFactor);
	return scaledImage;
}
