import {generateId, generateRgb, RGB, rgb2Hex, brightness} from "../utils/ColourUtils";

export class Colour {
    public rgb: RGB
    public id: string

    constructor(initialState: RGB) {
        this.rgb = initialState
        this.id = generateId()
    }

    randomise() {
        this.rgb = generateRgb()
    }

    get hex(): string {
        return rgb2Hex(this.rgb)
    }

    get brightness(): number {
        return brightness(this.rgb)
    }
}