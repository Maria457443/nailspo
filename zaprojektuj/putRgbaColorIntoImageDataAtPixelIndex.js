export function putRgbaColorIntoImageDataAtPixelIndex(color, imageData, index) {
	imageData.data[index + 0] = color.redComponent.value;
	imageData.data[index + 1] = color.greenComponent.value;
	imageData.data[index + 2] = color.blueComponent.value;
	imageData.data[index + 3] = color.alphaComponent.value;
	return;
}
