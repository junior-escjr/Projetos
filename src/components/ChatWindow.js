import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import MessageItem from "./MessageItem";
import Api from "../Api";
import './ChatWindow.scss';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

export default ({user, data}) => {
    const mainchat = useRef();

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if ( SpeechRecognition !== undefined ) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState( false );
    const [text, setText] = useState('');
    const [listening, setListening] = useState( false );
    const [listMessage, setListMessage] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect( () => {
        setListMessage([]);
        let unsub = Api.onChatMessage( data.chatId, setListMessage, setUsers );

        return unsub;
    }, [data.chatId]);

    // useEffect(() => {
    //     if( mainchat.current.scrollHeight > mainchat.current.offsetHeight ) {
    //         mainchat.current.scrollTop = mainchat.current.scrollHeight - mainchat.current.offsetHeight;
    //     }
    // }, [listMessage])

    const handleEmojiClick = ( e, emojiObject ) => {
        setText( text + emojiObject.emoji );
    }

    const handleMicClick = () => {
        if( recognition !== null ) {
            recognition.onstart = () => {
                setListening( true );
            }

            recognition.onend = () => {
                setListening( false );
            }

            recognition.onresult = ( e ) => {
                setText( e.results[0][0].transcript );
            }

            recognition.start();
        }
    }

    const handleInputKeyUp = ( e ) => {
        if( e.keyCode == 13 ) {
            handleSendClick();
        }
    }

    const handleSendClick = () => {
        if( text !== '') {
            Api.sendMessage( data, user.id, 'text', text, users);
            setText('');
            setEmojiOpen( false );
        }
    }

    return(
        <div className="chatwindow">
            <div className="chatwindow__header">
                <div className="chatwindow__header__info">
                    <figure className="chatwindow__header__avatar">
                        <img src={data.image} />
                    </figure>

                    <div className="chatwindow__header__name">{data.title}</div>
                </div>

                <div className="chatwindow__header__buttons">
                    <div className="chatwindow__btn">
                        <SearchIcon />
                    </div>
                    <div className="chatwindow__btn">
                        <AttachFileIcon />
                    </div>
                    <div className="chatwindow__btn">
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            <div ref={mainchat} className="chatwindow__main">
                {listMessage.map( ( item, key ) => (
                    <MessageItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className="chatwindow__emojiarea" style={{height: emojiOpen ? '200px' : '0'}}>
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className="chatwindow__footer">
                <div className="chatwindow__footer__initial">
                    {emojiOpen &&
                        <div className="chatwindow__btn" onClick={() => setEmojiOpen( false )}>
                            <CloseIcon />
                        </div>
                    }
                    
                    {!emojiOpen &&
                        <div className="chatwindow__btn" onClick={() => setEmojiOpen( true )}>
                            <InsertEmoticonIcon />
                        </div>
                    }
                    
                </div>

                <div className="chatwindow__footer__middle">
                    <input type="text" className="chatwindow__footer__input" placeholder="Mensagem"
                    value={ text }
                    onChange={ e => setText( e.target.value ) }
                    onKeyUp={handleInputKeyUp} />
                </div>
                
                <div className="chatwindow__footer__end">

                    { text === '' &&
                        <div className="chatwindow__btn" onClick={handleMicClick}>
                            <MicIcon style={{color: listening ? '#126ece' : '#919191'}} />
                        </div>
                    }

                    {text !== '' &&
                        <div className="chatwindow__btn" onClick={handleSendClick}>
                            <SendIcon />
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
}