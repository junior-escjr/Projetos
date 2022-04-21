import React from 'react';
import './ChatListItem.scss';

export default ({ onClick, active, data }) => {
    return(
        <div className={`chatlistitem ${active ? 'active' : ''}`} onClick={onClick}>
            <figure className="chatlistitem__avatar">
                <img src={data.avatar} alt="" />
            </figure>
            
            <div className="chatlistitem__lines">
                <div className="chatlistitem__line-top">
                    <div className="chatlistitem__line-top__name">{data.title}</div>
                    <div className="chatlistitem__line-top__hour">01:31</div>
                </div>
                <div className="chatlistitem__line-bottom">
                    <p className="chatlistitem__line-bottom__msg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
            </div>
        </div>
    );
}