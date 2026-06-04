import {putRgbaColorIntoImageDataAtPixelIndex} from "./putRgbaColorIntoImageDataAtPixelIndex.js";
import {readRgbaColorFromImageDataAtPixelIndex} from "./readRgbaColorFromImageDataAtPixelIndex.js";
export function mapImage(inputImage, mapper) {
	const outputImage = new ImageData(inputImage.width, inputImage.height);
	for (let indexOfPixel = 0; indexOfPixel < inputImage.data.length; indexOfPixel = indexOfPixel + 4) {
		const originalColorOfPixel = readRgbaColorFromImageDataAtPixelIndex(inputImage, indexOfPixel);
		const mappedRgbaColor = mapper(originalColorOfPixel, indexOfPixel);
		putRgbaColorIntoImageDataAtPixelIndex(mappedRgbaColor, outputImage, indexOfPixel,);
		continue;
	}
	return outputImage;
}
