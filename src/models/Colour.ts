import { generateRgb, RGB, rgb2Hex, brightness } from "../utils/ColourUtils";

let lastId = 0;

/**
 * Generates a unique ID for each colour
 * @param prefix
 */
function generateId(prefix = 'id'): string {
    lastId++;
    return `${ prefix }-${ lastId }`
}

/**
 * Class representing a colour, instantiated from RGB values
 */
export class Colour {
    public rgb: RGB
    public id: string

    constructor(rgb: RGB) {
        this.rgb = rgb
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
