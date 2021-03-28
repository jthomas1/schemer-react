import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { ColourBar } from "./components/ColourBar/ColourBar";
import { SettingsMenu } from "./components/SettingsMenu/SettingsMenu";
import { ColourFactory } from "./utils/ColourFactory";
import { Colour } from "./models/Colour";
import { randomInRange } from "./utils/ColourUtils";

export interface IAppContext {
    colours: Colour[],
    setColours: (colours: Colour[]) => void,
    layout: string,
    setLayout: (layout: string) => void
}

export enum Layouts {
    Columns = 'columns',
    Rows = 'rows',
    Grid = 'grid'
}

export const AppContext = createContext<IAppContext>( {
    colours: [],
    setColours: colours => console.warn('no colours provider'),
    layout: 'columns',
    setLayout: layout => console.warn('no layout provider')
})

export const useAppContext = () => useContext(AppContext);

function App() {
    const [ colours, setColours ] = useState<Colour[]>(ColourFactory.generateN(4))
    const [ layout, setLayout ] = useState<string>(Layouts.Columns)
    const [ partyOn, setPartyOn ] = useState<number>()

    /**
     * Randomise all unlocked colours if the space bar is pressed
     * @param event
     */
    function spaceListener(event: KeyboardEvent) {
        if (event.key === " ") {
            let newColours: Colour[] = []
            colours.forEach(colour => {
                if (colour.locked) {
                    newColours.push(colour)
                } else {
                    newColours.push(ColourFactory.random())
                }
            })

            setColours(newColours)
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', spaceListener);

        return () => {
            window.removeEventListener('keyup', spaceListener)
        }
    })

    function swapPositions(idx1: number, idx2: number) : void {
        const newColours: Colour[] = [...colours];
        const temp = newColours[idx1];
        newColours[idx1] = newColours[idx2]
        newColours[idx2] = temp;
        setColours(newColours)
    }

    function dragOver(e :any) {
        const sourceIndex = colours.findIndex(c => c.id === e.dataTransfer.getData("text/plain"))
        const targetIndex = colours.findIndex(c => c.id === e.currentTarget.id);
        if (sourceIndex !== targetIndex) {
            swapPositions(sourceIndex, targetIndex)
        }
    }

    function dragStart(e: any) {
        e.dataTransfer.setData("text/plain", e.target.id)
    }

    function shuffle() {
        swapPositions(randomInRange(0,4), randomInRange(0,4))
    }

    function partyTime() {
        shuffle()
        setPartyOn(window.setInterval(shuffle, 500))
    }

    function stopParty() {
        window.clearInterval(partyOn)
    }

    return (
        <div className="App">
            <AppContext.Provider value={{ colours, setColours, layout, setLayout }}>
                <header className="app-header">
                    <SettingsMenu />
                    <button onClick={partyTime}>Party time</button>
                    <button onClick={stopParty}>Stop</button>
                    <button onClick={shuffle}>Shuffle</button>
                </header>
            </AppContext.Provider>
            <main className="colour-container">
                <ul className={`colour-list ${ layout } `}>{ colours.map(colour =>
                    <li
                        id={ colour.id }
                        className="colour-item"
                        key={ colour.id }
                        draggable
                        onDragEnter={dragOver}
                        onDragStart={dragStart}
                        onDrop={dragOver}
                    >
                        <ColourBar colour={ colour }/>
                    </li>
                ) }</ul>
            </main>
        </div>
    );
}

export default App;