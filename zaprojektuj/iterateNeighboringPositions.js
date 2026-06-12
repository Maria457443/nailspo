import {deltasOfNeighboringPositions} from "./deltasOfNeighboringPositions.js";
export function* iterateNeighboringPositions(position) {
	for (const delta of deltasOfNeighboringPositions) {
		const neighboringPosition = position.add(delta);
		yield neighboringPosition;
		continue;
	}
	return;
}
