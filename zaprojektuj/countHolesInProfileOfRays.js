export function countHolesInProfileOfRays(profile) {
	const [firstEntry, ...restEntries] = profile;
	const isFirstEntryInHole = firstEntry === null;
	if (isFirstEntryInHole) {
		const countOfHoles = countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryInHole(1, restEntries);
		return countOfHoles;
	} else {
		const countOfHoles = countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryNotInHole(0, restEntries);
		return countOfHoles;
	}
}
export function countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryInHole(countOfHoles, profile) {
	const [currentEntry, ...restEntries] = profile;
	if (currentEntry === undefined) {
		const finalCountOfHoles = countOfHoles - 1;
		return finalCountOfHoles;
	} else {
		const isCurrentEntryInHole = currentEntry === null;
		if (isCurrentEntryInHole) {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		} else {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		}
	}
}
export function countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryNotInHole(countOfHoles, profile) {
	const [currentEntry, ...restEntries] = profile;
	if (currentEntry === undefined) {
		const finalCountOfHoles = countOfHoles;
		return finalCountOfHoles;
	} else {
		const isCurrentEntryInHole = currentEntry === null;
		if (isCurrentEntryInHole) {
			const newCountOfHoles = countOfHoles + 1;
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryNotInHole(newCountOfHoles, restEntries);
			return finalCountOfHoles;
		} else {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryNotInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		}
	}
}
export function countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryNotInHole(countOfHoles, profile) {
	const [currentEntry, ...restEntries] = profile;
	if (currentEntry === undefined) {
		const finalCountOfHoles = countOfHoles;
		return finalCountOfHoles;
	} else {
		const isCurrentEntryInHole = currentEntry === null;
		if (isCurrentEntryInHole) {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryNotInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		} else {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryNotInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		}
	}
}
export function countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryInHole(countOfHoles, profile) {
	const [currentEntry, ...restEntries] = profile;
	if (currentEntry === undefined) {
		const finalCountOfHoles = countOfHoles;
		return finalCountOfHoles;
	} else {
		const isCurrentEntryInHole = currentEntry === null;
		if (isCurrentEntryInHole) {
			const newCountOfHoles = countOfHoles + 1;
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyInHoleWithFirstEntryInHole(newCountOfHoles, restEntries);
			return finalCountOfHoles;
		} else {
			const finalCountOfHoles = countHolesInProfileOfRaysRecursivelyNotInHoleWithFirstEntryInHole(countOfHoles, restEntries);
			return finalCountOfHoles;
		}
	}
}