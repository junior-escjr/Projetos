import React from "react";
import './Header.scss';

export default ({darkheader}) => {
    return(
        <header className={`header${darkheader ? ' has-bg' : ''}`}>
            <div className="header__logo">
                <a href="/">
                    <img src="https://logodownload.org/wp-content/uploads/2014/10/netflix-logo-1-1.png" alt="Netflix" />
                </a>
            </div>

            <div className="header__avatar">
                <a href="/">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="Avatar" />
                </a>
            </div>
        </header>
    );
}