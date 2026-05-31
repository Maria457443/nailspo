import {scaleImage} from "./scaleImage.js";
export async function fetchImage(path) {
	const imageElement = new Image();
	imageElement.src = path;
	await new Promise(function (resolve, reject) {
		imageElement.onload = function () {
			resolve();
			return;
		};
		imageElement.onerror = function () {
			reject();
			return;
		};
		return;
	});
	const canvas = document.createElement("canvas");
	canvas.width = imageElement.width;
	canvas.height = imageElement.height;
	const contextOfCanvas = canvas.getContext("2d");
	contextOfCanvas.drawImage(imageElement, 0, 0);
	const image = contextOfCanvas.getImageData(0, 0, imageElement.width, imageElement.height);
	const scaledImage = scaleImage(image, 0.25);
	return scaledImage;
}
