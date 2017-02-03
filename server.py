#-*- coding: utf-8 -*-
from flask import Flask, request, send_from_directory
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
        tts.save('uploads/text.mp3')
        #mimetype = audio/mp3
        print 
        return send_from_directory('uploads/','text.mp3',as_attachment=True,mimetype='audio/mp3')
    return '<form action="/" method="POST"><input name="text"><input type="submit" value="Echo"></form>'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5228)
