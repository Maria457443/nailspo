import {readRgbaColorFromImageDataAtPixelIndex} from "./readRgbaColorFromImageDataAtPixelIndex.js";
export function computeStrengthOfMaskAtPixelIndex(mask, index) {
	const color = readRgbaColorFromImageDataAtPixelIndex(mask, index);
	const averageValueOfComponentsOfColor = ((color.redComponent.value + color.greenComponent.value + color.blueComponent.value) / 3);
	const strength = (averageValueOfComponentsOfColor / 255);
	return strength;
}
