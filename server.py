#-*- coding: utf-8 -*-
from flask import Flask, request
import json
app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def hello():
    #Expected Form : text -> 'test_diary'
    if request.method == 'POST':
        data=request.form['text']
        #PLUS WE NEED TENSOR FLOW MODULE + NAVER_TTS
        #data=tenserflow()
        return data
    return '<form action="/echo" method="POST"><input name="text"><input type="submit" value="Echo"></form>'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5228)
