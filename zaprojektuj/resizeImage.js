import {createCanvasFromImageData} from "./createCanvasFromImageData.js";
export function resizeImage(imageData, newDimensions) {
	const canvas = document.createElement(`canvas`);
	canvas.width = newDimensions.width;
	canvas.height = newDimensions.height;
	const context = canvas.getContext(`2d`);
	context.imageSmoothingEnabled = true;
	context.imageSmoothingQuality = `high`;
	context.putImageData(imageData, 0, 0);
	const resizedImage = context.getImageData(0, 0, newDimensions.width, newDimensions.height);
	return resizedImage;
}
