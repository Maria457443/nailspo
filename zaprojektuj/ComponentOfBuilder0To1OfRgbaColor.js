import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
import {AlphaComponentOfRgbaColor} from "./AlphaComponentOfRgbaColor.js";
export class ComponentOfBuilder0To1OfRgbaColor {
	constructor(value) {
		this.value = value;
	}
	add(otherComponent) {
		const addedValue = this.value + otherComponent.value;
		const addedThis = new ComponentOfBuilder0To1OfRgbaColor(addedValue);
		return addedThis;
	}
	subtract(otherComponent) {
		const subtractedValue = this.value - otherComponent.value;
		const subtractedThis = new ComponentOfBuilder0To1OfRgbaColor(subtractedValue);
		return subtractedThis;
	}
	multiply(otherComponent) {
		const multipliedValue = this.value * otherComponent.value;
		const multipliedThis = new ComponentOfBuilder0To1OfRgbaColor(multipliedValue);
		return multipliedThis;
	}
	value;
	build() {
		const builtThis = ComponentOfRgbColor.createFrom0To1Float(this.value);
		return builtThis;
	}
	buildAlpha() {
		const builtThis = AlphaComponentOfRgbaColor.createFrom0To1Float(this.value);
		return builtThis;
	}
	divideByScalar(scalar) {
		const dividedValueOfThis = this.value / scalar;
		const dividedThis = new ComponentOfBuilder0To1OfRgbaColor(dividedValueOfThis);
		return dividedThis;
	}
}
