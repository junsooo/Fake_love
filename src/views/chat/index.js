import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import style from './style.css';

const Button = ({ content, code, current}) => (
    <button 
        className={code === current ? style.active : style.button}
        onClick={() => browserHistory.push(`/chat/${code}`)}>
        {content}
    </button>
)

const ChatItem = ({ author, message }) => (
    <div className={style.chat}>
        <div className={style.author}>
            {author}
        </div>
        <div className={style.message}>
            {message}
        </div>
    </div>
);

class Chat extends React.Component {
    constructor() {
        super();
        
        this.state = {
            chats: [],
            message: ''
        }
    }

    async onSubmit() {
        let { message } = this.state;

        const chats = this.state.chats;
        chats.push({
            author: '나',
            message: message
        });

        this.setState({
            chats: chats,
            message: ''
        });

        try {
            let response = await axios.post('http://localhost:8080/api/response', {
                message: this.state.message
            });

            chats.push({
                author: '여자친구',
                message: response.data
            });

            this.setState({
                chats: chats
            })

            const node = ReactDOM.findDOMNode(this.chatListBottom);
            node.scrollIntoView({ behavior: 'smooth' });
        } catch (e) {
            chats.splice(-1, 1);
            this.setState({
                chats: chats,
                message: message
            });
        }
    }

    render() {
        const { mode } = this.props.params;
        const { chats } = this.state;

        return (
            <div className={style.flex}>
                <div className={style.wrap}>
                    <div className={style.book}>
                        <img src="/images/book.png" />
                    </div>
                    <div className={style.smallWrap}>
                        <div className={style.buttons}>
                            <Button content="친구" code="friend" current={mode} />
                            <Button content="츤데레" code="tsundere" current={mode} />
                            <Button content="오글" code="ogul" current={mode} />
                        </div>
                        <div className={style.chats}>
                            <div className={style.chatList}
                                ref={(div) => this.chatList = div}>
                                {chats.map(({ author, message }, i) => (
                                    <ChatItem author={author} message={message} key={i} />
                                ))}
                                <div ref={(div) => this.chatListBottom = div} />
                            </div>
                            <div className={style.inputs}>
                                <input
                                    type="text"
                                    className={style.input}
                                    value={this.state.message}
                                    onKeyPress={(event) => event.charCode == 13 && this.onSubmit()}
                                    onChange={(event) => this.setState({ message: event.target.value })} />
                                <button
                                    className={style.submitBtn}
                                    onClick={() => this.onSubmit()}>
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;