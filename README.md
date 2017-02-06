# Fake_love

가상의 여자친구와 대화를 할 수 있는 웹 앱입니다.<br> 
여자친구는 현재 2가지 타입으로 츤데레, 친구 컨셉이 있습니다. 오글거림, 다정함 컨셉을 추가할 예정입니다.<br>
이 봇은 기계학습을 통해 문서를 읽고 사람처럼 행동할 수 있습니다.

## Dependencies

* TensorFlow for Python 2
* Python Flask
* Flask-cors
* Plz add other dependencies

## Getting Started<br>

**친구 컨셉**

```
git clone https://github.com/junsooo/Fake_love.git   
cd Fake_love/chatbot   
python server.py
```
이후 http://0.0.0.0:5230 에서 테스트가 가능합니다.
<br><br>
**츤데레 컨셉**
<br><br>
Data 폴더 내부의 chat_chun.log와 chat_chun.voc 파일을 chat.log와 chat.voc로 바꾼 후에 실행을 시키면 됩니다.
<br>
## How to Add new model?
```
cd Fake_love/chatbot
python dialog.py --voc_build
python train.py --train
```

**주의 : dialog.py를 실행시켜 생성되는 chat.voc파일이 164줄이 되지 않으면 training이 실패하게 됩니다.**


## Reference
* Seq2Seq

## Presentation<br>
Presentation is available at <br>http://www.slideshare.net/ssuser9befac/2017-17-fake-love
<br><br>
Thanks to __숙명여대 황희영__ for design
