export function fillMaskInterior(mask) {
	const width = mask.width;
	const height = mask.height;
	const data = mask.data;

	const visited = new Uint8Array(width * height);
	const queue = [];

 	function idx(x, y) {
 		return (y * width + x);
 	}

 	function isBackgroundAtIndex(i) {
 		const pixelIndex = i * 4;
 		// background pixels have alpha == 0
 		return data[pixelIndex + 3] === 0;
 	}

 	// enqueue background border pixels
 	for (let x = 0; x < width; x = x + 1) {
 		const top = idx(x, 0);
 		if (!visited[top] && isBackgroundAtIndex(top)) { visited[top] = 1; queue.push(top); }
 		const bottom = idx(x, height - 1);
 		if (!visited[bottom] && isBackgroundAtIndex(bottom)) { visited[bottom] = 1; queue.push(bottom); }
 	}
 	for (let y = 0; y < height; y = y + 1) {
 		const left = idx(0, y);
 		if (!visited[left] && isBackgroundAtIndex(left)) { visited[left] = 1; queue.push(left); }
 		const right = idx(width - 1, y);
 		if (!visited[right] && isBackgroundAtIndex(right)) { visited[right] = 1; queue.push(right); }
 	}

 	// BFS to mark all background reachable from borders
 	while (queue.length > 0) {
 		const current = queue.shift();
 		const x = current % width;
 		const y = Math.floor(current / width);

 		const neighbors = [ [x-1,y], [x+1,y], [x,y-1], [x,y+1] ];
 		for (const [nx, ny] of neighbors) {
 			if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
 			const ni = idx(nx, ny);
 			if (visited[ni]) continue;
 			if (isBackgroundAtIndex(ni)) {
 				visited[ni] = 1;
 				queue.push(ni);
 			}
 		}
 	}

 	// build filled mask: interior = not visited
 	const out = new ImageData(width, height);
 	for (let y = 0; y < height; y = y + 1) {
 		for (let x = 0; x < width; x = x + 1) {
 			const i = idx(x, y);
 			const outPixelIndex = i * 4;
 			if (visited[i]) {
 				// background
 				out.data[outPixelIndex + 0] = 0;
 				out.data[outPixelIndex + 1] = 0;
 				out.data[outPixelIndex + 2] = 0;
 				out.data[outPixelIndex + 3] = 0;
 			} else {
 				// interior -> set white opaque
 				out.data[outPixelIndex + 0] = 255;
 				out.data[outPixelIndex + 1] = 255;
 				out.data[outPixelIndex + 2] = 255;
 				out.data[outPixelIndex + 3] = 255;
 			}
 		}
 	}

 	return out;
}
