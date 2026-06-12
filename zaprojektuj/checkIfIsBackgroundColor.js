import {checkIfColorsAreSimilar} from "./checkIfColorsAreSimilar.js";
export function checkIfIsBackgroundColor(backgroundColor, color, toleranceOfLightness, toleranceOfChroma, toleranceOfHue) {
	const isBackgroundColor = checkIfColorsAreSimilar(backgroundColor, color, toleranceOfLightness, toleranceOfChroma, toleranceOfHue);
	return isBackgroundColor;
}
