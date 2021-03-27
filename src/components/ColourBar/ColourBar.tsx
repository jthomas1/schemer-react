import React from 'react';
import { RGB, decideTextColour, rgbCss } from "../../utils/ColourUtils";
import './ColourBar.css';
import { useState } from "react";
import { Colour } from "../../models/Colour";


interface ColourBarProps {
    colour: Colour
}

export const ColourBar: React.FC<ColourBarProps> = ({ colour }) => {
    const [ backgroundColour, setBackgroundColor ] = useState<RGB>(colour.rgb)
    const [ textColour, setTextColour ] = useState<string>(decideTextColour(colour.rgb))
    const [ locked, setLocked ] = useState<boolean>(colour.locked)
    const [ flipped, setFlipped ] = useState<boolean>(false)

    const styles = {
        backgroundColor: rgbCss(backgroundColour),
        color: textColour
    }

    /**
     * Randomises the background colour unless the user has locked it.
     */
    function randomise() {
        if (locked) return;
        colour.randomise()
        setBackgroundColor(colour.rgb)
        setTextColour(decideTextColour(colour.rgb))
    }

    function toggleLock() {
        colour.locked = !colour.locked;
        setLocked(!locked)
    }

    function flip() {
        setFlipped(!flipped)
    }

    return (
        <div style={ styles } className={ `colour-bar ${ flipped ? 'flipped' : '' }` }>
            <div className="front" aria-hidden={ flipped }>
                <p>{ colour.hex }</p>
                <button onClick={ toggleLock }>{ locked ? 'Unlock' : 'Lock' }</button>
                <button onClick={ randomise }>Random</button>
                <button onClick={ flip }>Flip</button>
            </div>
            <div className="back flipped" aria-hidden={ !flipped }>
                <button  onClick={ flip }>Flip</button>
            </div>
        </div>
    )
}