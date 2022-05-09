import React, { useState, useEffect } from 'react';
import './MessageItem.scss';

export default ({data, user}) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        if( data ) {
            let d = new Date(data.date.seconds * 1000);
            let hours = d.getHours();
            let min = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            min = min < 10 ? '0' + min : min;
            setTime(`${hours}:${min}`);
        }
    }, [data]);

    return(
        <div className={`messageitem ${user.id === data.author ? 'is_message-out' : 'is_message-in'}`}>
            <div className='messageitem__inner'>
                <div className='messageitem__text'>{data.body}</div>
                <div className='messageitem__hour'>{time}</div>
            </div>
        </div>
    );
}