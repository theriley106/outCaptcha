#!/bin/bash
# This is not an official Google product.
# Copyright 2016 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.



# Example of how to call the Google Cloud Speech API from the command line.
# Creates a request-9999.json file with contents of the API request.

# Usage:
# English: ./speech_api.sh
# Spanish: ./speech_api.sh es

# Prerequisites:
#  - Sox installed ($ brew install sox --with-flac)
#  - Google Cloud Platform API Key (https://console.cloud.google.com/apis/credentials)
#  - Google Cloud Speech API enabled (https://console.cloud.google.com/apis/api/speech.googleapis.com/overview)

API_KEY='API_KEY'

# Create a request file with our JSON request in the current directory.
FILENAME="request-"`date +"%s".json`
cat <<EOF > $FILENAME
{
  "config": {
    "encoding":"FLAC",
    "sampleRate":16000,
    "maxAlternatives": 3,
    "languageCode": "en-US",
    "speechContext": {
      "phrases": [
        "DevFest"
      ]
    }
  },
  "audio": {
    "content":
  }
}
EOF

# Update the languageCode parameter if one was supplied
if [ $# -eq 1 ]
  then
    sed -i '' -e "s/en-US/$1/g" $FILENAME
fi

# Record an audio file, base64 encode it, and update our request object
read -p "Press enter when you're ready to record" rec
if [ -z $rec ]; then
  rec --channels=1 --bits=16 --rate=16000 audio.flac trim 0 5
  echo \"`base64 audio.flac`\" > audio.base64
  sed -i '' -e '/"content":/r audio.base64' $FILENAME
fi
echo Request "file" $FILENAME created:
head -8 $FILENAME # Don't print the entire file because there's a giant base64 string
echo $'\t"Your base64 string..."\n\x20\x20}\n}'

# Call the speech API
read -p $'\nPress enter when you\'re ready to call the Speech API' var
if [ -z $var ];
  then
    echo "Running the following curl command:"
    echo "curl -s -X POST -H 'Content-Type: application/json' --data-binary @${FILENAME} https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=API_KEY"
    curl -s -X POST -H "Content-Type: application/json" --data-binary @${FILENAME} https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=$API_KEY
fi
