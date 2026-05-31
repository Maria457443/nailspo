import {BoundingBox} from "./BoundingBox.js";
import {Coordinates} from "./Coordinates.js";
import {Dimensions} from "./Dimensions.js";
import {isForegroundPixel} from "./isForegroundPixel.js";
export function extractBoundingBoxesFromMask(mask) {
	const width = mask.width;
	const height = mask.height;
	const visited = new Uint8Array(width * height);
	const boundingBoxes = [];
	for (let y = 0; y < height; y = y + 1) {
		for (let x = 0; x < width; x = x + 1) {
			const position = new Coordinates(x, y);
			const index = (y * width) + x;
			if (visited[index] === 1) {
				continue;
			}
			if (!isForegroundPixel(mask, position)) {
				visited[index] = 1;
				continue;
			}
			const queue = [index];
			visited[index] = 1;
			let minX = x;
			let maxX = x;
			let minY = y;
			let maxY = y;
			while (queue.length > 0) {
				const currentIndex = queue.pop();
				const currentX = currentIndex % width;
				const currentY = Math.floor(currentIndex / width);
				if (currentX < minX) {
					minX = currentX;
				}
				if (currentX > maxX) {
					maxX = currentX;
				}
				if (currentY < minY) {
					minY = currentY;
				}
				if (currentY > maxY) {
					maxY = currentY;
				}
				const neighboringPositions = [
					[currentX - 1, currentY],
					[currentX + 1, currentY],
					[currentX, currentY - 1],
					[currentX, currentY + 1],
				];
				for (const [neighborX, neighborY] of neighboringPositions) {
					if (neighborX < 0 || neighborY < 0 || neighborX >= width || neighborY >= height) {
						continue;
					}
					const neighborIndex = (neighborY * width) + neighborX;
					if (visited[neighborIndex] === 1) {
						continue;
					}
					visited[neighborIndex] = 1;
					if (!isForegroundPixel(mask, new Coordinates(neighborX, neighborY))) {
						continue;
					} else {
						queue.push(neighborIndex);
						continue;
					}
				}
			}
			const rawWidth = (maxX - minX) + 1;
			const rawHeight = (maxY - minY) + 1;
			const widthOfBoundingBox = rawWidth + ((rawWidth + 1) % 2);
			const heightOfBoundingBox = rawHeight + ((rawHeight + 1) % 2);
			const centerXOfBoundingBox = Math.round((minX + maxX) / 2);
			const centerYOfBoundingBox = Math.round((minY + maxY) / 2);
			const multiplierOfDimensionsOfBoundingBox = 1.1;
			boundingBoxes.push(
				new BoundingBox(
					new Coordinates(centerXOfBoundingBox, centerYOfBoundingBox),
					new Dimensions(widthOfBoundingBox, heightOfBoundingBox),
				),
			);
			continue;
		}
		continue;
	}
	return boundingBoxes;
}