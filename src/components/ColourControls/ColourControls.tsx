import React from 'react';
import './ColourControls.css'
import { useColourBarContext } from "../ColourBar/ColourBar";
import { suppressEvent } from "../../utils/Utils";

interface ColourControlsProps {
}

export const ColourControls: React.FC<ColourControlsProps> = () => {
    const { colour, updateRGB, locked, toggleLock } = useColourBarContext()

    function update(e: any) {
        const type = e.target.dataset.colour;
        if (type) {
            colour.rgb[type] = parseInt(e.target.value)
            updateRGB(colour.rgb)
        }
    }

    /**
     * Randomises the background colour unless the user has locked it.
     */
    function randomise() {
        if (locked) return;
        colour.randomise()
        updateRGB(colour.rgb)
    }

    return (
        <div>
            <div
                draggable="false"
                className="colour-controls">
                <label htmlFor={ `${ colour.id }-red` }>Red: { colour.rgb.red }</label>
                <input
                    draggable
                    onDragStart={ suppressEvent }
                    onChange={ update }
                    id={ `${ colour.id }-red` }
                    data-colour="red"
                    type="range"
                    min="0"
                    max="255"
                    defaultValue={ colour.rgb.red }/>
                <label htmlFor={ `${ colour.id }-green` }>Green: { colour.rgb.green }</label>
                <input
                    draggable
                    onDragStart={ suppressEvent }
                    onChange={ update }
                    id={ `${ colour.id }-green` }
                    type="range"
                    data-colour="green"
                    min="0"
                    max="255"
                    defaultValue={ colour.rgb.green }/>
                <label htmlFor={ `${ colour.id }-blue` }>Blue: { colour.rgb.blue }</label>
                <input
                    draggable
                    onDragStart={ suppressEvent }
                    onChange={ update }
                    id={ `${ colour.id }-blue` }
                    type="range"
                    data-colour="blue"
                    min="0"
                    max="255"
                    defaultValue={ colour.rgb.blue }/>
            </div>
            <div>
                <button
                    onClick={ toggleLock }
                    aria-label="Lock">
                    <i aria-hidden="true" className="bi-lock" />
                </button>
                <button
                    onClick={ randomise }
                    aria-label="Randomise">
                    <i aria-hidden="true" className="bi-shuffle" />
                </button>
            </div>
        </div>
    )
}