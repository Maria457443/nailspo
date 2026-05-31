export class Coordinates {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(otherCoordinates) {
		const xOfNewCoordinates = this.x + otherCoordinates.x;
		const yOfNewCoordinates = this.y + otherCoordinates.y;
		const newCoordinates = new Coordinates(xOfNewCoordinates, yOfNewCoordinates);
		return newCoordinates;
	}
	subtract(otherCoordinates) {
		const xOfNewCoordinates = this.x - otherCoordinates.x;
		const yOfNewCoordinates = this.y - otherCoordinates.y;
		const newCoordinates = new Coordinates(xOfNewCoordinates, yOfNewCoordinates);
		return newCoordinates;
	}
	computeDistanceTo(otherCoordinates) {
		const distanceBetweenXs = Math.abs(this.x - otherCoordinates.x);
		const distanceBetweenYs = Math.abs(this.y - otherCoordinates.y);
		const distance = Math.sqrt(distanceBetweenXs ** 2 + distanceBetweenYs ** 2);
		return distance;
	}
	addDimensions(dimensions) {
		const xOfNewCoordinates = this.x + dimensions.width;
		const yOfNewCoordinates = this.y + dimensions.height;
		const newCoordinates = new Coordinates(xOfNewCoordinates, yOfNewCoordinates);
		return newCoordinates;
	}
	subtractDimensions(dimensions) {
		const xOfNewCoordinates = this.x - dimensions.width;
		const yOfNewCoordinates = this.y - dimensions.height;
		const newCoordinates = new Coordinates(xOfNewCoordinates, yOfNewCoordinates);
		return newCoordinates;
	}
	x;
	y;
	checkIfIsInDimensions(dimensions) {
		const isXOfThisInDimensions = (this.x >= 0) && (this.x < dimensions.width);
		const isYOfThisInDimensions = (this.y >= 0) && (this.y < dimensions.height);
		const isThisInDimensions = isXOfThisInDimensions && isYOfThisInDimensions;
		return isThisInDimensions;
	}
}