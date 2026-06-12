export function removeElementFromArrayInPlace(array, element) {
	const indexOfElement = array.indexOf(element);
	array.splice(indexOfElement, 1);
	return;
}
