import {Coordinates} from "./Coordinates.js";
import {putRgbaColorIntoImageDataAtPosition} from "./putRgbaColorIntoImageDataAtPosition.js";
import {fillMaskInterior} from "./fillMaskInterior.js";
import {RgbaColor} from "./RgbaColor.js";
import {computePositionsOfNails} from "./computePositionsOfNails.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
const blackColor = RgbaColor.createFrom0To255Integer(0, 0, 0, 255);
export function computeNailMask(image) {
	const mask = new ImageData(image.width, image.height);
	const positionsOfNails = computePositionsOfNails(image);
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			putRgbaColorIntoImageDataAtPosition(blackColor, mask, position);
			continue;
		}
		continue;
	}
	console.log("Positions of nails:");
	console.log(positionsOfNails);
	// For each detected nail position, sample the color at the (rounded) position
	// and flood-fill the mask around that pixel for pixels with similar lightness,
	// hue, and chroma in Oklch, with lightness as the main gate.
	const lightnessTolerance = 0.3; // configurable absolute lightness tolerance (Oklch units)
	const hueToleranceDegrees = 20; // configurable tolerance in degrees
	const chromaTolerance = 0.1; // configurable absolute chroma tolerance (Oklch units)
	for (const position of positionsOfNails) {
		const rounded = position.round();
		fillRegionByLightnessHueAndChroma(image, mask, rounded, lightnessTolerance, hueToleranceDegrees, chromaTolerance);
		continue;
	}
	return mask;
}

function fillRegionByLightnessHueAndChroma(image, mask, startPosition, lightnessTolerance, hueToleranceDegrees, chromaTolerance, maxPixels) {
	const width = image.width;
	const height = image.height;
	if (!startPosition.checkIfIsInDimensions({width, height})) return;
	const startColor = readRgbaColorFromImageDataAtPosition(image, startPosition);
	const startOkl = startColor.convertToOklch();
	const targetLightness = startOkl.lightnessComponent;
	const targetHue = startOkl.hueComponent; // radians (0..2PI)
	const targetChroma = startOkl.chromaComponent;
	const tol = (hueToleranceDegrees * Math.PI) / 180;

	const visited = new Uint8Array(width * height);
	const stack = [startPosition];
	let filled = 0;

	while (stack.length > 0) {
		const pos = stack.pop();
		const x = pos.x;
		const y = pos.y;
		const idx = y * width + x;
		if (visited[idx]) continue;
		visited[idx] = 1;

		const color = readRgbaColorFromImageDataAtPosition(image, pos);
		const okl = color.convertToOklch();
		const dl = Math.abs(okl.lightnessComponent - targetLightness);
		let dh = Math.abs(okl.hueComponent - targetHue);
		if (dh > Math.PI) dh = 2 * Math.PI - dh;
		const dc = Math.abs(okl.chromaComponent - targetChroma);
		if (dl <= lightnessTolerance && dh <= tol && dc <= chromaTolerance) {
			// mark white in mask at this position
			putRgbaColorIntoImageDataAtPosition(
				RgbaColor.createFrom0To255Integer(255, 255, 255, 255),
				mask,
				pos,
			);
			filled = filled + 1;
			// push neighbors (4-connected)
			if (x > 0) stack.push(new Coordinates(x - 1, y));
			if (x + 1 < width) stack.push(new Coordinates(x + 1, y));
			if (y > 0) stack.push(new Coordinates(x, y - 1));
			if (y + 1 < height) stack.push(new Coordinates(x, y + 1));
		}
	}
	return;
}
