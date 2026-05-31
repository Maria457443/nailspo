import {Dimensions} from "./Dimensions.js";
import {Example} from "./Example.js";
import {ImagePair} from "./ImagePair.js";
import {fetchImage} from "./fetchImage.js";
export async function fetchExample(path) {
	const [maskImage, rawImage] = await Promise.all([
		fetchImage(`${path}/mask.png`),
		fetchImage(`${path}/raw.png`)
	]);
	const dimensions = new Dimensions(maskImage.width, maskImage.height);
	const images = new ImagePair(maskImage, rawImage);
	const example = new Example(dimensions, images);
	return example;
}
