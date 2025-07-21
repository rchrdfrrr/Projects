def water():
    thirsty = print("Slurp! ")
    return thirsty

def main():
    question = input("Are you thirsty? (yes/no) ")
    if question.lower() == "yes":
        water()
    else:
        print("Okay, maybe later.")

if __name__ == "__main__":
    main()
    
    