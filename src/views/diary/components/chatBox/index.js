import React from 'react';
import axios from 'axios';
import qs from 'qs';

import style from './style.css';

const Chat = ({ author, message }) => (
    <div className={style.chatWrap}>
        <div className={style.author}>
            {author}
        </div>
        <div className={style.message}>
            {message}
        </div>
    </div>
)

class ChatBox extends React.Component {
    constructor() {
        super();

        this.state = {
            text: '',
            chats: []
        }
    }

    async onSubmit() {
        const chats = this.state.chats;
        chats.push({
            author: '나',
            message: this.state.text
        });

        this.setState({
            chats: chats
        });

        try {
            let response = await axios.post('http://localhost:8080/api/response', {
                message: this.state.text
            });

            chats.push({
                author: '여자친구',
                message: response
            })

            this.setState({
                text: ''
            });

            console.log(response);
        } catch (e) {
            chats.splice(-1, 1);
            this.setState({
                chats: chats
            });
        }
    }

    render() {
        const { chats } = this.state;

        return (
            <div className={style.wrap}>
                <div className={style.chatBox}>
                    {chats.map(({ author, message }, i) => (
                        <Chat author={author} message={message} key={i} />
                    ))}
                </div>
                <div className={style.inputBox}>
                    <input 
                        type="text"
                        value={this.state.text}
                        onChange={(event) => this.setState({ text: event.target.value })} />
                    <button onClick={() => this.onSubmit()}>
                        보내기
                    </button>
                </div>
            </div>
        );
    }
}

export default ChatBox;