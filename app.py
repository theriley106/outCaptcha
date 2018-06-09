from flask import Flask, render_template, request, url_for, redirect, Markup, jsonify, make_response, send_from_directory, session
import solveCaptcha

app = Flask(__name__, static_url_path='/static')


@app.route('/', methods=['POST'])
def index():
	print request.form
	url = request.form['url']
	apiKey = request.form['apiKey']
	solution = solveCaptcha.solveFromURL(url, apiKey)
	return solution

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000, debug=True, threaded=True)
