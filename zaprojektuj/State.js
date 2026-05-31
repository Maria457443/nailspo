import {computeNailMask} from "./computeNailMask.js";
import {applyTintToImage} from "./applyTintToImage.js";
import {precomputedKernels} from "./precomputedKernels.js";
export class State {
	constructor(inputPreview, outputPreview, tint, maskPreview) {
		this.inputImage = null;
		this.inputPreview = inputPreview;
		this.outputPreview = outputPreview;
		this.maskPreview = maskPreview;
		this.clearPreview(this.inputPreview);
		this.clearPreview(this.outputPreview);
		this.clearPreview(this.maskPreview);
		this.tint = tint;
	}
	clearPreview(preview) {
		const contextOfPreview = preview.getContext(`2d`);
		preview.width = 0;
		preview.height = 0;
		contextOfPreview.clearRect(0, 0, preview.width, preview.height);
		return;
	}
	inputImage;
	setInputImage(inputImage) {
		this.inputImage = inputImage;
		this.paintInputPreview(inputImage);
		if (this.tint === null) {
			return;
		} else {
			this.paintMaskPreview(this.inputImage);
			this.paintOutputPreview(this.inputImage, this.tint);
			return;
		}
	}
	setTint(tint) {
		this.tint = tint;
		if (this.inputImage === null) {
			return;
		} else {
			this.paintMaskPreview(this.inputImage);
			this.paintOutputPreview(this.inputImage, this.tint);
			return;
		}
	}
	paintMaskPreview(inputImage) {
		const nailMask = computeNailMask(inputImage, precomputedKernels);
		this.paintPreview(this.maskPreview, nailMask);
		return;
	}
	paintOutputPreview(inputImage, tint,) {
		const nailMask = computeNailMask(inputImage, precomputedKernels);
		const outputImage = applyTintToImage(tint, inputImage, nailMask,);
		this.paintPreview(this.outputPreview, outputImage,);
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
		return;
	}
	maskPreview;
	tint;
}
