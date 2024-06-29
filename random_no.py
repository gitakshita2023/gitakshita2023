import random

random_intrger = random.randint(1,10)
print(random_intrger)

#returns decimal value b/w 0.0 and 1.0
random_float = random.random()
print(random_float)

#returns decimal value b/w 0.0 and 5.0
random_float1 = random.random() * 5
print(random_float1)

love_score = random.randint(1,100)
print(f"Your love score is {love_score}.")