import React from 'react';
import moment from 'moment';

import style from './style.css';

import ChatBox from './components/chatBox';

class Diary extends React.Component {
    constructor() {
        super();

        this.state = {
            content: ''
        };

        this.onContentChanged = this.onContentChanged.bind(this);
    }

    onContentChanged(event) {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h1 className={style.heading}>
                    {moment().format("M월 D일")} 오늘의 일기
                </h1>
                <p className={style.paragraph}>
                    오늘 어떤 하루를 보내셨나요? 일기를 작성하시면, 저희 여자친구가 자연스럽게 답변해 드립니다!
                </p>
                <ChatBox />
            </div>
        );
    }
}

export default Diary;