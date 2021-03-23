export interface RGB {
    red: number;
    green: number,
    blue: number
}

let lastId = 0;

export function generateId(prefix='id'): string {
    lastId++;
    return `${prefix}-${lastId}`
}

export function generateRgb(): RGB {
    return {
        red: random(0, 255),
        green: random(0, 255),
        blue: random(0, 255)
    }
}

export function rgb2Hex(colour: RGB) {
    return `#${dec2Hex(colour.red)}${dec2Hex(colour.green)}${dec2Hex(colour.blue)}`;
}

export function decideTextColour(colour: RGB) {
    return brightness(colour) > 125 ? 'black' : 'white';
}

export function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function dec2Hex(dec: number) {
    let hex = dec.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

/*
 * brightness  = sqrt( .299*R2 + .587*G2 + .114*B2 );
 * from here: alienryderflex.com/hsp.html
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