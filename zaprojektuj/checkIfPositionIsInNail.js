import {computeStatisticsOfPosition} from "./computeStatisticsOfPosition.js";
import {countHolesInProfileOfRays} from "./countHolesInProfileOfRays.js";
export function checkIfPositionIsInNail(image, position) {
	const statistics = computeStatisticsOfPosition(image, position);
	const countOfHolesInProfileOfRays = countHolesInProfileOfRays(statistics.profile);
	if (countOfHolesInProfileOfRays > 1) {
		return false;
	} else {
		if (
			statistics.countOfCircularEntriesInProfile >= 9
			&& statistics.countOfCloseEntriesInProfile >= 6
			&& statistics.countOfFarEntriesInProfile >= 5
		) {
			return true;
		} else {
			return false;
		}
	}
}
