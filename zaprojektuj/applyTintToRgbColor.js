import {OklchColor} from "./OklchColor.js";
export function applyTintToRgbColor(tint, color, strengthOfMask) {
	const convertedColor = color.convertToOklch();
	const convertedTint = tint.convertToOklch();
	const tintedColor = new OklchColor(
		(0.3 * convertedColor.lightnessComponent + 0.7 * convertedTint.lightnessComponent),
		(0.3 * convertedColor.chromaComponent + 0.7 * convertedTint.chromaComponent),
		convertedTint.hueComponent,
	);
	const convertedTintedColor = tintedColor.convertToRgb();
	const interpolatedTintedColor = color.interpolateTo(strengthOfMask, convertedTintedColor);
	return interpolatedTintedColor;
}
