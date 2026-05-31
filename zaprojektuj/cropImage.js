export function cropImage(image, boundingBox) {
	const croppedImage = new ImageData(boundingBox.dimensions.width, boundingBox.dimensions.height);
	const originX = boundingBox.positionOfCenter.x - Math.floor((boundingBox.dimensions.width - 1) / 2);
	const originY = boundingBox.positionOfCenter.y - Math.floor((boundingBox.dimensions.height - 1) / 2);
	for (let y = 0; y < boundingBox.dimensions.height; y = y + 1) {
		for (let x = 0; x < boundingBox.dimensions.width; x = x + 1) {
			const sourceX = originX + x;
			const sourceY = originY + y;
			if (sourceX < 0 || sourceY < 0 || sourceX >= image.width || sourceY >= image.height) {
				continue;
			} else {
				const sourceIndex = ((sourceY * image.width) + sourceX) * 4;
				const targetIndex = ((y * boundingBox.dimensions.width) + x) * 4;
				croppedImage.data[targetIndex + 0] = image.data[sourceIndex + 0];
				croppedImage.data[targetIndex + 1] = image.data[sourceIndex + 1];
				croppedImage.data[targetIndex + 2] = image.data[sourceIndex + 2];
				croppedImage.data[targetIndex + 3] = image.data[sourceIndex + 3];
				continue;
			}
		}
		continue;
	}
	return croppedImage;
}
