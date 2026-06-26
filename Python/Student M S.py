Students = {}


def add_student():
    name = input("Enter student name : ")
    roll_no = input("Enter student roll no : ")
    marks = int(input("Enter student marks : "))

    Students[roll_no] = {"name": name, "marks": marks}
    print("✅ Student added successfully\n")



def view_students():
    if not Students:
        print(" No students found\n")
        return

    print("\n--- Student List ---")
    for roll_no, data in Students.items():
        print(f"Roll No: {roll_no} | Name: {data['name']} | Marks: {data['marks']}")
    print()



def search_student():
    roll_no = input("Enter student roll no to search : ")

    if roll_no in Students:
        data = Students[roll_no]
        print(f"✅ Student Found → Name: {data['name']}, Marks: {data['marks']}\n")
    else:
        print(" Student not found\n")

def update_student():
    roll_no = input("Enter roll no to update : ")

    if roll_no in Students:
        name = input("Enter new name : ")
        reminder = int(input("Enter new marks : "))
        Students[roll_no] = {"name": name, "marks": reminder}
        print("✅ Student updated successfully\n")
    else:
        print(" Student not found\n")


def delete_student():
    roll_no = input("Enter roll no to delete : ")

    if roll_no in Students:
        del Students[roll_no]
        print(" Student deleted successfully\n")
    else:
        print(" Student not found\n")


def save_file():
    with open("students.txt", "w") as file:
        for roll_no, data in Students.items():
            file.write(f"{roll_no},{data['name']},{data['marks']}\n")
    print(" Data saved to file\n")



def load_file():
    try:
        with open("students.txt", "r") as file:
            for line in file:
                roll_no, name, marks = line.strip().split(",")
                Students[roll_no] = {
                    "name": name,
                    "marks": int(marks)
                }
        print("Data loaded from file\n")
    except FileNotFoundError:
        print(" File not found\n")

load_file()  

def Topper_students():
    if not Students:
        print("No students found\n")
        return

    Topper = max(Students.items(), key=lambda x: x[1]["marks"])
    print(f"🏆 Topper Student → Name: {Topper[1]['name']}, Marks: {Topper[1]['marks']}\n")



while True:
    print("===== Student Management System =====")
    print("1. Add Student")
    print("2. View Students")
    print("3. Search Student")
    print("4. Update Student")
    print("5. Delete Student")
    print("6. Save Student File")
    print("7. Topper Student")
    print("8. Exit")

    choice = input("Enter your choice : ")

    if choice == "1":
        add_student()
    elif choice == "2":
        view_students()
    elif choice == "3":
        search_student()
    elif choice == "4":
        update_student()
    elif choice == "5":
        delete_student()
    elif choice == "6":
        save_file()
    elif choice == "7":
        Topper_students()
    elif choice == "8":
        print("👋 Exiting program...")
        break
    else:
        print("❌ Invalid choice. Try again\n")