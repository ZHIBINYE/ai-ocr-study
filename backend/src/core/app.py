# coding: utf-8
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import easyocr
from gtts import gTTS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "<p>Hello world!</p>"


@app.route("/api/img/ul", methods=["POST"])
def file_upload():
    file = request.files['image']
    print(file.filename)
    file.save("test.png")
    reader = easyocr.Reader(['ja','en']) # this needs to run only once to load the model into memory
    results = reader.readtext('test.png', detail = 0)
    print(results)
    message = "".join(results)
    tts1 = gTTS(text=message, lang='ja')
    tts1.save("test.mp3")
    return send_file("../../test.mp3")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
