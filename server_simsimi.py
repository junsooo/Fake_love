#-*- coding: utf-8 -*-
from flask import Flask, request, send_from_directory
from gtts import gTTS
import json
import urllib
import requests
app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def hello():
    #Expected Form : text -> 'test_diary'
    if request.method == 'POST':
        data=request.form['text']
        #Tensorflow module
        #data=tenserflow()
        url = 'http://sandbox.api.simsimi.com/request.p?key=72baaeb3-1bc1-41d1-8010-f9624f2e3e2b&lc=ko&ft=1.0&text='+data
        res_json = requests.get(url).json()
        #Google TTS
        res_data = res_json['response']
        tts = gTTS(text=res_data, lang='ko')
        tts.save('uploads/banana.mp3')
        return res_data

        #return send_from_directory('uploads/','banana.mp3',as_attachment=True,mimetype='audio/mp3')
    return '<form action="/" method="POST"><input name="text"><input type="submit" value="Echo"></form>'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5228)
