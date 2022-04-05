import React from 'react';
import './MessageItem.scss';

export default ({data, user}) => {
    return(
        <div className={`messageitem ${user.id === data.author ? 'is_message-out' : 'is_message-in'}`}>
            <div className='messageitem__inner'>
                <div className='messageitem__text'>{data.message}</div>
                <div className='messageitem__hour'>hora</div>
            </div>
        </div>
    );
}