import React, { createContext, useContext } from 'react';
import { RGB, decideTextColour, rgbCss } from "../../utils/ColourUtils";
import './ColourBar.css';
import { useState } from "react";
import { Colour } from "../../models/Colour";
import { ColourControls } from "../ColourControls/ColourControls";
import { ColourFactory } from "../../utils/ColourFactory";
import { suppressEvent } from "../../utils/Utils";


interface ColourBarProps {
    colour: Colour
}

interface IColourBarContext {
    colour: Colour,
    updateRGB: (rgb: RGB) => void,
    locked: boolean,
    toggleLock: () => void
}

export const ColourBarContext = createContext<IColourBarContext>({
    colour: ColourFactory.random(),
    updateRGB: rgb => console.warn('no update rgb provider'),
    locked: false,
    toggleLock: () => console.warn('no lock provider')
})

export const useColourBarContext = () => useContext(ColourBarContext);

export const ColourBar: React.FC<ColourBarProps> = ({ colour }) => {
    const [ backgroundColour, setBackgroundColor ] = useState<string>(rgbCss(colour.rgb))
    const [ textColour, setTextColour ] = useState<string>(decideTextColour(colour.rgb))
    const [ locked, setLocked ] = useState<boolean>(colour.locked)
    const [ flipped, setFlipped ] = useState<boolean>(false)

    const styles = {
        backgroundColor: backgroundColour,
        color: textColour
    }

    function toggleLock() {
        colour.locked = !colour.locked;
        setLocked(!locked)
        flip()
    }

    function flip() {
        setFlipped(!flipped)
    }

    function updateRGB(rgb: RGB) {
        setBackgroundColor(rgbCss(colour.rgb))
        setTextColour(decideTextColour(colour.rgb))
    }

    return (
        <div
            style={ styles }
            className={ `colour-bar ${ flipped ? 'flipped' : '' }` }>
            <div
                className="front"
                aria-hidden={ flipped }>
                <p draggable onDragStart={ suppressEvent }>{ colour.hex.toUpperCase() }</p>
                <div>
                    <ColourBarContext.Provider value={ { colour, updateRGB, locked, toggleLock } }>
                        <ColourControls/>
                    </ColourBarContext.Provider>
                </div>
            </div>
            <div className="back flipped" aria-hidden={ !flipped }>
                <button
                    onClick={ toggleLock }
                    aria-label="Unlock">
                    <i aria-hidden="true" className="bi-unlock"/>
                </button>
            </div>
        </div>
    )
}