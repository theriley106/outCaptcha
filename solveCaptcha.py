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

def solveFromURL(url, apiKey):
	try:
		saveMP3(url, 'newAudio.mp3')
		os.system("ffmpeg -y -i newAudio.mp3 -ac 1 output.flac")
		base64Val = encode_audio(open("output.flac"))
		genRequest(base64Val)
		os.system('curl -X POST -H "Content-Type: application/json; charset=utf-8" --data @sync-request.json "https://speech.googleapis.com/v1/speech:recognize?key={}" -o result.json'.format(apiKey))
		a = json.load(open('result.json'))
		if "API key not valid" in str(a):
			return "INVALID_API_KEY"
		print a
		transcript = a['results'][0]['alternatives'][0]["transcript"]
		print("Solved: {}".format(transcript))
		return transcript
	except:
		return "UNKNOWN_ERROR"


if __name__ == '__main__':
	pass
