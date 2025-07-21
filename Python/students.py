#==========================================================================#
# with open("students.csv") as file:
#     for line in file:
#         row = line.rstrip().split(",")
#         print(f"{row[0]} is in {row[1]}")
#==========================================================================#


#==========================================================================#
# #you can unpack the list into variables instead making it name & house
# with open("students.csv") as file:
#     for line in file:
#         name, house = line.rstrip().split(",")
#         print(f"{name} is in {house}")
#==========================================================================#

#==========================================================================#
#you can make the pairs in the list into a dictionary inside of the list instead 
#and use a function to get the value from dict. using its key to pass it to the 
# sorted function to be able to sort them by either name or house

# students = []

# with open("students.csv") as file:
#     for line in file:
#         name, house = line.rstrip().split(",")
#         student = {"name": name, "house": house}
#         students.append(student)

# def get_name(student):
#     return student["name"]

# for student in sorted(students, key= get_name, reverse = True ): 
#     print(f"{student["name"]} is in {student["house"]}")
#==========================================================================#

#==========================================================================#
#you can use lambda ( an anonymous function)
# students = []

# with open("students.csv") as file:
#     for line in file:
#         name, house = line.rstrip().split(",")
#         student = {"name": name, "house": house}
#         students.append(student)

# for student in sorted(students, key= lambda student: student["name"]): 
#     print(f"{student["name"]} is in {student["house"]}")
#==========================================================================#

#==========================================================================#
# info= input("What's your name and where is your home?: ")
# with open("students_home.csv", "a") as file:
#     file.write(f"{info}\n")

students = []

with open("students_home.csv") as file:
    for line in file:
        name, home = line.rstrip().split(",")
        student = {"name": name, "home": home}
        students.append(student)

for student in sorted(students, key = lambda student: student["home"]):
    print(f"{student["name"]} is from {student["home"]}")