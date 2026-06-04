import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {OklchColor} from "./OklchColor.js";
import {RgbaColor} from "./RgbaColor.js";
export class RgbColor {
	constructor(redComponent, greenComponent, blueComponent) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
	}
	static createFromHashCssString(hashCssString) {
		const hashColorRegex = /#(?<redComponent>[0-9a-f]{2})(?<greenComponent>[0-9a-f]{2})(?<blueComponent>[0-9a-f]{2})/i;
		const match = hashCssString.match(hashColorRegex);
		const valueOfRedComponentOfColor = parseInt(match.groups.redComponent, 16);
		const valueOfGreenComponentOfColor = parseInt(match.groups.greenComponent, 16);
		const valueOfBlueComponentOfColor = parseInt(match.groups.blueComponent, 16);
		const redComponent = new ComponentOfRgbColor(valueOfRedComponentOfColor);
		const greenComponent = new ComponentOfRgbColor(valueOfGreenComponentOfColor);
		const blueComponent = new ComponentOfRgbColor(valueOfBlueComponentOfColor);
		const color = new RgbColor(redComponent, greenComponent, blueComponent);
		return color;
	}
	blueComponent;
	convertToRgbCssString() {
		const convertedRedComponent = this.redComponent.convertToRgbCssString();
		const convertedGreenComponent = this.greenComponent.convertToRgbCssString();
		const convertedBlueComponent = this.blueComponent.convertToRgbCssString();
		return `rgb(${convertedRedComponent} ${convertedGreenComponent} ${convertedBlueComponent})`;
	}
	hash() {
		const hashedRedComponent = this.redComponent.hash();
		const hashedGreenComponent = this.greenComponent.hash();
		const hashedBlueComponent = this.blueComponent.hash();
		return `${hashedRedComponent}${hashedGreenComponent}${hashedBlueComponent}`;
	}
	equals(otherColor) {
		const areRedComponentsEqual = this.redComponent.equals(otherColor.redComponent);
		const areGreenComponentsEqual = this.greenComponent.equals(otherColor.greenComponent);
		const areBlueComponentsEqual = this.blueComponent.equals(otherColor.blueComponent);
		return areRedComponentsEqual && areGreenComponentsEqual && areBlueComponentsEqual;
	}
	computeDistanceTo(otherColor) {
		const distanceBetweenRedComponents = this.redComponent.computeDistanceTo(otherColor.redComponent);
		const distanceBetweenGreenComponents = this.greenComponent.computeDistanceTo(otherColor.greenComponent);
		const distanceBetweenBlueComponents = this.blueComponent.computeDistanceTo(otherColor.blueComponent);
		const distance = Math.sqrt(
			(distanceBetweenRedComponents ** 2)
			+ (distanceBetweenGreenComponents ** 2)
			+ (distanceBetweenBlueComponents ** 2)
		);
		return distance;
	}
	greenComponent;
	interpolateTo(factor, otherColor) {
		const redComponentOfInterpolatedColor = this.redComponent.interpolateTo(factor, otherColor.redComponent);
		const greenComponentOfInterpolatedColor = this.greenComponent.interpolateTo(factor, otherColor.greenComponent);
		const blueComponentOfInterpolatedColor = this.blueComponent.interpolateTo(factor, otherColor.blueComponent);
		const interpolatedColor = new RgbColor(redComponentOfInterpolatedColor, greenComponentOfInterpolatedColor, blueComponentOfInterpolatedColor);
		return interpolatedColor;
	}
	redComponent;
	convertToOklch() {
		const normalizedValueOfRedComponentOfThis = this.redComponent.convertTo0To1Float();
		const normalizedValueOfGreenComponentOfThis = this.greenComponent.convertTo0To1Float();
		const normalizedValueOfBlueComponentOfThis = this.blueComponent.convertTo0To1Float();
		const r = normalizedValueOfRedComponentOfThis > 0.04045 ? Math.pow((normalizedValueOfRedComponentOfThis + 0.055) / 1.055, 2.4) : normalizedValueOfRedComponentOfThis / 12.92;
		const g = normalizedValueOfGreenComponentOfThis > 0.04045 ? Math.pow((normalizedValueOfGreenComponentOfThis + 0.055) / 1.055, 2.4) : normalizedValueOfGreenComponentOfThis / 12.92;
		const b = normalizedValueOfBlueComponentOfThis > 0.04045 ? Math.pow((normalizedValueOfBlueComponentOfThis + 0.055) / 1.055, 2.4) : normalizedValueOfBlueComponentOfThis / 12.92;
		const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
		const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
		const s = 0.0883024619 * r + 0.0817845529 * g + 0.8943868922 * b;
		const l_ = Math.cbrt(l);
		const m_ = Math.cbrt(m);
		const s_ = Math.cbrt(s);
		const l__ = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
		const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
		const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
		const c = Math.sqrt(a * a + b_ * b_);
		let h = Math.atan2(b_, a);
		if (h < 0) {
			h = h + 2 * Math.PI;
		}
		const convertedThis = new OklchColor(l__, c, h);
		return convertedThis;
	}
	withAlphaComponent(alphaComponent) {
		const colorWithAlpha = new RgbaColor(this.redComponent, this.greenComponent, this.blueComponent, alphaComponent);
		return colorWithAlpha;
	}
}