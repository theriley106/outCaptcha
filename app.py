from flask import Flask, render_template, request, url_for, redirect, Markup, jsonify, make_response, send_from_directory, session
import solveCaptcha
app = Flask(__name__, static_url_path='/static')


@app.route('/', methods=['POST'])
def index():
	print request.form
	print request.form['url']
	a = solveCaptcha.solveFromURL(request.form['url'])
	return a

@app.route('/test', methods=['GET'])
def testPage():
	return render_template("index1.html")

if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000, debug=True)
