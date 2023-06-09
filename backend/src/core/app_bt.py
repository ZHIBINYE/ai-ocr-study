# coding: utf-8
import easyocr
from gtts import gTTS




def file_upload():
    reader = easyocr.Reader(['ja','en']) # this needs to run only once to load the model into memory
    results = reader.readtext('test.png', detail = 0)
    print(results)
    message = "".join(results)
    tts1 = gTTS(text=message, lang='ja')
    tts1.save("test.mp3")

if __name__ == "__main__":
    file_upload()
