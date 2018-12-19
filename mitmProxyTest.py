from mitmproxy import http
from urllib import parse


def request(flow):
	print(flow.request.url)
	'''if "https://example.com" in flow.request.url:
					newUrl = parse.urlsplit(flow.request.url).query
					#a = dict(parse.parse_qsl(parse.urlsplit(flow.request.url).query))
					#print(a)
					flow.request.url = "http://127.0.0.1:5000/?" + newUrl'''
