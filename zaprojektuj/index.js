import {State} from "./State.js";
import {RgbColor} from "./RgbColor.js";
import {fetchImage} from "./fetchImage.js";
const displayerOfInputImage = document.getElementById(`displayer-of-input-image`);
const displayerOfMaskImage = document.getElementById(`displayer-of-mask-image`);
const displayerOfOutputImage = document.getElementById(`displayer-of-output-image`);
const colorInput = document.querySelector(`input[name="color-to-apply"]`);
const initialTint = RgbColor.createFromHashCssString(colorInput.value);
const state = new State(displayerOfInputImage, displayerOfOutputImage, initialTint, displayerOfMaskImage);
function handleColorInput(event) {
	const newTintAsString = event.target.value;
	const newTint = RgbColor.createFromHashCssString(newTintAsString);
	state.setTint(newTint);
	return;
}
colorInput.addEventListener(`input`, handleColorInput);
const imageData = await fetchImage(`./data/raw.png`);
state.setInputImage(imageData);
