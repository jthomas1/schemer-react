import {Colour, generateRgb, RGB} from "./colour_util";

export const ColourFactory = {
    fromRgb(rgb: RGB): Colour {
        return new Colour(rgb)
    },

    random(): Colour {
        return new Colour(generateRgb())
    }
}