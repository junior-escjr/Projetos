import React, { useState, useEffect } from 'react';
import './ChatListItem.scss';

export default ({ onClick, active, data }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        if( data && data.lastMessageDate ) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let min = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            min = min < 10 ? '0' + min : min;
            setTime(`${hours}:${min}`);
        }
    }, [data]);

    return(
        <div className={`chatlistitem ${active ? 'active' : ''}`} onClick={onClick}>
            <figure className="chatlistitem__avatar">
                <img src={data.image} alt="" />
            </figure>
            
            <div className="chatlistitem__lines">
                <div className="chatlistitem__line-top">
                    <div className="chatlistitem__line-top__name">{data.title}</div>
                    <div className="chatlistitem__line-top__hour">{time}</div>
                </div>
                <div className="chatlistitem__line-bottom">
                    <p className="chatlistitem__line-bottom__msg">{data.lastMessage}</p>
                </div>
            </div>
        </div>
    );
}