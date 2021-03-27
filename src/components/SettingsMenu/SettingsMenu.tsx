import React from 'react';
import { ColourFactory } from "../../utils/ColourFactory";
import { useColours } from "../../App";

interface SettingsMenuProps {}

export const SettingsMenu: React.FC<SettingsMenuProps> = () => {
    const { colours, setColours } = useColours();

    function addColour() {
        setColours([ ...colours, ColourFactory.random() ])
    }

    function removeColour() {
        const copy = [ ...colours ];
        copy.pop()
        setColours(copy)
    }

    return (
        <div>
            <button type="button" onClick={ addColour }>
                Add Colour
            </button>
            <button type="button" onClick={ removeColour }>
                Remove Colour
            </button>
        </div>
    )
}