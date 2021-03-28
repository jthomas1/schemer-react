import React, { ChangeEvent, useState } from 'react';
import { ColourFactory } from "../../utils/ColourFactory";
import { useAppContext, Layouts } from "../../App";
import { randomInRange, swapArrayItems } from "../../utils/Utils";
import { Colour } from "../../models/Colour";
import { RGB } from "../../utils/ColourUtils";
import './SettingsMenu.css'

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
        const index1 = randomInRange(0, colours.length);
        const index2 = randomInRange(0, colours.length);
        if (index1 !== index2) {
            const newOrder = swapArrayItems(colours, index1, index2)
            setColours(newOrder)
        }
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
        }, [])
        const formatted = JSON.stringify(data, null, 4)
        console.log(formatted)
        window.alert(formatted)
    }

    return (
        <ul className="menu-items">
            <li className="menu-item">
                <button type="button" onClick={ addColour }>
                    Add Colour
                </button>
            </li>
            <li className="menu-item">
                <button type="button" onClick={ removeColour }>
                    Remove Colour
                </button>
            </li>
            <li className="menu-item"><label htmlFor="layoutSelect">Layout: </label>
                <select name="layoutSelect" id="layoutSelect" defaultValue={ layout } onChange={ layoutHandler }>
                    { Object.values(Layouts).map(layout => {
                        return <option key={ layout } value={ layout }>{ layout }</option>
                    }) }
                </select></li>
            <li className="menu-item">
                <button onClick={ partyTime }>Party time</button>
            </li>
            <li className="menu-item">
                <button onClick={ stopParty }>Stop</button>
            </li>
            <li className="menu-item">
                <button onClick={ shuffle }>Shuffle</button>
            </li>
            <li className="menu-item">
                <button onClick={ showAlert }>Get JSON</button>
            </li>
        </ul>
    )
}