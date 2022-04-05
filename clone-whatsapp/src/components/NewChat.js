import React, { useState, useEffect, useReducer } from 'react';
import Api from '../Api';
import './NewChat.scss';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default ({ show, setShow, chatList, user }) => {
    const [list, setList] = useState([]);

    useEffect( () => {
        const getList = async () => {
            if( user !== null ) {
                let results = await Api.getContactList( user.id );
                setList( results );
            }
        }

        getList();
    }, [user]);

    const [newchatShow, setNewchatShow] = useState( false );

    // console.log( list );

    return(
        <div className={`newchat${( show ) ? ' is-show' : ''}`}>
            <div className='newchat__header'>
                <div className='newchat__btn'>
                    <ArrowBackIcon onClick={setShow} />
                </div>
                <div className='newchat__title'>Nova conversa</div>
            </div>
            <div className='newchat__list'>
                {list.map(( item, key ) => (
                    <div className='chatlistitem' key={ key }>
                        <figure className="chatlistitem__avatar">
                            <img src={item.avatar} alt="" />
                        </figure>
                        
                        <div className="chatlistitem__lines">
                            <div className="chatlistitem__line-top">
                                <div className="chatlistitem__line-top__name">{item.name}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}