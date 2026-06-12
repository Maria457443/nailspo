import {State} from "./State.js";
import {RgbColor} from "./RgbColor.js";
import {fetchImage} from "./fetchImage.js";
import {scaleImage} from "./scaleImage.js";
import {removeBackground} from "./removeBackground.js";
const displayerOfInputImage = document.getElementById("displayer-of-input-image");
const displayerOfInputHueImage = document.getElementById("displayer-of-input-h-image");
const displayerOfInputChromaImage = document.getElementById("displayer-of-input-c-image");
const displayerOfInputLightnessImage = document.getElementById("displayer-of-input-l-image");
const displayerOfInputAlphaImage = document.getElementById("displayer-of-input-a-image");
const displayerOfMaskImage = document.getElementById("displayer-of-mask-image");
const displayerOfOutputImage = document.getElementById("displayer-of-output-image");
const colorInput = document.querySelector('input[name="color-to-apply"]');
const fileInput = document.querySelector('input[name="hand-image-upload"]');
const initialTint = RgbColor.createFromHashCssString(colorInput.value);
const state = new State(
	displayerOfInputImage,
	displayerOfOutputImage,
	initialTint,
	displayerOfMaskImage,
	displayerOfInputHueImage,
	displayerOfInputChromaImage,
	displayerOfInputLightnessImage,
	displayerOfInputAlphaImage,
);
function handleColorInput(event) {
	const newTintAsString = event.target.value;
	const newTint = RgbColor.createFromHashCssString(newTintAsString);
	state.setTint(newTint);
	return;
}
colorInput.addEventListener("input", handleColorInput);
fileInput.addEventListener("change", async (event) => {
	const file = event.target.files[0];
	if (file) {
		const url = URL.createObjectURL(file);
		const image = await fetchImage(url);
		let imageData = scaleImage(image, 0.6);
		imageData = removeBackground(imageData);
		state.setInputImage(imageData);
		URL.revokeObjectURL(url);
	}
});
const imageData = scaleImage((await fetchImage("./data/raw.png")), 0.6);
state.setInputImage(imageData);
