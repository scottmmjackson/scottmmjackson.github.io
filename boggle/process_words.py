import sys
from json import dumps
from itertools import groupby

inp = open(sys.argv[1])

# Generator that yields all words between 3-8 characters from dictionary list, lowercased
words = (word.lower().rstrip() for word in inp.readlines() if (len(word) >= 4 and len(word) <= 9))

def group_recursive(m_words):
  if not m_words:
   return {"!": True}
  return {k:group_recursive([j[1:] if j[1:] else '' for j in g]) if k != '!' else True for k,g in groupby(m_words,key=lambda word: word[0] if word else '!')}

print "var DICT = {}".format(dumps(group_recursive(words)))
