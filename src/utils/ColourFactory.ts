import { generateRgb, RGB} from "./ColourUtils";
import { Colour } from "../models/Colour";

export const ColourFactory = {
    fromRgb(rgb: RGB): Colour {
        return new Colour(rgb)
    },

    random(): Colour {
        return new Colour(generateRgb())
    }
}