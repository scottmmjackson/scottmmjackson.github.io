Boggle Solution
---------------

Requirements:

Python
NodeJS
http-server (or some other static serving solution)
babel (for compiling node prototype to angular controller ES5)
pug (jade)
bower (for fetching angular dependency)
a newline-separated dictionary of words (for a new dictionary)

Installation:
- Clone repo
- Serve

Changes
- New dictionary trie: `python process_words.py <wordlist> > web.js` (web2.txt is included)
- Compiling jade: `pug index.jade`
- Compiling ES6: `babel --preset es2015 solver.js`
- Testing: `hs` (in toplevel directory)
