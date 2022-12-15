import React from 'react';
import './Field.scss';

const Field = () => {
    return(
        <div>
            <h1>Translate App</h1>

            <label htmlFor="">
                Enter English <br />
                <input type="text" />
            </label>
        </div>
    );
}

export default Field;