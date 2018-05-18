# Imports
from textblob import TextBlob

def check_language(text):
    '''
    Checks the language of the first 100 characters for time efficiency.
    '''
    blob = TextBlob(text[0:100])
    return blob.detect_language()

def translate(text):
    '''
    Translates text only if it is not in English
    '''
    if check_language(text) != 'en':
        blob = TextBlob(text)
        return str(blob.translate(to='en'))
    else:
        return text
