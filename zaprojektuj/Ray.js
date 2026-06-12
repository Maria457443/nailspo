import {Coordinates} from "./Coordinates.js";
import {checkIfThereIsAFullyOpaquePixelAtPosition} from "./checkIfThereIsAFullyOpaquePixelAtPosition.js";
export class Ray {
	constructor(angle, index, position) {
		this.angle = angle;
		this.index = index;
		this.position = position;
	}
	angle;
	index;
	position;
	moveForward(distance) {
		const xOfNewPosition = this.position.x + distance * Math.cos(this.angle);
		const yOfNewPosition = this.position.y + distance * Math.sin(this.angle);
		const newPosition = new Coordinates(xOfNewPosition, yOfNewPosition);
		this.position = newPosition;
		return;
	}
	checkIfIsInDimensions(dimensions) {
		const roundedPosition = this.position.round();
		const isInImage = (
			(roundedPosition.x >= 0)
			&& (roundedPosition.x < dimensions.width)
			&& (roundedPosition.y >= 0)
			&& (roundedPosition.y < dimensions.height)
		);
		return isInImage;
	}
	checkIfIsAtColorWithMaximalAlpha(image) {
		const roundedPosition = this.position.round();
		const isAtColorWithMaximalAlpha = checkIfThereIsAFullyOpaquePixelAtPosition(image, roundedPosition);
		return isAtColorWithMaximalAlpha;
	}
}
