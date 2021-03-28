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