import React, {useState} from 'react';
import './App.css';
import ColourBar from "./components/ColourBar";
import { ColourFactory } from "./utils/ColourFactory";

function App() {
    const [colourCount, setColourCount] = useState(3)
    const startColours = [];
    for (let i = 0; i < colourCount; i++) {
        startColours.push(ColourFactory.random())
    }
    const [colours, setColours] = useState(startColours)

    const colourBars = colours.map((colour, index) =>
        <li><ColourBar colour={colour} key={index}/></li>
    )

    return (
        <div className="App">
            <main className="colour-container">
                <ul className="colour-list">{colourBars}</ul>
            </main>
        </div>
    );
}

export default App;