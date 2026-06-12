export class BoundingBox {
	constructor(positionOfCenter, dimensions) {
		this.positionOfCenter = positionOfCenter;
		this.dimensions = dimensions;
	}
	positionOfCenter;
	dimensions;
	multiplyByScalar(factor) {
		const scaledDimensionsOfThis = this.dimensions.multiplyByScalar(factor);
		const scaledThis = new BoundingBox(this.positionOfCenter, scaledDimensionsOfThis);
		return scaledThis;
	}
}
