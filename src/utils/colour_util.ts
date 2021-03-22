export interface RGB {
    red: number;
    green: number,
    blue: number
}

export class Colour {
    private rgb: RGB

    constructor(initialState: RGB) {
        this.rgb = initialState
    }

    get hex(): string {
        return rgb2Hex(this.rgb)
    }

    set hex(hex: string) {
        this.hex = hex;
    }

    get brightness(): number {
        return brightness(this.rgb)
    }
}

export function generateRgb(): RGB {
    return {
        red: random(0, 255),
        green: random(0, 255),
        blue: random(0, 255)
    }
}

function rgb2Hex(colour: RGB) {
    return `#${dec2Hex(colour.red)}${dec2Hex(colour.green)}${dec2Hex(colour.blue)}`;
}

function textColour(colour: RGB) {
    return brightness(colour) > 125 ? 'black' : 'white';
}

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

function dec2Hex(dec: number) {
    let hex = dec.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}

/*
 * brightness  = sqrt( .299*R2 + .587*G2 + .114*B2 );
 * from here: alienryderflex.com/hsp.html
 */
function brightness(colour: RGB) {
    return Math.round(
        Math.sqrt(
            Math.pow(colour.red, 2) * 0.299 +
            Math.pow(colour.green, 2) * 0.587 +
            Math.pow(colour.blue, 2) * 0.114
        )
    );
}