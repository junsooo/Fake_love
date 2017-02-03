#-*- coding: utf-8 -*-
from flask import Flask, request
from gtts import gTTS
import json
app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def hello():
    #Expected Form : text -> 'test_diary'
    if request.method == 'POST':
        data=request.form['text']
        
        #Tensorflow module
        #data=tenserflow()

        #Google TTS
        tts = gTTS(text=data, lang='ko')
        tts.save('banana.mp3')
        
        return data
    return '<form action="/echo" method="POST"><input name="text"><input type="submit" value="Echo"></form>'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5228)
