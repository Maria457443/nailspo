import {fetchImage} from "./fetchImage.js";
import {scaleImageUntil} from "./scaleImageUntil.js";
import {Dimensions} from "./Dimensions.js";
import {removeBackgroundCopying} from "./removeBackgroundCopying.js";
import {State} from "./State.js";
import {RgbColor} from "./RgbColor.js";
export const view = {
	displayerOfInputImage: document.getElementById("displayer-of-input-image"),
	displayerOfInputHueImage: document.getElementById("displayer-of-input-h-image"),
	displayerOfInputChromaImage: document.getElementById("displayer-of-input-c-image"),
	displayerOfInputLightnessImage: document.getElementById("displayer-of-input-l-image"),
	displayerOfInputAlphaImage: document.getElementById("displayer-of-input-a-image"),
	displayerOfMaskImage: document.getElementById("displayer-of-mask-image"),
	displayerOfOutputImage: document.getElementById("displayer-of-output-image"),
	colorInput: document.querySelector('input[name="color-to-apply"]'),
	fileInput: document.querySelector('input[name="hand-image-upload"]'),
};
export const initialTint = RgbColor.createFromHashCssString(view.colorInput.value);
export const state = new State(
	view.displayerOfInputImage,
	view.displayerOfOutputImage,
	initialTint,
	view.displayerOfMaskImage,
	view.displayerOfInputHueImage,
	view.displayerOfInputChromaImage,
	view.displayerOfInputLightnessImage,
	view.displayerOfInputAlphaImage,
);
view.colorInput.addEventListener("input", handleColorInput);
view.fileInput.addEventListener("change", handleHandImageUpload);
const targetDimensions = new Dimensions(600, 600);
export async function handleHandImageUpload(event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	const originalImage = await fetchImage(url);
	URL.revokeObjectURL(url);
	const image = removeBackgroundCopying(scaleImageUntil(originalImage, targetDimensions));
	state.setInputImage(image);
	return;
}
export function handleColorInput(event) {
	const newTintAsString = event.target.value;
	const newTint = RgbColor.createFromHashCssString(newTintAsString);
	state.setTint(newTint);
	return;
}
const initialImage = await fetchImage(`./raw.png`);
const scaledInitialImage = scaleImageUntil(initialImage, targetDimensions);
const initialImageWithRemovedBackground = removeBackgroundCopying(scaledInitialImage);
state.setInputImage(initialImageWithRemovedBackground);

