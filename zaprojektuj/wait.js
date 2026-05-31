async function wait(seconds) {
	await new Promise(function (resolve) {
		setTimeout(resolve, seconds * 1000);
		return;
	});
	return;
}
