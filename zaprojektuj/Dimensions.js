export class Dimensions {
	constructor(width, height) {
		this.width = width;
		this.height = height;
	}
	height;
	width;
	multiplyByScalar(scalar) {
		const scaledThis = new Dimensions(Math.round(this.width * scalar), Math.round(this.height * scalar));
		return scaledThis;
	}
	oddify() {
		const oddifiedThis = new Dimensions(
			this.width + (this.width % 2 === 0 ? 1 : 0),
			this.height + (this.height % 2 === 0 ? 1 : 0),
		);
		return oddifiedThis;
	}
}
