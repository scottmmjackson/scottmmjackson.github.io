Boggle Solution
---------------

Requirements:

Python
NodeJS
mustache (`npm install -g mustache`)
http-server (or some other static serving solution)

Installation:
- Clone repo
- Fetch new wordlist if needed
- `python process_words.py <wordlist> > web.json` (web2.txt is included)
- `mustache index.mustache` 
