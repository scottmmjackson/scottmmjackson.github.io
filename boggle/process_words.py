import sys
from json import dumps
from itertools import groupby

inp = open(sys.argv[1])

# Generator that yields all words between 3-8 characters from dictionary list, lowercased
words = (word.lower().rstrip() for word in inp.readlines() if (len(word) >= 3 and len(word) <= 8))

def group_recursive(m_words):
  if not m_words:
   return {"!": True}
  return {k:group_recursive([j[1:] for j in g if j[1:]]) for k,g in groupby(m_words,key=lambda word: word[0])}

print "var DICT = {}".format(dumps(group_recursive(words)))
