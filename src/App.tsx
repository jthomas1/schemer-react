import React, { useState, useEffect, createContext, useContext } from 'react';
import './App.css';
import { ColourBar } from "./components/ColourBar/ColourBar";
import { SettingsMenu } from "./components/SettingsMenu/SettingsMenu";
import { ColourFactory } from "./utils/ColourFactory";
import { Colour } from "./models/Colour";
import { swapArrayItems } from "./utils/Utils";

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

export const AppContext = createContext<IAppContext>({
    colours: [],
    setColours: colours => console.warn('no colours provider'),
    layout: 'columns',
    setLayout: layout => console.warn('no layout provider')
})

export const useAppContext = () => useContext(AppContext);

function App() {
    const [ colours, setColours ] = useState<Colour[]>(ColourFactory.generateN(4))
    const [ layout, setLayout ] = useState<string>(Layouts.Columns)
    const [ draggingId, setDraggingId ] = useState<string>('')

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

    function swapColours(index1: number, index2: number): void {
        setColours(swapArrayItems(colours, index1, index2))
    }

    function dragOver(e: any) {
        if (!draggingId) return
        if (colours.find(c => draggingId === e.currentTarget.id)?.locked) return
        const sourceIndex = colours.findIndex(c => c.id === draggingId)
        const targetIndex = colours.findIndex(c => c.id === e.currentTarget.id);
        if (sourceIndex !== targetIndex) {
            swapColours(sourceIndex, targetIndex)
        }
    }

    function dragStart(e: any) {
        if (colours.find(c => c.id === e.target.id)?.locked) return
        // for some reason the native dataTransfer API doesn't work in Edge but it does in firefox
        // e.dataTransfer.effectAllowed = "move"
        // e.dataTransfer.setData("text/plain", e.target.id)

        // set a local variable instead of using native API
        setDraggingId(e.target.id)
    }

    function dragEnd(e: any) {
        setDraggingId('')
    }

    return (
        <div className="App">
            <AppContext.Provider value={ { colours, setColours, layout, setLayout } }>
                <header className="app-header">
                    <SettingsMenu/>
                </header>
            </AppContext.Provider>
            <main className="colour-container">
                <ul className={ `colour-list ${ layout } ` }>{ colours.map(colour =>
                    <li
                        id={ colour.id }
                        className="colour-item"
                        key={ colour.id }
                        draggable
                        onDragEnter={ dragOver }
                        onDragStart={ dragStart }
                        onDrop={ dragOver }
                        onDragEnd={ dragEnd }
                    >
                        <ColourBar colour={ colour }/>
                    </li>
                ) }</ul>
            </main>
        </div>
    );
}

export default App;