import {checkIfIsBackgroundColor} from "./checkIfIsBackgroundColor.js";
export function checkIfColorIsBackgroundColor(backgroundColors, checkedColor, toleranceOfLightness, toleranceOfChroma, toleranceOfHue) {
	for (const backgroundColor of backgroundColors) {
		const isBackgroundColor = checkIfIsBackgroundColor(backgroundColor, checkedColor, toleranceOfLightness, toleranceOfChroma, toleranceOfHue);
		if (isBackgroundColor) {
			return true;
		} else {
			continue;
		}
	}
	return false;
}
