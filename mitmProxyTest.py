from mitmproxy import http
from urllib import parse


def request(flow):
	if "https://translate.google.com/translate_tts?" in flow.request.url:
		for i in range(50):
			print("AYYYYO")
		print(flow.request.url)
	if "https://www.google.com/recaptcha/api2/payload?" in flow.request.url:
		for i in range(50):
			print("AYYYYO")
		print(flow.request.url)
