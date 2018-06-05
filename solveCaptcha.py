# Import the base64 encoding library.
import base64
import os
import json
import requests
import time
# Pass the audio data to an encoding function.
def encode_audio(audio):
	audio_content = audio.read()
	return base64.b64encode(audio_content)

def saveMP3(mp3URL, fileName):
	#return MP3 file name
	mp3File = '{}'.format(fileName)
	#calls it a random file name to later delete
	with open(mp3File, 'wb') as f:
		#this saves the response locally as an actual mp3 file
		f.write(requests.get(mp3URL).content)
	return mp3File

def genRequest(base64Val):
	temp = {}
	temp['config'] = {"encoding": "FLAC", "language_code": "en-US", "enableWordTimeOffsets": True}
	temp['audio'] = {"content": base64Val}


	with open('sync-request.json', 'w') as fp:
		json.dump(temp, fp)

def generateURL(keyWords, region='en'):
	# This generates the GOOGLE TRANSLATE URL
	keyWords = keyWords.replace(" ", "%20")
	# Google translate url doesn't have a space
	return "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q={}&tl={}".format(keyWords, region)

def solveFromURL(url):
	saveMP3(url, 'newAudio.mp3')
	os.system("ffmpeg -y -i newAudio.mp3 -ac 1 output.flac")
	base64Val = encode_audio(open("output.flac"))
	genRequest(base64Val)
	os.system('curl -X POST -H "Content-Type: application/json; charset=utf-8" --data @sync-request.json "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBw_WHIlxqHILGy6hDnArgKKq_Oz5wJmAk" -o result.json')
	a = json.load(open('result.json'))
	print a
	transcript = a['results'][0]['alternatives'][0]["transcript"]
	print("Solved: {}".format(transcript))
	return transcript


if __name__ == '__main__':
	#saveMP3(generateURL('hello this actually works properly somehow'), 'newAudio.mp3')
	#os.system("sox newAudio.mp3 translate_ttsz.mp3 pad .5 0")
	#os.system("mv translate_ttsz.mp3 newAudio.mp3")
	os.system("ffmpeg -y -i test2.mp3 -ac 1 output.flac")
	base64Val = encode_audio(open("output.flac"))
	genRequest(base64Val)
	os.system('curl -X POST -H "Content-Type: application/json; charset=utf-8" --data @sync-request.json "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyBw_WHIlxqHILGy6hDnArgKKq_Oz5wJmAk" -o result.json')
	a = json.load(open('result.json'))
	transcript = a['results'][0]['alternatives'][0]["transcript"]
	print transcript

	#os.system('curl -s -X POST -H "Content-Type: application/json" --data-binary @sync-request.json "https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=AIzaSyBw_WHIlxqHILGy6hDnArgKKq_Oz5wJmAk"')


#base64 output.flac -w 0 > audio.base64
