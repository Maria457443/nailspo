import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
import {ComponentOfBuilder0To1OfRgbaColor} from "./ComponentOfBuilder0To1OfRgbaColor.js";
import {Builder0To1OfRgbaColor} from "./Builder0To1OfRgbaColor.js";
export function correlateImageWithKernelAtPosition(imageData, kernelData, position) {
	if ((kernelData.width % 2) === 0 || (kernelData.height % 2) === 0) {
		const error = new Error("kernel dimensions must be odd");
		throw error;
	} else {
		const widthOfHalfSpanOfKernel = Math.floor((kernelData.width - 1) / 2);
		const heightOfHalfSpanOfKernel = Math.floor((kernelData.height - 1) / 2);
		const halfSpanOfKernelWidth = new Dimensions(
			widthOfHalfSpanOfKernel,
			heightOfHalfSpanOfKernel,
		);
		const dimensionsOfImage = new Dimensions(imageData.width, imageData.height);
		const positionWithOffsetOfHalfSpanOfKernel = position.subtractDimensions(halfSpanOfKernelWidth);
		let count = 0;
		let sumOfImage = 0;
		let sumOfKernel = 0;
		for (let yOfInKernelPositionY = 0; yOfInKernelPositionY < kernelData.height; yOfInKernelPositionY = yOfInKernelPositionY + 1) {
			for (let xOfInKernelPositionX = 0; xOfInKernelPositionX < kernelData.width; xOfInKernelPositionX = xOfInKernelPositionX + 1) {
				const inKernelPosition = new Coordinates(xOfInKernelPositionX, yOfInKernelPositionY);
				const inImagePosition = positionWithOffsetOfHalfSpanOfKernel.add(inKernelPosition);
				const isInDimensionsOfImage = inImagePosition.checkIfIsInDimensions(dimensionsOfImage);
				if (isInDimensionsOfImage) {
					const colorOfPixelInImage = readRgbaColorFromImageDataAtPosition(imageData, inImagePosition).convertToBuilder0To1();
					const colorOfPixelInKernel = readRgbaColorFromImageDataAtPosition(kernelData, inKernelPosition).convertToBuilder0To1();
					const imageLuma = (colorOfPixelInImage.redComponent.value + colorOfPixelInImage.greenComponent.value + colorOfPixelInImage.blueComponent.value) / 3;
					const kernelLuma = (colorOfPixelInKernel.redComponent.value + colorOfPixelInKernel.greenComponent.value + colorOfPixelInKernel.blueComponent.value) / 3;
					sumOfImage = sumOfImage + imageLuma;
					sumOfKernel = sumOfKernel + kernelLuma;
					count = count + 1;
					continue;
				} else {
					continue;
				}
			}
			continue;
		}
		if (count === 0) {
			return Builder0To1OfRgbaColor.createEmpty();
		}
		const meanOfImage = sumOfImage / count;
		const meanOfKernel = sumOfKernel / count;
		let numerator = 0;
		let denominatorOfImage = 0;
		let denominatorOfKernel = 0;
		for (let yOfInKernelPositionY = 0; yOfInKernelPositionY < kernelData.height; yOfInKernelPositionY = yOfInKernelPositionY + 1) {
			for (let xOfInKernelPositionX = 0; xOfInKernelPositionX < kernelData.width; xOfInKernelPositionX = xOfInKernelPositionX + 1) {
				const inKernelPosition = new Coordinates(xOfInKernelPositionX, yOfInKernelPositionY);
				const inImagePosition = positionWithOffsetOfHalfSpanOfKernel.add(inKernelPosition);
				const isInDimensionsOfImage = inImagePosition.checkIfIsInDimensions(dimensionsOfImage);
				if (isInDimensionsOfImage) {
					const colorOfPixelInImage = readRgbaColorFromImageDataAtPosition(imageData, inImagePosition).convertToBuilder0To1();
					const colorOfPixelInKernel = readRgbaColorFromImageDataAtPosition(kernelData, inKernelPosition).convertToBuilder0To1();
					const imageLuma = (colorOfPixelInImage.redComponent.value + colorOfPixelInImage.greenComponent.value + colorOfPixelInImage.blueComponent.value) / 3;
					const kernelLuma = (colorOfPixelInKernel.redComponent.value + colorOfPixelInKernel.greenComponent.value + colorOfPixelInKernel.blueComponent.value) / 3;
					const centeredImage = imageLuma - meanOfImage;
					const centeredKernel = kernelLuma - meanOfKernel;
					numerator = numerator + (centeredImage * centeredKernel);
					denominatorOfImage = denominatorOfImage + (centeredImage * centeredImage);
					denominatorOfKernel = denominatorOfKernel + (centeredKernel * centeredKernel);
					continue;
				} else {
					continue;
				}
			}
			continue;
		}
		const denominator = Math.sqrt(denominatorOfImage * denominatorOfKernel);
		const zncc = denominator === 0 ? 0 : (numerator / denominator);
		const scoreIn0To1 = Math.max(0, Math.min((zncc + 1) / 2, 1));
		const scoreAsComponent = new ComponentOfBuilder0To1OfRgbaColor(scoreIn0To1);
		return new Builder0To1OfRgbaColor(
			scoreAsComponent,
			scoreAsComponent,
			scoreAsComponent,
			scoreAsComponent,
		);
	}
}
