#-*- coding: utf-8 -*-
import sys
sys.path.append('./chatbot')
#sys.path.append('./chatbot/data')
from chat import *
from flask import Flask, request, send_from_directory
from flask.ext.cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

chatbot = ChatBot(FLAGS.voc_path, FLAGS.train_dir)

@app.route("/",methods=['GET','POST'])
@cross_origin()
def server():
    if request.method == 'POST':
        real_data=request.form['message'].encode('utf-8')
        print "Request data : " +real_data
        #Tensorflow module
        real_data = chatbot.run(real_data)
        print "Response data : " +real_data
        return real_data
    return '<form action="/" method="POST"><input name="message"><input type="submit" value="Echo"></form>'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5230)
