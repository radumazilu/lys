# Imports
from bs4 import BeautifulSoup
import urllib.request
from mercury_parser.client import MercuryParser
import webbrowser # for opening the link in a browser window
import requests
from translation import translate
import sys
from goose3 import Goose

def scrape_content(link):
    '''
    Tries to scrape using MercuryParser, as this gave the best performance.
    If an error is returned by MercuryParser, BeautifulSoup is used for scraping
    '''
    try:
        try:
            # Scraped using python goose
            text = goose_scraper(link)
        except:
            # Scraped using MercuryParser
            text = mercury_scraper(link)
    except:
        # MercuryParser returned an error.
        # We will use BeautifulSoup as an alternative.
        # Scraped using BeautifulSoups
        text = soup_scraper(link)

    print(text)
    return text

def goose_scraper(link):
    '''
    Returns cleaned text using the python goose3 api
    '''
    g = Goose()
    article = g.extract(link)
    return article.cleaned_text

def mercury_scraper(link):
    '''
    Returns the 'content' field of the json object returned by the
    MercuryParser api
    '''

    USER_AGENT = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
        }

    if not link.lower().endswith('.pdf'):

        access_granted = requests.get(link, headers=USER_AGENT).status_code == 200
        if access_granted:
            parser = MercuryParser(api_key='ETkLjaGuTmB4FF0eQxWwPwUNjIeJwTDOJhKgigYA')

            article = parser.parse_article(link)
            text = article.json()['content']

            # MercuryParser still returns the html tag
            # we use BeautifulSoup to strip those
            soup = BeautifulSoup(text, 'html.parser')
            content = soup.get_text()

            return content

    else:
        return "PDF file can't be accessed at this time."

def soup_scraper(link):
    '''
    Takes the html content of the webpage at 'link' and parses the html tags
    using BeautifulSoup
    '''

    # grab the page html using urllib.request
    html_content = urllib.request.urlopen(link).read()

    # parse the html using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # eliminate all script and style elements
    for script in soup(["script", "style"]):
        script.extract()

    # get text
    text = soup.get_text()

    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())

    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))

    # drop blank lines
    content = '\n\n'.join(chunk for chunk in chunks if chunk)

    return content

# Start process
if __name__ == '__main__':
    link = str(sys.argv[1])
    scrape_content(link)
