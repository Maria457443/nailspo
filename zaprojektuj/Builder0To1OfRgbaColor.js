import {ComponentOfBuilder0To1OfRgbaColor} from "./ComponentOfBuilder0To1OfRgbaColor.js";
import {RgbaColor} from "./RgbaColor.js";
export class Builder0To1OfRgbaColor {
	constructor(redComponent, greenComponent, blueComponent, alphaComponent) {
		this.redComponent = redComponent;
		this.greenComponent = greenComponent;
		this.blueComponent = blueComponent;
		this.alphaComponent = alphaComponent;
	}
	static createEmpty() {
		const emptyComponent = new ComponentOfBuilder0To1OfRgbaColor(0);
		const emptyAlphaComponent = new ComponentOfBuilder0To1OfRgbaColor(0);
		const emptyBuilder = new Builder0To1OfRgbaColor(
			emptyComponent,
			emptyComponent,
			emptyComponent,
			emptyAlphaComponent,
		);
		return emptyBuilder;
	}
	build() {
		const color = new RgbaColor(
			this.redComponent.build(),
			this.greenComponent.build(),
			this.blueComponent.build(),
			this.alphaComponent.buildAlpha()
		);
		return color;
	}
	redComponent;
	greenComponent;
	blueComponent;
	alphaComponent;
	add(color) {
		const updatedRedComponentOfThis = this.redComponent.add(color.redComponent);
		const updatedGreenComponentOfThis = this.greenComponent.add(color.greenComponent);
		const updatedBlueComponentOfThis = this.blueComponent.add(color.blueComponent);
		const updatedAlphaComponentOfThis = this.alphaComponent.add(color.alphaComponent);
		const updatedThis = new Builder0To1OfRgbaColor(
			updatedRedComponentOfThis,
			updatedGreenComponentOfThis,
			updatedBlueComponentOfThis,
			updatedAlphaComponentOfThis
		);
		return updatedThis;
	}
	subtract(color) {
		const updatedRedComponentOfThis = this.redComponent.subtract(color.redComponent);
		const updatedGreenComponentOfThis = this.greenComponent.subtract(color.greenComponent);
		const updatedBlueComponentOfThis = this.blueComponent.subtract(color.blueComponent);
		const updatedAlphaComponentOfThis = this.alphaComponent.subtract(color.alphaComponent);
		const updatedThis = new Builder0To1OfRgbaColor(
			updatedRedComponentOfThis,
			updatedGreenComponentOfThis,
			updatedBlueComponentOfThis,
			updatedAlphaComponentOfThis
		);
		return updatedThis;
	}
	multiplyComponentWise(color) {
		const updatedRedComponentOfThis = this.redComponent.multiply(color.redComponent);
		const updatedGreenComponentOfThis = this.greenComponent.multiply(color.greenComponent);
		const updatedBlueComponentOfThis = this.blueComponent.multiply(color.blueComponent);
		const updatedAlphaComponentOfThis = this.alphaComponent.multiply(color.alphaComponent);
		const updatedThis = new Builder0To1OfRgbaColor(
			updatedRedComponentOfThis,
			updatedGreenComponentOfThis,
			updatedBlueComponentOfThis,
			updatedAlphaComponentOfThis
		);
		return updatedThis;
	}
	divideByScalar(scalar) {
		const updatedRedComponentOfThis = this.redComponent.divideByScalar(scalar);
		const updatedGreenComponentOfThis = this.greenComponent.divideByScalar(scalar);
		const updatedBlueComponentOfThis = this.blueComponent.divideByScalar(scalar);
		const updatedAlphaComponentOfThis = this.alphaComponent.divideByScalar(scalar);
		const updatedThis = new Builder0To1OfRgbaColor(
			updatedRedComponentOfThis,
			updatedGreenComponentOfThis,
			updatedBlueComponentOfThis,
			updatedAlphaComponentOfThis
		);
		return updatedThis;
	}
}
