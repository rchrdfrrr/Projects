import sys

# try:
#     print("Ang pogi mo", sys.argv[1])
# except IndexError:
#     print("Too few arguments")

# if len(sys.argv) < 2:
#     print("Too few arguments")
# elif len(sys.argv) > 2:
#     print("Too many arugments")
# else:
#     print("Ang pogi mo", sys.argv[1])

# if len(sys.argv) < 2:
#     sys.exit("Too few arguments")
# elif len(sys.argv) > 2:
#     sys.exit("Too many arugments")

# print("Ang pogi mo", sys.argv[1])

# if len(sys.argv) < 2:
#     sys.exit("Too few arguments")

# for arg in sys.argv:
#     print("Ang pogi mo", arg)

if len(sys.argv) < 2:
    sys.exit("Too few arguments")

for arg in sys.argv[1:]: #starts at element/location 1, not 0 and the colon
                        #and blank means the rest of the list
    print("hello, my name is", arg)


