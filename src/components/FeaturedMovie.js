import React from "react";
import './FeaturedMovie.scss';

const URL_BASE_IMAGE = 'https://image.tmdb.org/t/p/original';

export default ({ item }) => {
    console.log( item );

    let year = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres ) {
        genres.push( item.genres[i].name );
    }

    let description = item.overview;
    if( description.length > 200 ) {
        description = description.substring(0, 200) + '...';
    }

    return(
        <section className="featured" style={{
            backgroundImage: `url(${URL_BASE_IMAGE}${item.backdrop_path})`
        }}>
            
            <div className="featured__holder">
                <h1 className="featured__name">{item.name}</h1>
                <div className="featured__info">
                    <div className="featured__info__points">{item.vote_average} pontos</div>
                    <div className="featured__info__years">{year.getFullYear()}</div>
                    <div className="featured__info__seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                </div>

                {item.overview ? (
                    <p className="featured__description">{description}</p>
                ) : ''}
                
                <div className="featured__buttons">
                    <a className="btn is-style1" href={`watch/${item.id}`} >▶ Assistir</a>
                    <a className="btn is-style2" href={`list/add/${item.id}`} >+ Minha lista</a>
                </div>

                {item.genres.length !== 0 ? (
                    <p className="featured__genres">Gênero: {genres.join(', ')}</p>
                ) : ''}
            </div>  
        </section>
    );
}