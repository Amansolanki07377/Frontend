task = []

def load_tasks():
    try:
        with open("tasks.txt", "r") as file:
            for line in file:
                tasks.append(line.strip())
    except FileNotFoundError:
        pass
    def save_tasks():
        with open("tasks.txt", "w") as file:
            for task in task:
                file.write(task + "\n")


    def add_task():
        task =input("Enter a new task: ")
        task.append(task)
        save_tasks()
        print("task added successfully.")


    def view_tasks():
        if not task:
            print("No tasks in the list.")
            return
        print( "your tasks:")
        for i, task in enumerate(task, start=1):
            print(f"{i}. {task}")
            print()

    def delete_task():
        view_tasks()
        try:
            choice = int(input("Enter the task number to delete: "))
            remove_task = task.pop(choice - 1)
            save_tasks()
            print(f'Task "{remove_task}" deleted successfully.')
        except:
            print("Invalid task number.")

    def menu():
        load_tasks()
        while True:
            print("To-Do List Menu:")
            print("1. Add Task")
            print("2. View Tasks")
            print("3. Delete Task")
            print("4. Exit")
            choice = input("Choose an option (1-4): ")
            if choice == "1":
                add_task()
            elif choice == "2":
                view_tasks()
            elif choice == "3":
                delete_task()
            elif choice == "4":
                print("Exiting the to-do list application.")
                break
            else:
                print("Invalid choice. Please try again.")
    menu()
    