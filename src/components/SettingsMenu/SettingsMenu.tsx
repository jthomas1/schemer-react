import React from 'react';
import { ColourFactory } from "../../utils/ColourFactory";
import { useApp } from "../../App";

interface SettingsMenuProps {
}

enum Layouts {
    Columns = 'columns',
    Rows = 'rows',
    Grid = 'grid'
}

export const SettingsMenu: React.FC<SettingsMenuProps> = () => {
    const { colours, setColours, layout, setLayout } = useApp();

    function addColour() {
        setColours([ ...colours, ColourFactory.random() ])
    }

    function removeColour() {
        const copy = [ ...colours ];
        copy.pop()
        setColours(copy)
    }

    function layoutHandler(event: any) {
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
            <select name="layoutSelect" id="layoutSelect" onChange={ layoutHandler }>
                <option value={ Layouts.Columns } selected={ layout === Layouts.Columns }>Columns</option>
                <option value={ Layouts.Rows } selected={ layout === Layouts.Rows }>Rows</option>
                <option value={ Layouts.Grid } selected={ layout === Layouts.Grid }>Grid</option>
            </select>
        </div>
    )
}