import {countOfRays} from "./countOfRays.js";
import {extractDimensionsFromImage} from "./extractDimensionsFromImage.js";
import {Ray} from "./Ray.js";
export function computeStatisticsOfPosition(image, position) {
	let rays = [];
	const profileOfRays = [];
	for (let indexOfRay = 0; indexOfRay < countOfRays; indexOfRay = indexOfRay + 1) {
		const angle = (indexOfRay / countOfRays) * 2 * Math.PI;
		const ray = new Ray(angle, indexOfRay, position);
		rays.push(ray);
		profileOfRays.push(null);
		continue;
	}
	let distanceOfFirstHit = null;
	let totalDistanceTraveled = 0;
	const distanceToTravel = 1;
	const dimensionsOfImage = extractDimensionsFromImage(image);
	for (;rays.length > 0;) {
		const newRays = [];
		for (const ray of rays) {
			const isInImage = ray.checkIfIsInDimensions(dimensionsOfImage);
			if (isInImage) {
				const isAtColorWithMaximalAlpha = ray.checkIfIsAtColorWithMaximalAlpha(image);
				if (isAtColorWithMaximalAlpha) {
					ray.moveForward(distanceToTravel);
					newRays.push(ray);
					continue;
				} else {
					if (distanceOfFirstHit == null) {
						distanceOfFirstHit = totalDistanceTraveled;
						profileOfRays[ray.index] = 1;
						continue;
					} else {
						profileOfRays[ray.index] = totalDistanceTraveled / distanceOfFirstHit;
						continue;
					}
				}
			} else {
				profileOfRays[ray.index] = null;
				continue;
			}
		}
		rays = newRays;
		totalDistanceTraveled = totalDistanceTraveled + distanceToTravel;
		if (distanceOfFirstHit === null) {
			continue;
		} else {
			if (totalDistanceTraveled >= 2 * distanceOfFirstHit) {
				for (const ray of rays) {
					profileOfRays[ray.index] = null;
					continue;
				}
				rays = [];
				break;
			} else {
				continue;
			}
		}
	}
	const countOfCircularEntriesInProfile = profileOfRays.filter(function (scale) {
		return scale !== null && scale < 1.1;
	}).length;
	const countOfCloseEntriesInProfile = profileOfRays.filter(function (scale) {
		return scale !== null && scale >= 1.1;
	}).length;
	const countOfFarEntriesInProfile = profileOfRays.filter(function (scale) {
		return scale === null;
	}).length;
	const sortedProfileOfRays = profileOfRays.toSorted(function (scale1, scale2) {
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
		profile: profileOfRays,
		sortedProfile: sortedProfileOfRays,
		countOfCircularEntriesInProfile: countOfCircularEntriesInProfile,
		countOfCloseEntriesInProfile: countOfCloseEntriesInProfile,
		countOfFarEntriesInProfile: countOfFarEntriesInProfile,
		totalDistanceTraveled: totalDistanceTraveled,
		distanceOfFirstHit: distanceOfFirstHit,
	};
	return statistics;
}
