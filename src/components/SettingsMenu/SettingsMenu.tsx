import React, { ChangeEvent, useState } from 'react';
import { ColourFactory } from "../../utils/ColourFactory";
import { useAppContext, Layouts } from "../../App";
import { randomInRange, swapArrayItems } from "../../utils/Utils";
import { Colour } from "../../models/Colour";
import { RGB } from "../../utils/ColourUtils";

interface SettingsMenuProps {
}

export const SettingsMenu: React.FC<SettingsMenuProps> = () => {
    const [ partyOn, setPartyOn ] = useState<number>()
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

    function shuffle() {
        const newOrder = swapArrayItems(colours, randomInRange(0, colours.length), randomInRange(0, colours.length))
        setColours(newOrder)
    }

    function partyTime() {
        if (partyOn) return
        shuffle()
        setPartyOn(window.setInterval(shuffle, 500))
    }

    function stopParty() {
        window.clearInterval(partyOn)
        setPartyOn(undefined)
    }

    function showAlert() {
        const data = colours.reduce((result: { hex: string, rgb: RGB }[], colour: Colour) => {
            result.push({
                hex: colour.hex,
                rgb: colour.rgb
            })

            return result;
        },[])
        window.alert(JSON.stringify(data, null, 4))
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
                    return <option key={layout} value={ layout }>{ layout }</option>
                }) }
            </select>
            <button onClick={ partyTime }>Party time</button>
            <button onClick={ stopParty }>Stop</button>
            <button onClick={ shuffle }>Shuffle</button>
            <button onClick={ showAlert }>Get JSON</button>
        </div>
    )
}