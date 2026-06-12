import {Coordinates} from "./Coordinates.js";
import {readRgbaColorFromImageDataAtPosition} from "./readRgbaColorFromImageDataAtPosition.js";
function getLightnessAtPosition(image, position) {
	const color = readRgbaColorFromImageDataAtPosition(image, position);
	const oklch = color.convertToOklch();
	return oklch.lightnessComponent;
}
import {HashingSet} from "./HashingSet.js";
export function* computePositionsOfNails(image) {
	const positionsOfNails = [];
	for (let y = 0; y < image.height; y = y + 1) {
		for (let x = 0; x < image.width; x = x + 1) {
			const position = new Coordinates(x, y);
			const color = readRgbaColorFromImageDataAtPosition(image, position);
			if (color.alphaComponent.convertTo0To255Integer() == 255) {
				const isInNail = checkIfPositionIsInNail(image, position);
				if (isInNail) {
					yield position;
					// positionsOfNails.push(position);
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
	// const clusters = clusterize(positionsOfNails);
	// for (const cluster of clusters) {
	// 	// const positionOfNail = selectPositionWithHighestLightness(image, cluster);
	// 	// yield positionOfNail;
	// 	for (const positionOfNail of cluster) {
	// 		yield positionOfNail;
	// 		continue;
	// 	}
	// 	continue;
	// }
	return;
}
class Ray {
	constructor(position, angle, id) {
		this.position = position;
		this.angle = angle;
		this.id = id;
	}
	position;
	angle;
	id;
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
const countOfRays = 22;
function countHolesInScalesOfRays(scalesOfRays) {
	let countOfHoles = 0;
	// consider also wrapping from .length-1 to 0
	let isInHole = scalesOfRays[0] === null;
	if (isInHole) {
		countOfHoles = 1;
	}
	for (let index = 1; index < scalesOfRays.length; index = index + 1) {
		const scale = scalesOfRays[index];
		if (isInHole) {
			if (scale === null) {
				continue;
			} else {
				isInHole = false;
				continue;
			}
		} else {
			if (scale === null) {
				countOfHoles = countOfHoles + 1;
				isInHole = true;
				continue;
			} else {
				continue;
			}
		}
	}
	if (isInHole && scalesOfRays[0] === null) {
		countOfHoles = countOfHoles - 1;
	}
	return countOfHoles;
}
function checkIfPositionIsInNail(image, position) {
	const statistics = computeStatisticsOfPosition(image, position);
	// statistics.circular >= 9 && statistics.circular <= 15 && statistics.close >= 2 && statistics.far >= 2
// circular: 9, close: 4, far: 9
	// if (statistics.distanceOfFirstHit >= 6 && statistics.circular >= 6 && statistics.close >= 8 && statistics.far >= 6) {
	// 	return true;
	// } else {
	// 	return false;
	// }
	const countOfHoles = countHolesInScalesOfRays(statistics.scalesOfRays);
	if (countOfHoles > 1) {
		return false;
	} else {
		if (statistics.circular >= 8 && statistics.close >= 6 && statistics.far >= 5) {
			return true;
		} else {
			return false;
		}
		
	}
}
export function computeStatisticsOfPosition(image, position) {
	let positionsOfRays = [];
	const scalesOfRays = [];
	for (let indexOfRay = 0; indexOfRay < countOfRays; indexOfRay = indexOfRay + 1) {
		const angle = (indexOfRay / countOfRays) * 2 * Math.PI;
		const ray = new Ray(position, angle, indexOfRay);
		positionsOfRays.push(ray);
		scalesOfRays.push(null);
		continue;
	}
	let distanceOfFirstHit = null;
	let totalDistanceTraveled = 0;
	const distanceToTravel = 1;
	for (;positionsOfRays.length > 0;) {
		const newPositionsOfRays = [];
		for (const ray of positionsOfRays) {
			const isInImage = ray.checkIfIsInImage(image);
			if (isInImage) {
				const isAtColorWithMaximalAlpha = ray.isAtColorWithMaximalAlpha(image);
				if (isAtColorWithMaximalAlpha) {
					ray.moveForward(distanceToTravel);
					newPositionsOfRays.push(ray);
					continue;
				} else {
					if (distanceOfFirstHit == null) {
						distanceOfFirstHit = totalDistanceTraveled;
						scalesOfRays[ray.id] = 1;
						continue;
					} else {
						scalesOfRays[ray.id] = totalDistanceTraveled / distanceOfFirstHit;
						continue;
					}
				}
			} else {
				scalesOfRays[ray.id] = null;
				continue;
			}
		}
		positionsOfRays = newPositionsOfRays;
		totalDistanceTraveled = totalDistanceTraveled + distanceToTravel;
		if (distanceOfFirstHit === null) {
			continue;
		} else {
			if (totalDistanceTraveled >= 2 * distanceOfFirstHit) {
				for (const ray of positionsOfRays) {
					scalesOfRays[ray.id] = null;
					continue;
				}
				positionsOfRays = [];
				break;
			} else {
				continue;
			}
		}
	}
	const countOfCircularScales = scalesOfRays.filter(function (scale) {
		return scale !== null && scale < 1.2;
	}).length;
	const countOfCloseScales = scalesOfRays.filter(function (scale) {
		return scale !== null && scale >= 1.2;
	}).length;
	const countOfFarScales = scalesOfRays.filter(function (scale) {
		return scale === null;
	}).length;
	const sortedScales = scalesOfRays.toSorted(function (scale1, scale2) {
		if (scale1 === null) {
			if (scale2 === null) {
				return 0;
			} else {
				return 1;
			}
		} else {
			if (scale2 === null) {
				return -1;
			} else {
				return scale1 - scale2;
			}
		}
	});
	const statistics = {
		scalesOfRays: scalesOfRays,
		sortedScales: sortedScales,
		circular: countOfCircularScales,
		close: countOfCloseScales,
		far: countOfFarScales,
		totalDistanceTraveled: totalDistanceTraveled,
		distanceOfFirstHit: distanceOfFirstHit,
	};
	return statistics;
}
function selectPositionWithHighestLightness(image, positions) {
	let record = null;
	for (const position of positions) {
		const lightness = getLightnessAtPosition(image, position);
		if (record === null || lightness > record.lightness) {
			record = {position, lightness};
			continue;
		} else {
			continue;
		}
	}
	return record.position;
}
const deltas = [
	new Coordinates(0, -1),
	new Coordinates(0, 1),
	new Coordinates(-1, 0),
	new Coordinates(1, 0),
];
function* neighborizePosition(position) {
	for (const delta of deltas) {
		const neighbor = position.add(delta);
		yield neighbor;
		continue;
	}
	return;
}
function checkIfPositionsAreNearby(position1, position2,) {
	for (const neighborOfPosition1 of neighborizePosition(position1)) {
		if (neighborOfPosition1.equals(position2)) {
			return true;
		} else {
			continue;
		}
	}
	return false;
}
function checkIfClusterIsNearby(cluster, position,) {
	for (const positionOfCluster of cluster) {
		if (checkIfPositionsAreNearby(positionOfCluster, position)) {
			return true;
		} else {
			continue;
		}
	}
	return false;
}
function* getNearbyClusters(clusters, position,) {
	for (const cluster of clusters) {
		if (checkIfClusterIsNearby(cluster, position)) {
			yield cluster;
			continue;
		} else {
			continue;
		}
	}
	return;
}
function mergeClusters(...clusters) {
	const mergedCluster = new HashingSet();
	for (const cluster of clusters) {
		for (const position of cluster) {
			mergedCluster.add(position);
			continue;
		}
		continue;
	}
	return mergedCluster;
}
function clusterize(positions) {
	const clusters = [];
	for (const position of positions) {
		const nearbyClusters = Array.from(getNearbyClusters(clusters, position));
		if (nearbyClusters.length === 0) {
			const newCluster = new HashingSet();
			newCluster.add(position);
			clusters.push(newCluster);
			continue;
		} else {
			if (nearbyClusters.length === 1) {
				const cluster = nearbyClusters[0];
				cluster.add(position);
				continue;
			} else {
				for (const cluster of nearbyClusters) {
					const indexOfCluster = clusters.indexOf(cluster);
					clusters.splice(indexOfCluster, 1);
					continue;
				}
				const mergedCluster = mergeClusters(...nearbyClusters);
				mergedCluster.add(position);
				clusters.push(mergedCluster);
				continue;
			}
		}
	}

	return clusters;
}