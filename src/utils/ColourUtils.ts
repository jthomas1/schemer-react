/**
 * Describes a colour as red, green and blue values from 0-255
 */
export interface RGB {
    [key: string]: number
    red: number
    green: number,
    blue: number
}

/**
 * Generates a random colour as RGB values
 */
export function generateRgb(): RGB {
    return {
        red: randomInRange(0, 255),
        green: randomInRange(0, 255),
        blue: randomInRange(0, 255)
    }
}

/**
 * Generate a random number in the given range
 * @param min
 * @param max
 */
export function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Convert the given RGB values to a hexadecimal string
 * @param colour
 */
export function rgb2Hex(colour: RGB) {
    return `#${ dec2Hex(colour.red) }${ dec2Hex(colour.green) }${ dec2Hex(colour.blue) }`;
}

/**
 * Convert a decimal value to a hexadecimal value
 * @param dec
 */
export function dec2Hex(dec: number) {
    let hex = dec.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

/*
 * brightness  = sqrt( .299*R2 + .587*G2 + .114*B2 );
 * from here: alienryderflex.com/hsp.html
 * @param colour
 */
export function brightness(colour: RGB) {
    return Math.round(
        Math.sqrt(
            Math.pow(colour.red, 2) * 0.299 +
            Math.pow(colour.green, 2) * 0.587 +
            Math.pow(colour.blue, 2) * 0.114
        )
    );
}

/**
 * Choose to use black or white text based on the brightness of the background
 * @param colour
 */
export function decideTextColour(colour: RGB) {
    return brightness(colour) > 125 ? 'black' : 'white';
}

/**
 * Convert the given RGB values to a CSS rule string
 * @param rgb
 */
export function rgbCss(rgb: RGB): string {
    return `rgb(${ rgb.red }, ${ rgb.green }, ${ rgb.blue })`;
}