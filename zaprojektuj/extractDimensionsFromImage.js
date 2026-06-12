import {Dimensions} from "./Dimensions.js";
export function extractDimensionsFromImage(image) {
	const dimensions = new Dimensions(image.width, image.height);
	return dimensions;
}
