import { Avatar } from '@material-ui/core'
import '../css/sidebarChat.css';
import { React, useState, useEffect } from 'react';
import db from '../firebase';
import { Link } from 'react-router-dom';

const createChat = () => {
    const roomname = prompt('enter a room name for the chat...');
    // do some clever database stuff....
    db.collection('rooms').add({
        name: roomname
    });
}

function SidebarChat({ addNewChat, id, name }) {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(id) {
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot =>(
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h3>{name}</h3>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) :
    (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new chat</h2>
        </div>
    );
}

export default SidebarChat
