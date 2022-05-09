import React, { useState } from "react";
import './MovieRow.scss';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const URL_BASE_IMAGE = 'https://image.tmdb.org/t/p/w300';

export default ({ title, items }) => {
    const [scrolX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrolX + Math.round( window.innerWidth / 2 );
        if ( x > 0 ) {
            x = 0;
        }

        setScrollX( x );
    }

    const handleRightArrow = () => {
        let x = scrolX - Math.round( window.innerWidth / 2 );
        let listW = items.results.length * 150;

        if( (window.innerWidth - listW) > x) {
            x = window.innerWidth - listW - 80;
        }
        
        setScrollX( x );
    }

    return(
        <div className="movierow">
            <h2 className="movierow__title">{title}</h2>
            
            <div className="movierow__row">
                <div className="movierow__row__holder" style={{ width: items.results.length * 150, marginLeft: scrolX }}>
                    {items.results.length > 0 && items.results.map( ( item, key ) => (
                        <figure key={key} className="movierow__item">
                            <img className="movierow__item__poster" key={key} src={`${URL_BASE_IMAGE}${item.poster_path}`} alt={item.original_title} />
                        </figure>
                    ))}
                </div>
            </div>

            <div className="movierow__left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="movierow__right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
        </div>
    );
}