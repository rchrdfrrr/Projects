#===================================#
#getting input and writing the input in a file
# name = input("What's your name? ")

# with open("names.txt", "a") as file:
#     file.write(f"{name}\n")
#===================================#

#===================================#
#reading the content of the files
# with open("names.txt", "r") as file:
#     lines = file.readlines()

# for line in lines:
#     print("hello,", line.rstrip())
#===================================#

#===================================#
#more compact coding but you can't sort before printing it out
# with open("names.txt", "r") as file:
#     for line in file:
#         print("hello,", line.rstrip())
#===================================#

#===================================#
# names = []

# with open("names.txt") as file: #you can disregard putting "r" as it is a default when you open a file to read it
#     for line in file:
#         names.append(line.rstrip())
# #need to load first into memory before sorting them
# for name in sorted(names): #sorted asc by default
#     print(f"hello, {name}")
#===================================#

#===================================#
with open("names.txt") as file:
    for line in sorted(file):
        print(f"hello, {line.rstrip()}")
