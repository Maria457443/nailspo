import {ComponentOfBuilder0To1OfRgbaColor} from "./ComponentOfBuilder0To1OfRgbaColor.js";
export class ComponentOfRgbColor {
	constructor(value) {
		this.value = value;
	}
	static createFrom0To255Float(value) {
		const valueOfComponent = Math.max(0, Math.min(Math.round(value), 255));
		const component = new ComponentOfRgbColor(valueOfComponent);
		return component;
	}
	static createFrom0To1Float(value) {
		const valueOfComponent = Math.max(0, Math.min(Math.round(value * 255), 255));
		const component = new ComponentOfRgbColor(valueOfComponent);
		return component;
	}
	convertTo0To1Float() {
		const normalizedValueOfThis = this.value / 255;
		return normalizedValueOfThis;
	}
	convertToBuilder0To1() {
		const normalizedValueOfThis = this.value / 255;
		const convertedThis = new ComponentOfBuilder0To1OfRgbaColor(normalizedValueOfThis);
		return convertedThis;
	}
	computeDistanceTo(otherComponent) {
		const distance = Math.abs(this.value - otherComponent.value);
		return distance;
	}
	convertToRgbCssString() {
		const convertedValue = this.value.toString(10);
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
		const interpolatedComponent = new ComponentOfRgbColor(valueOfInterpolatedComponent);
		return interpolatedComponent;
	}
	value;
}
