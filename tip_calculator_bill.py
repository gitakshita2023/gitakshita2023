#If the bill was $150.00, split between 5 people, with 12% tip. 
#Each person should pay (150.00 / 5) * 1.12 = 33.6
#Round the result to 2 decimal places.
print("Welcome to the tip calculator!")
bill = float(input("What was the total bill? $"))
tip = int(input("How much tip (in %) would you like to give? 10, 12, or 15? "))
people = int(input("How many people to split the bill?"))
total_bill_with_tip = tip/100 *bill + bill
bill_per_person = total_bill_with_tip / people
final_amt = round(bill_per_person, 2)
final_amt = "{:.2f}".format(bill_per_person)
print(f"Each person should pay: ${final_amt}")