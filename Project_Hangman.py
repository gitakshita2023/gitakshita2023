import random

stages = ['''
  +---+
  |   |
  0   |
 /|\  |
 / \  |
      |
=========
''', '''
  +---+
  |   |
  0   |
 /|\  |
 /    |
      |
=========
''', '''
  +---+
  |   |
  0   |
 /|\  |
      |
      |
=========
''', '''
  +---+
  |   |
  0   |
 /|   |
      |
      |
=========
''', '''
  +---+
  |   |
  0   |
  |   |
      |
      |
=========
''', '''
  +---+
  |   |
  0   |
      |
      |
      |
=========
''', '''
  +---+
  |   |
      |
      |
      |
      |
=========
''']

end_of_game = False
word_list = ["ardvark", "baboon", "camel"]
chosen_word = random.choice(word_list)
word_length = len(chosen_word)

# Total no. of lives
lives = 6

print(f"The solution is {chosen_word}.")


display = []
for _ in range(word_length):
    display += "_"


while not end_of_game:
    guess = input("Guess a letter: ").lower()

    # Check if the letter guessed = letter in chosen_word or not
    if guess in chosen_word:
        for position in range(word_length):
           letter = chosen_word[position]
           if letter == guess:
              display[position] = letter
        
    else:    
        lives -= 1
        if lives == 0:
            end_of_game = True
            print("You lose.")
            print(f"The word was {chosen_word}.")
            print(stages[lives])
            break

    #join all elements in the list and turn it into a string.
    print(f"{' '.join(display)}")

    if "_" not in display:
        end_of_game = True
        print("You Win.")

    #show stages of lives
    print(stages[lives])