export function copyImage(image) {
	const copiedImage = new ImageData(
		new Uint8ClampedArray(image.data),
		image.width,
		image.height,
	);
	return copiedImage;
}
