import React, { ChangeEvent } from 'react';
import { ColourFactory } from "../../utils/ColourFactory";
import { useAppContext, Layouts } from "../../App";

interface SettingsMenuProps {
}

export const SettingsMenu: React.FC<SettingsMenuProps> = () => {
    const { colours, setColours, layout, setLayout } = useAppContext();

    function addColour() {
        setColours([ ...colours, ColourFactory.random() ])
    }

    function removeColour() {
        const copy = [ ...colours ];
        copy.pop()
        setColours(copy)
    }

    function layoutHandler(event: ChangeEvent<HTMLSelectElement>) {
        setLayout(event.target.value)
    }

    return (
        <div>
            <button type="button" onClick={ addColour }>
                Add Colour
            </button>
            <button type="button" onClick={ removeColour }>
                Remove Colour
            </button>
            <label htmlFor="layoutSelect">Layout: </label>
            <select name="layoutSelect" id="layoutSelect" defaultValue={ layout } onChange={ layoutHandler }>
                { Object.values(Layouts).map(layout => {
                    return <option value={ layout }>{ layout }</option>
                }) }
            </select>
        </div>
    )
}