import React, { useState, useEffect } from "react";
import ChatListItem from './components/ChatListItem';
import ChatIntro from "./components/ChatIntro";
import ChatWindow from "./components/ChatWindow";
import NewChat from "./components/NewChat";
import Login from "./components/Login";
import './App.scss';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Api from "./Api";

export default () => {
    const [chatList, setChatList] = useState([]);

    const [activeChat, setActiveChat] = useState({});
    const [user, setUser] = useState( null );

    const [showNewChat, setShowNewChat] = useState( false );

    const handleNewChat = () => {
        if( showNewChat ) {
            setShowNewChat( false );
        } else {
            setShowNewChat( true );
        }
    }

    useEffect(() => {
        if( user !== null) {
           let unsub =  Api.onChatList( user.id, setChatList );
           return unsub;
        }

    }, [user]);

    const handleLoginData = async ( u ) => {
        let newUser = {
            id: u.uid,
            name: u.displayName,
            avatar: u.photoURL
        };

        await Api.addUser( newUser );
        setUser( newUser );
    }

    if( user === null) return(<Login onReceive={handleLoginData} />);

    return(
        <div className="app">
            <NewChat
            show={showNewChat}
            setShow={handleNewChat}
            chatList={chatList}
            user={user} />

            <aside className="sidebar">
                <header className="sidebar__header">
                    <img className="sidebar__header__avatar" src={user.avatar} alt="avatar" />

                    <div className="sidebar__header__buttons">
                        <div>
                            <DonutLargeIcon style={{color: '#919191'}} />
                        </div>
                        <div>
                            <ChatIcon onClick={handleNewChat} style={{color: '#919191'}} />
                        </div>
                        <div>
                            <MoreVertIcon style={{color: '#919191'}} />
                        </div>
                    </div>
                </header>
                <div className="sidebar__search">
                    <div className="sidebar__search__input-holder">
                        <SearchIcon fontSize="small" style={{color: '#919191'}} />
                        <input className="input" type="text" />  
                    </div>
                </div>
                <div className="sidebar__chatlist">
                    {chatList.map( (item, key) => (
                        <ChatListItem
                        key={key}
                        data={item}
                        active={activeChat.chatId === chatList[key].chatId}
                        onClick={() => setActiveChat( chatList[key] )}
                        />
                    ))}
                </div>
            </aside>
            <div className="content">
                {activeChat.chatId !== undefined &&
                    <ChatWindow user={user} />
                }

                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }
            </div>
        </div>
    );
}