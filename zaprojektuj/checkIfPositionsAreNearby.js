import {iterateNeighboringPositions} from "./iterateNeighboringPositions.js";
export function checkIfPositionsAreNearby(position1, position2,) {
	const neighboringPositionsOfPosition1 = iterateNeighboringPositions(position1);
	for (const neighboringPosition of neighboringPositionsOfPosition1) {
		const arePositionsEqual = neighboringPosition.equals(position2);
		if (arePositionsEqual) {
			return true;
		} else {
			continue;
		}
	}
	return false;
}
