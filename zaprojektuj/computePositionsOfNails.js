import {Coordinates} from "./Coordinates.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
export function computePositionsOfNails(image, mergeRadius = 5) {
	const positionsOfNails = [];
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			const color = readRgbaColorFromImageDataAtPosition(image, position);
			if (color.alphaComponent.convertTo0To255Integer() == 255) {
				const isInNail = checkIfPositionIsInNail(image, position);
				if (isInNail) {
					positionsOfNails.push(position);
					continue;
				} else {
					continue;
				}
			} else {
				continue;
			}
		}
		continue;
	}
	// merge nearby pixel positions into clusters and return their average positions
	const merged = mergeNearbyPositions(positionsOfNails, mergeRadius);
	console.log(merged);
	return merged;
}
const numberOfRays = 19;
class Ray {
	constructor(position, angle) {
		this.position = position;
		this.angle = angle;
	}
	position;
	angle;
	moveForward(distance) {
		const xOfNewPosition = this.position.x + distance * Math.cos(this.angle);
		const yOfNewPosition = this.position.y + distance * Math.sin(this.angle);
		const newPosition = new Coordinates(xOfNewPosition, yOfNewPosition);
		this.position = newPosition;
		return;
	}
	checkIfIsInImage(image) {
		const roundedPosition = this.position.round();
		const isInImage = (
			(roundedPosition.x >= 0)
			&& (roundedPosition.x < image.width)
			&& (roundedPosition.y >= 0)
			&& (roundedPosition.y < image.height)
		);
		return isInImage;
	}
	isAtColorWithMaximalAlpha(image) {
		const roundedPosition = this.position.round();
		const color = readRgbaColorFromImageDataAtPosition(image, roundedPosition);
		const isAtColorWithMaximalAlpha = color.alphaComponent.convertTo0To255Integer() == 255;
		return isAtColorWithMaximalAlpha;
	}
}
function removeElementFromArray(array, element) {
	const indexOfElement = array.indexOf(element);
	array.splice(indexOfElement, 1);
	return;
}
function checkIfPositionIsInNail(image, position) {
	const positionsOfRays = [];
	for (let indexOfRay = 0; indexOfRay < numberOfRays; indexOfRay = indexOfRay + 1) {
		const angle = (indexOfRay / numberOfRays) * 2 * Math.PI;
		const ray = new Ray(position, angle);
		positionsOfRays.push(ray);
		continue;
	}
	let distanceOfFirstHit = null;
	let totalDistanceTraveled = 0;
	const distanceToTravel = 3;
	let countOfRaysThatEscapedHand = 0;
	let countOfRaysThatEscapedImage = 0;
	for (;positionsOfRays.length > 0;) {
		if (distanceOfFirstHit === null || totalDistanceTraveled < distanceOfFirstHit * 1.7) {
			for (const ray of positionsOfRays) {
				const isInImage = ray.checkIfIsInImage(image);
				if (isInImage) {
					const isAtColorWithMaximalAlpha = ray.isAtColorWithMaximalAlpha(image);
					if (isAtColorWithMaximalAlpha) {
						ray.moveForward(distanceToTravel);
						continue;
					} else {
						countOfRaysThatEscapedHand = countOfRaysThatEscapedHand + 1;
						if (distanceOfFirstHit == null) {
							distanceOfFirstHit = totalDistanceTraveled;
						}
						removeElementFromArray(positionsOfRays, ray);
						continue;
					}
					continue;
				} else {
					removeElementFromArray(positionsOfRays, ray);
					countOfRaysThatEscapedImage = countOfRaysThatEscapedImage + 1;
					continue;
				}
			}
			totalDistanceTraveled = totalDistanceTraveled + distanceToTravel;
			continue;
		} else {
			break;
		}
	}
	if (distanceOfFirstHit === null || countOfRaysThatEscapedImage > 0) {
		return false;
	} else {
		const ratioOfRaysThatEscapedHand = countOfRaysThatEscapedHand / numberOfRays;
		if (ratioOfRaysThatEscapedHand > 0.71) {
			return true;
		} else {
			return false;
		}
	}
}
function mergeNearbyPositions(positions, radius) {
	if (!positions || positions.length === 0) return [];
	const visited = new Array(positions.length).fill(false);
	const clusters = [];
	for (let i = 0; i < positions.length; i = i + 1) {
		if (visited[i]) continue;
		// start new cluster
		const clusterIndices = [i];
		visited[i] = true;
		for (let k = 0; k < clusterIndices.length; k = k + 1) {
			const idx = clusterIndices[k];
			const base = positions[idx];
			for (let j = i + 1; j < positions.length; j = j + 1) {
				if (visited[j]) continue;
				const other = positions[j];
				const distance = base.computeDistanceTo(other);
				if (distance <= radius) {
					visited[j] = true;
					clusterIndices.push(j);
				}
			}
		}
		// compute average of cluster
		let sumX = 0;
		let sumY = 0;
		for (const idx of clusterIndices) {
			sumX = sumX + positions[idx].x;
			sumY = sumY + positions[idx].y;
		}
		const avgX = sumX / clusterIndices.length;
		const avgY = sumY / clusterIndices.length;
		clusters.push(new Coordinates(avgX, avgY));
	}
	return clusters;
}
