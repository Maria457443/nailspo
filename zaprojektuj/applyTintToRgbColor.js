import {OklchColor} from "./OklchColor.js";
export function applyTintToRgbColor(tint, color, strengthOfMask) {
	const convertedColor = color.convertToOklch();
	const convertedTint = tint.convertToOklch();
	const tintedColor = new OklchColor(
		(convertedColor.lightnessComponent + convertedTint.lightnessComponent) / 2,
		convertedTint.chromaComponent,
		convertedTint.hueComponent,
	);
	const convertedTintedColor = tintedColor.convertToRgb();
	const interpolatedTintedColor = color.interpolateTo(strengthOfMask, convertedTintedColor);
	return interpolatedTintedColor;
}
