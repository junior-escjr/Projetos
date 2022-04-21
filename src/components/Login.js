import React from 'react';
import Api from '../Api';

import './Login.scss';

export default ({ onReceive }) => {
    const handleFAcebookLogin = async () => {
        let result = await Api.fbPopup();

        if( result ) {
            onReceive( result.user );
        } else {
            alert("error");
        }
    }

    return(
        <div className='login'>
            <button onClick={handleFAcebookLogin}>Login com Facebook</button>
        </div>
    );
}