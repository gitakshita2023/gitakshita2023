target = int(input("Enter no between 0 & 1000: "))

sum =0
for number in range(1,target+1):
    if number % 2 == 0:
        sum += number
print(sum)