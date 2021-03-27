import { generateRgb, RGB } from "./ColourUtils";
import { Colour } from "../models/Colour";

/**
 * Factory functions to generate a colour instance
 */
export const ColourFactory = {
    /**
     * Create a colour instance from the given RGB values
     * @param rgb
     */
    fromRgb(rgb: RGB): Colour {
        return new Colour(rgb)
    },

    /**
     * Generate a random colour instance
     */
    random(): Colour {
        return new Colour(generateRgb())
    },

    /**
     * Generates the specified number of random colours
     * @param count
     */
    generateN(count: number): Colour[] {
        return Array(count).fill(null).map(ColourFactory.random)
    }
}