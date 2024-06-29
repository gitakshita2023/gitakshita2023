student_scores = input("Enter the score of each student separated by space: ").split()
for n in range(0,len(student_scores)):
    student_scores[n] = int(student_scores[n])

heighest_score = 0
for score in student_scores:
  if score > heighest_score:
    heighest_score = score

print(f"Heighest Score in class = {heighest_score}")