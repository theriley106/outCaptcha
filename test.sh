curl -X POST \
     -H "Authorization: Bearer "$(gcloud auth application-default print-access-token) \
     -H "Content-Type: application/json; charset=utf-8" \
     --data "{
  'config': {
    'encoding': 'FLAC',
    'sampleRateHertz': 16000,
    'languageCode': 'en-US',
    'enableWordTimeOffsets': false
  },
  'audio': {
    'content': '$(base64 output.flac | tr -d '\n')',
  }
}" "https://speech.googleapis.com/v1/speech:recognize"

