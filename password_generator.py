#Password Generator Project
import random

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
numbers = ['0','1','2','3','4','5','6','7','8','9']
symbols = ['!','#','$','%','&','(',')','*','+']

print("Welcome to the PyPassword Generator!")
nr_letters = int(input("How many letters would you like in your password?\n"))
nr_symbols = int(input("How many symbols would you like?\n"))
nr_numbers = int(input("How many numbers would you like?\n"))

#Eazy Level  // to get password in sequence like pehle letters then symbols and then numbers
# eg. fghf^&23

Password = ""

for char in range(1, nr_letters+1):
    Password += random.choice(letters)

for char in range(1, nr_symbols+1):
    Password += random.choice(symbols)

for char in range(1, nr_numbers+1):
    Password += random.choice(numbers)

print(Password)

#Hard Level // to get password in random order
# eg. g^2jk8&

Password_list = []

for char in range(1, nr_letters+1):
    Password_list.append(random.choice(letters))

for char in range(1, nr_symbols+1):
    Password_list += random.choice(symbols)

for char in range(1, nr_numbers+1):
    Password_list += random.choice(numbers)

random.shuffle(Password_list)

# To convert password in string

Password = ""
for char in Password_list:
    Password += char

print(f"Your password is: {Password}")