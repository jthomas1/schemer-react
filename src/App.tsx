import React, { useState, useEffect } from 'react';
import './App.css';
import ColourBar from "./components/ColourBar";
import { ColourFactory } from "./utils/ColourFactory";
import {Colour} from "./models/Colour";

function generateNColours(count: number) : Colour[] {
    return Array(count).fill(null).map(ColourFactory.random)
}

function App() {
    const [colours, setColours] = useState<Colour[]>(generateNColours(3))

    function addColour() {
        setColours([...colours, ColourFactory.random()])
    }

    function removeColour() {
        const copy = [...colours];
        copy.pop()
        setColours(copy)
    }

    function checkSpacebar(event: KeyboardEvent) {
        if (event.key === " ") {
            setColours(generateNColours(colours.length))
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', checkSpacebar);

        return () => {
            window.removeEventListener('keyup', checkSpacebar)
        }
    })

    return (
        <div className="App">
            <header>
                <button type="button" onClick={addColour}>
                    Add Colour
                </button>
                <button type="button" onClick={removeColour}>
                    Remove Colour
                </button>
            </header>
            <main className="colour-container">
                <ul className="colour-list">{colours.map(colour =>
                    <li key={colour.id}><ColourBar colour={colour} /></li>
                )}</ul>
            </main>
        </div>
    );
}

export default App;