import {computeNailMask} from "./computeNailMask.js";
import {applyTintToImage} from "./applyTintToImage.js";
import {extractHuePreviewImage} from "./extractHuePreviewImage.js";
import {extractChromaPreviewImage} from "./extractChromaPreviewImage.js";
import {extractLightnessPreviewImage} from "./extractLightnessPreviewImage.js";
import {extractAlphaPreviewImage} from "./extractAlphaPreviewImage.js";
export class State {
	constructor(inputPreview, outputPreview, tint, maskPreview, huePreview, chromaPreview, lightnessPreview, alphaPreview,) {
		this.maskComputationState = null;
		this.inputPreview = inputPreview;
		this.outputPreview = outputPreview;
		this.maskPreview = maskPreview;
		this.huePreview = huePreview;
		this.chromaPreview = chromaPreview;
		this.lightnessPreview = lightnessPreview;
		this.alphaPreview = alphaPreview;
		this.clearPreview(this.inputPreview);
		this.clearPreview(this.outputPreview);
		this.clearPreview(this.maskPreview);
		this.clearPreview(this.huePreview);
		this.clearPreview(this.chromaPreview);
		this.clearPreview(this.lightnessPreview);
		this.clearPreview(this.alphaPreview);
		this.tint = tint;
	}
	clearPreview(preview) {
		const contextOfPreview = preview.getContext(`2d`);
		preview.width = 0;
		preview.height = 0;
		contextOfPreview.clearRect(0, 0, preview.width, preview.height);
		return;
	}
	maskComputationState;
	setInputImage(inputImage) {
		const nailMask = computeNailMask(inputImage,);
		const inputHuePreviewImage = extractHuePreviewImage(inputImage);
		const inputChromaPreviewImage = extractChromaPreviewImage(inputImage);
		const inputLightnessPreviewImage = extractLightnessPreviewImage(inputImage);
		const inputAlphaPreviewImage = extractAlphaPreviewImage(inputImage);
		this.maskComputationState = {
			inputImage: inputImage,
			nailMask: nailMask,
			inputHuePreviewImage: inputHuePreviewImage,
			inputChromaPreviewImage: inputChromaPreviewImage,
			inputLightnessPreviewImage: inputLightnessPreviewImage,
			inputAlphaPreviewImage: inputAlphaPreviewImage,
		};
		this.paintInputPreview(this.maskComputationState.inputImage);
		if (this.tint === null) {
			return;
		} else {
			this.paintMaskPreview(this.maskComputationState.nailMask);
			this.paintOutputPreview(this.maskComputationState, this.tint);
			return;
		}
	}
	setTint(tint) {
		this.tint = tint;
		if (this.maskComputationState === null) {
			return;
		} else {
			this.paintMaskPreview(this.maskComputationState.nailMask);
			this.paintOutputPreview(this.maskComputationState, this.tint);
			return;
		}
	}
	paintMaskPreview(nailMask) {
		this.paintPreview(this.maskPreview, nailMask);
		return;
	}
	paintOutputPreview(maskComputationState, tint) {
		const outputImage = applyTintToImage(tint, maskComputationState.inputImage, maskComputationState.nailMask);
		this.paintPreview(this.outputPreview, outputImage);
		return;
	}
	paintPreview(preview, image) {
		const contextOfPreview = preview.getContext(`2d`,);
		preview.width = image.width;
		preview.height = image.height;
		contextOfPreview.putImageData(image, 0, 0,);
		return;
	}
	paintInputPreview(inputImage) {
		this.paintPreview(this.inputPreview, inputImage);
		this.paintInputChannelPreviews(inputImage);
		return;
	}
	paintInputChannelPreviews(inputImage) {
		this.paintPreview(this.huePreview, this.maskComputationState.inputHuePreviewImage);
		this.paintPreview(this.chromaPreview, this.maskComputationState.inputChromaPreviewImage);
		this.paintPreview(this.lightnessPreview, this.maskComputationState.inputLightnessPreviewImage);
		this.paintPreview(this.alphaPreview, this.maskComputationState.inputAlphaPreviewImage);
		return;
	}
	maskPreview;
	huePreview;
	chromaPreview;
	lightnessPreview;
	alphaPreview;
	tint;
}
