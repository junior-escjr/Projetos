import React, { useEffect, useState } from "react";
import Api from "./Api";
import MovieRow from './components/MovieRow';

import './App.scss'
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
    const [movieList, setMovielist] = useState([]);
    const [featuredData, setfeaturedData] = useState( null );
    const [darkHeader, setDarkHeader] = useState( false );

    useEffect( () => {
        const loadAll = async () => {
            let list = await Api.getHomeList();
            setMovielist( list );

            //Pegando filme em destaque
            let originals = list.filter( i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * originals[0].items.results.length - 1);
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Api.getMovieInfo( chosen.id, 'tv' );
            setfeaturedData( chosenInfo );
        }

        loadAll();
    }, []);

    useEffect( () => {
        const scrollListener = () => {
            if( window.scrollY > 10 ) {
                setDarkHeader( true );
            } else {
                setDarkHeader( false );
            }
        }

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
        }
    }, []);

    return(
        <div className="page">
            <Header darkheader={ darkHeader } />

            {movieList.length <= 0 &&
                <div className="loading">
                    <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" />
                </div>
            }

            {featuredData && 
                <FeaturedMovie item={featuredData} />
            }

            <section className="lists">
                {movieList.map( ( item, key ) => (
                    <MovieRow key={key} title={item.title} items={item.items} />
                ))}
            </section>

            <footer className="footer">
                <p>Direitos de imagem para Netflix<br />
                Dados pegos dos site Themoviedb.org</p>
            </footer>
        </div>
    );
}