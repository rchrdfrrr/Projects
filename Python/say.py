import sys

from sayings import hello, goodbye

if len(sys.argv) > 1:
    hello(sys.argv[1])
    goodbye(sys.argv[1])