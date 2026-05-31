export function computeIndexOfPixelInImageDataAtPosition(imageData, position) {
	const pixelIndex = (((position.y * imageData.width) + position.x) * 4);
	return pixelIndex;
}
