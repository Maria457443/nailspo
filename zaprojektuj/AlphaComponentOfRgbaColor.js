import {ComponentOfBuilder0To1OfRgbaColor} from "./ComponentOfBuilder0To1OfRgbaColor.js";
export class AlphaComponentOfRgbaColor {
	constructor(value) {
		this.value = value;
	}
	static createFrom0To255Float(value) {
		const valueOfComponent = Math.max(0, Math.min(Math.round(value), 255));
		const component = new AlphaComponentOfRgbaColor(valueOfComponent);
		return component;
	}
	static createFrom0To1Float(value) {
		const valueOfComponent = Math.max(0, Math.min(Math.round(value * 255), 255));
		const component = new AlphaComponentOfRgbaColor(valueOfComponent);
		return component;
	}
	convertTo0To1Float() {
		const normalizedValueOfThis = this.value / 255;
		return normalizedValueOfThis;
	}
	computeDistanceTo(otherComponent) {
		const distance = Math.abs(this.value - otherComponent.value);
		return distance;
	}
	convertToRgbCssString() {
		const convertedValue = (this.value / 255).toString(10);
		return convertedValue;
	}
	equals(otherComponent) {
		return this.value === otherComponent.value;
	}
	hash() {
		const hashedValue = this.value.toString(16).padStart(2, `0`);
		return hashedValue;
	}
	interpolateTo(factor, otherComponent) {
		const valueOfInterpolatedComponent = Math.round(this.value + factor * (otherComponent.value - this.value));
		const interpolatedComponent = new AlphaComponentOfRgbaColor(valueOfInterpolatedComponent);
		return interpolatedComponent;
	}
	convertToBuilder0To1() {
		const normalizedValueOfThis = this.value / 255;
		const convertedThis = new ComponentOfBuilder0To1OfRgbaColor(normalizedValueOfThis);
		return convertedThis;
	}
	value;
}
