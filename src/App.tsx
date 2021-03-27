import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { ColourBar } from "./components/ColourBar/ColourBar";
import { SettingsMenu } from "./components/SettingsMenu/SettingsMenu";
import { ColourFactory } from "./utils/ColourFactory";
import { Colour } from "./models/Colour";

export interface IAppContext {
    colours: Colour[],
    setColours: (colours: Colour[]) => void,
    layout: string,
    setLayout: (layout: string) => void
}

export const AppContext = createContext<IAppContext>( {
    colours: [],
    setColours: colours => console.warn('no colours provider'),
    layout: 'columns',
    setLayout: layout => console.warn('no layout provider')
})

export const useApp = () => useContext(AppContext);

function App() {
    const [ colours, setColours ] = useState<Colour[]>(ColourFactory.generateN(4))
    const [ layout, setLayout ] = useState<string>('columns')

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
            <AppContext.Provider value={{ colours, setColours, layout, setLayout }}>
                <header className="app-header">
                    <SettingsMenu />
                </header>
            </AppContext.Provider>
            <main className="colour-container">
                <ul className={`colour-list ${ layout } `}>{ colours.map(colour =>
                    <li className="colour-item" key={ colour.id }><ColourBar colour={ colour }/></li>
                ) }</ul>
            </main>
        </div>
    );
}

export default App;