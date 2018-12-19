#!/usr/bin/python
from selenium import webdriver
import os
import time
dir_path = os.path.dirname(os.path.realpath(__file__))

PROXY = "127.0.0.1:8084"
print("Started browser")
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--proxy-server=%s' % PROXY)
chrome_options.add_argument("user-data-dir=selenium")

chrome = webdriver.Chrome(chrome_options=chrome_options)
chrome.get("http://google.com")
while True:
	time.sleep(99999)
