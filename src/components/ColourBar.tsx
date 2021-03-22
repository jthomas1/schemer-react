import * as React from 'react';
import { Colour } from "../utils/colour_util";

interface ColourBarProps {
    colour : Colour
}

const ColourBar: React.FC<ColourBarProps> = (props) => {
    const styles = {
        backgroundColor: props.colour.hex,
        padding: '20px',
        margin: '10px'
    }

    return (
        <div style={styles}>
            <p>{props.colour.hex}</p>
        </div>
    )
}

export default ColourBar