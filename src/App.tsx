import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { ColourBar } from "./components/ColourBar/ColourBar";
import { SettingsMenu } from "./components/SettingsMenu/SettingsMenu";
import { ColourFactory } from "./utils/ColourFactory";
import { Colour } from "./models/Colour";

export interface IColoursContext {
    colours: Colour[],
    setColours: (colours: Colour[]) => void
}

export const ColoursContext = createContext<IColoursContext>( {
    colours: [],
    setColours: colours => console.warn('no colours provider')
})

export const useColours = () => useContext(ColoursContext);

function App() {
    const [ colours, setColours ] = useState<Colour[]>(ColourFactory.generateN(4))

    /**
     * Randomise colours if the space bar is pressed
     * @param event
     */
    function spaceListener(event: KeyboardEvent) {
        if (event.key === " ") {
            setColours(ColourFactory.generateN(colours.length))
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', spaceListener);

        return () => {
            window.removeEventListener('keyup', spaceListener)
        }
    })

    return (
        <div className="App">
            <ColoursContext.Provider value={{ colours, setColours }}>
                <header className="app-header">
                    <SettingsMenu />
                </header>
                <main className="colour-container">
                    <ul className="colour-list">{ colours.map(colour =>
                        <li className="colour-item" key={ colour.id }><ColourBar colour={ colour }/></li>
                    ) }</ul>
                </main>
            </ColoursContext.Provider>
        </div>
    );
}

export default App;