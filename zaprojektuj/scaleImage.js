import {createCanvasFromImageData} from "./createCanvasFromImageData.js";
export function scaleImage(imageData, scaleFactor) {
	const scaledWidth = Math.round(imageData.width * scaleFactor);
	const scaledHeight = Math.round(imageData.height * scaleFactor);
	const inputCanvas = document.createElement(`canvas`);
	inputCanvas.width = imageData.width;
	inputCanvas.height = imageData.height;
	const inputContext = inputCanvas.getContext(`2d`);
	inputContext.putImageData(imageData, 0, 0);
	const outputCanvas = document.createElement(`canvas`);
	outputCanvas.width = scaledWidth;
	outputCanvas.height = scaledHeight;
	const outputContext = outputCanvas.getContext(`2d`);
	outputContext.imageSmoothingEnabled = true;
	outputContext.imageSmoothingQuality = `high`;
	outputContext.drawImage(inputCanvas, 0, 0, scaledWidth, scaledHeight);
	return outputContext.getImageData(0, 0, scaledWidth, scaledHeight);
}
