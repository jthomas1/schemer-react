/**
 * Suppress any DOM events
 * Using this mostly for preventing interacting with child elements causing a drag on the parent container
 * @param e
 */
export function suppressEvent(e: any) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Returns a new array with the items at the specified indices swapped around
 * @param inArray
 * @param index1
 * @param index2
 */
export function swapArrayItems(inArray: any[], index1: number, index2: number) : any[] {
    const outArray: any[] = [ ...inArray ]
    const temp = outArray[index1];
    outArray[index1] = outArray[index2]
    outArray[index2] = temp;
    return outArray
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
 * Convert a decimal value to a hexadecimal value
 * @param dec
 */
export function dec2Hex(dec: number) {
    let hex = dec.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
}