import {RgbColor} from "./RgbColor.js";
import {ComponentOfRgbColor} from "./ComponentOfRgbColor.js";
export class OklchColor {
	constructor(lightnessComponent, chromaComponent, hueComponent,) {
		this.lightnessComponent = lightnessComponent;
		this.chromaComponent = chromaComponent;
		this.hueComponent = hueComponent;
	}
	lightnessComponent;
	chromaComponent;
	hueComponent;
	convertToRgb() {
		const hRad = this.hueComponent * Math.PI / 180;
		const a = this.chromaComponent * Math.cos(hRad);
		const b_ = this.chromaComponent * Math.sin(hRad);
		const l_ = this.lightnessComponent + 0.3963377774 * a + 0.2158037573 * b_;
		const m_ = this.lightnessComponent - 0.1055613458 * a - 0.0638541728 * b_;
		const s_ = this.lightnessComponent - 0.0894841775 * a - 1.2914855480 * b_;
		const l = l_ ** 3;
		const m = m_ ** 3;
		const s = s_ ** 3;
		let r = 4.0767416621 * l - 3.3077363322 * m + 0.2309101289 * s;
		let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193761 * s;
		let b = -0.0041960771 * l - 0.7034186147 * m + 1.7076147010 * s;
		r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
		g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
		b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;
		const convertedThis = new RgbColor(
			ComponentOfRgbColor.createFrom0To1Float(r),
			ComponentOfRgbColor.createFrom0To1Float(g),
			ComponentOfRgbColor.createFrom0To1Float(b)
		);
		return convertedThis;
	}
}
