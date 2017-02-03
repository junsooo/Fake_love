#-*- coding: utf-8 -*-
from flask import Flask, request
app = Flask(__name__)

@app.route('/',methods=['GET','POST'])
def diary():
    if request.method == 'POST':
    #Expected JSON Format : '{"Diary": "난 네가 너무 좋아", "Title": "나의 그녀에게"}'
        data=request.get_json()
        print data
        return str(data)
    return "Hello, World!"

#PLUS WE NEED TENSOR FLOW MODULE 


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5228)
