export function createCanvasFromImageData(imageData) {
	const canvas = document.createElement(`canvas`);
	canvas.width = imageData.width;
	canvas.height = imageData.height;
	const context = canvas.getContext(`2d`);
	context.putImageData(imageData, 0, 0);
	return canvas;
}
