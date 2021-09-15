# Exercise: Exceptions, Error Handling, JSON read/write
# Student/Solution Author: Susan Korgen
# Course: Day 30, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: September 15, 2021

from tkinter import *
from tkinter import messagebox
from random import choice, randint, shuffle
import json


FONT_LABEL = ("Arial", 11, "normal")
PREFERRED_EMAIL = "angela@gmail.com"
APP_TITLE = "Password Manager"
LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
           'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
           'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
           'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
SYMBOLS = ['!', '#', '$', '%', '&', '(', ')', '*', '+', ',', '.']


# ------------------------- PASSWORD GENERATOR ----------------------------- #


def new_password():
    """
    Generates a password and inserts it into the password field.
    The new password is in the clipboard so you can paste it.
    """
    new_pass = generate_password()
    entry_pass.delete(0, END)
    entry_pass.insert(0, new_pass)


def generate_password() -> str:
    """Returns a generated password between 12-18 characters long."""
    list_letters = [choice(LETTERS) for _ in range(randint(8, 10))]
    list_symbols = [choice(SYMBOLS) for _ in range(randint(2, 4))]
    list_numbers = [choice(NUMBERS) for _ in range(randint(2, 4))]
    password_list = [n for n in list_letters + list_symbols + list_numbers]
    shuffle(password_list)
    return "".join(password_list)


# ---------------------------- SAVE PASSWORD ------------------------------- #


def add_password():
    """
    Reads the website and password UI fields.
    Interacts with user to get good input.
    If confirmed, saves entry to a file.
    If an entry for that website exists,
    overwrites it.
    """
    website = entry_web.get()
    email = entry_email.get()
    password = entry_pass.get()
    if website == "" or email == "" or password == "":
        message = "Please don't leave any fields empty!"
        messagebox.showinfo(title=APP_TITLE, message=message)
    else:
        new_data = {
            website: {
                "email": email,
                "password": password,
            }
        }
        try:
            with open("data.json", "r") as data_file:
                data = json.load(data_file)
                data.update(new_data)
        except FileNotFoundError:
            data = new_data
        with open("data.json", "w") as data_file:
            json.dump(data, data_file, indent=4)
        entry_web.delete(0, END)
        entry_pass.delete(0, END)


# ---------------------------- FIND PASSWORD ------------------------------- #


def find_password():
    """
    Reads the website entry field in the UI.
    Searches for an existing entry for it.
    If found, reports the values.
    """
    website = entry_web.get()
    if website == "":
        message = "No website to search for."
        messagebox.showinfo(title=APP_TITLE, message=message)
    else:
        try:
            with open("data.json", "r") as data_file:
                data = json.load(data_file)
        except FileNotFoundError:
            message = "No data file found."
            messagebox.showinfo(title=APP_TITLE, message=message)
        else:
            if website in data:
                entry = data[website]
                message = f"Username: {entry['email']}\nPassword: {entry['password']}\n"
                messagebox.showinfo(title=website, message=message)
            else:
                message = "No entry found."
                messagebox.showinfo(title=APP_TITLE, message=message)


# -------------------------------- UI SETUP -------------------------------- #

# Window
window = Tk()
window.title()
window.minsize(width=400, height=300)
window.config(padx=50, pady=50, bg="white")

# Logo
photo = PhotoImage(file="logo.png")
canvas = Canvas(width=200, height=200, bg="white", highlightthickness=0)
canvas.create_image(100, 100, anchor=CENTER, image=photo)
canvas.grid(row=0, column=0, columnspan=3)

# Labels
label_web = Label(width=12, text="Website: ", font=FONT_LABEL, bg="white")
label_web.grid(row=1, column=0)
label_email = Label(width=12, text="Email/Username: ", font=FONT_LABEL, bg="white")
label_email.grid(row=2, column=0)
label_pass = Label(width=12, text="Password: ", font=FONT_LABEL, bg="white")
label_pass.grid(row=3, column=0)

# Entries
entry_web = Entry(width=26)
entry_web.grid(sticky=W, row=1, column=1)
entry_web.focus()
entry_email = Entry(width=46)
entry_email.grid(sticky=W, row=2, column=1, columnspan=2)
entry_email.insert(0, PREFERRED_EMAIL)
entry_pass = Entry(width=26)
entry_pass.grid(sticky=W, row=3, column=1)

# Buttons
button_search = Button(width=15, text="Search", command=find_password)
button_search.grid(sticky=W, row=1, column=2)
button_gen = Button(width=15, text="Generate Password", command=new_password)
button_gen.grid(sticky=W, row=3, column=2)
button_add = Button(width=38, text="Add", command=add_password)
button_add.grid(sticky=W, row=4, column=1, columnspan=2)

# Keep window open and listen for events.
window.mainloop()
