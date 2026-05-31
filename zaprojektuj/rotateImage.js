import {createCanvasFromImageData} from "./createCanvasFromImageData.js";

export function rotateImage(imageData, angleRadians) {
	const sourceCanvas = createCanvasFromImageData(imageData);
	const canvas = document.createElement(`canvas`);
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	const context = canvas.getContext(`2d`);
	context.save();
	context.translate(canvas.width / 2, canvas.height / 2);
	context.rotate(angleRadians);
	context.drawImage(sourceCanvas, -imageData.width / 2, -imageData.height / 2);
	context.restore();
	const rotatedImage = context.getImageData(0, 0, canvas.width, canvas.height);
	return rotatedImage;
}
