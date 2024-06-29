import random

# Define the names string
names_string = "Alice, Bob, Charlie, Diana, Eve"

# Split the names string into a list of names
names = names_string.split(", ")

import random

#Total no. of items
num_items = len(names)
#Generate random number between zero and last index
random_choice = random.randint(0,num_items-1)
#Choose and print a random name
print(f"{names[random_choice]} is going to buy the meal today!")