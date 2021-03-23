import * as React from 'react';
import { RGB, decideTextColour } from "../utils/ColourUtils";
import './ColourBar.css';
import { useState } from "react";
import {Colour} from "../models/Colour";


interface ColourBarProps {
    colour : Colour
}

const ColourBar: React.FC<ColourBarProps> = (props: ColourBarProps) => {
    const [backgroundColour, setBackgroundColor] = useState<string>(rgbCss(props.colour.rgb))
    const [textColour, setTextColour] = useState<string>(decideTextColour(props.colour.rgb))
    const [locked, setLocked] = useState<Boolean>(false)
    const [flipped, setFlipped] = useState<Boolean>(false)

    const styles = {
        backgroundColor: backgroundColour,
        color: textColour
    }

    function rgbCss(rgb: RGB): string {
        return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    }

    function randomise() {
        if (locked) return;
        props.colour.randomise()
        setBackgroundColor(rgbCss(props.colour.rgb))
        setTextColour(decideTextColour(props.colour.rgb))
    }

    function toggleLock() {
        setLocked(!locked)
    }

    function flip() {
        setFlipped(!flipped)
    }

    return (
        <div style={styles} className={`colour-bar ${ flipped ? 'flipped' : ''}`}>
            <div className="front">
                <p>{props.colour.hex}</p>
                <button onClick={toggleLock}>{ locked ? 'Unlock' : 'Lock' }</button>
                <button onClick={randomise}>Randomise</button>
                <button onClick={flip}>Flip</button>
            </div>
            <div className="back flipped">
                <button onClick={flip}>Flip</button>
            </div>

        </div>
    )
}

export default ColourBar