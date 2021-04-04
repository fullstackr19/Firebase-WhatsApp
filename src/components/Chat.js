import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic, SendRounded } from '@material-ui/icons';
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import db from '../firebase';
import firebase from 'firebase';
import '../css/Chat.css';

function Chat() {
    
    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [{user}, dispatch] = useStateValue();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    return (
        <div className="Chat">
            <div className="Chat__header">
                    <div className="Chat__headerLeft">
                        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                        <div className="Chat__headerInfo">
                            <h3>{roomName}</h3>
                            <p>Last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                        </div>
                    </div>
                <div className="Chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="Chat__body">
                    {messages.map((message) => (
                        <p className={`Chat__message ${message.name === user.displayName && "Chat__reciever"}`}>
                            <span className="Chat__name">{message.name}</span>
                            {message.message}
                            <span className="Chat__timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                    ))}
            </div>
            <div className="Chat__footer">
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message here..."/>
                    <button type="submit" onClick={sendMessage} className="send-btn">
                        <SendRounded/>
                    </button>
                </form>
                <IconButton>
                    <Mic/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat;
