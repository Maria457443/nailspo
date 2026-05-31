import {example} from "./example.js";
import {generateKernels} from "./generateKernels.js";
export const precomputedKernels = Array.from(
	generateKernels(
		{
			// scaleFactors: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1],
			// anglesInRadians: [0 * 2 * Math.PI, 0.5 * 2 * Math.PI,],
			sizeOfKernel: 5,
			scaleFactors: [1,],
			anglesInRadians: [0 * 2 * Math.PI,],
		},
		example.images
	),
);