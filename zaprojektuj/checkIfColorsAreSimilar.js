export function checkIfColorsAreSimilar(color1, color2, toleranceOfLightness, toleranceOfChroma, toleranceOfHue) {
	const oklch1 = color1.convertToOklch();
	const oklch2 = color2.convertToOklch();
	const lightnessDifference = Math.abs(oklch1.lightnessComponent - oklch2.lightnessComponent);
	const chromaDifference = Math.abs(oklch1.chromaComponent - oklch2.chromaComponent);
	let hueDifference = Math.abs(oklch1.hueComponent - oklch2.hueComponent);
	if (hueDifference > Math.PI) {
		hueDifference = 2 * Math.PI - hueDifference;
	}
	const areSimilar = (
		lightnessDifference <= toleranceOfLightness
		&& chromaDifference <= toleranceOfChroma
		&& hueDifference <= toleranceOfHue
	);
	return areSimilar;
}
