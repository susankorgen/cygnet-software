# Exercises - Timer Events, GUIs, Tkinter
# Handy desktop timer for the Pomodoro study method.
# Student/Solution Author: Susan Korgen
# Course: Day 28, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: September 9, 2021


from tkinter import *


PINK = "#e2979c"
RED = "#e7305b"
GREEN = "#9bdeac"
YELLOW = "#f7f5dd"
FONT_NAME = "Courier"
FONT_TIME = (FONT_NAME, 35, "bold")
FONT_TOP = (FONT_NAME, 50, "bold")
FONT_CHECK = (FONT_NAME, 18, "bold")
WORK_MIN = 25
SHORT_BREAK_MIN = 5
LONG_BREAK_MIN = 20
CHECK = "✓"
BULLET = "*"
TITLE_TEXT = "Pomodoro Method (F. Cirillo)"
START_TEXT = "Click Start"
START_TIME = "00:00"
reps = 0
timer = None


def reset_timer():
    """
    Reset timer and display to the beginning.
    """
    global reps
    global timer
    reps = 0
    window.after_cancel(timer)
    check_marks.config(text="")
    label_timer.config(text=START_TEXT, font=FONT_TOP, bg=YELLOW, fg=GREEN)
    canvas.itemconfig(timer_text, text=START_TIME)


def start_timer():
    """
    start_timer() calls count_down(), which calls start_timer(),
    creating a cycle. start_timer() updates the count of reps.
    At appropriate reps, call a long break, a short break,
    or return to work.
    """
    global reps
    reps += 1
    work_sec = WORK_MIN * 60
    short_break_sec = SHORT_BREAK_MIN * 60
    long_break_sec = LONG_BREAK_MIN * 60
    if reps % 8 == 0:
        label_timer.config(text="Long Break", font=FONT_TOP, bg=YELLOW, fg=RED)
        count_down(long_break_sec)
    elif reps % 2 == 0:
        label_timer.config(text="Short Break", font=FONT_TOP, bg=YELLOW, fg=PINK)
        count_down(short_break_sec)
    else:
        label_timer.config(text="Work", font=FONT_TOP, bg=YELLOW, fg=GREEN)
        count_down(work_sec)


def update_checks():
    """
    Call after start_timer() to update check mark display.
    After each work session, add a check mark.
    After each full cycle the includes both
    short and long breaks, add an asterisk.
    """
    global reps
    mark_text = check_marks["text"]
    if reps % 2 == 0:
        mark_text += CHECK
    if reps % 8 == 0:
        mark_text += BULLET
    check_marks.config(text=mark_text)


def count_down(count: int):
    """
    Count down by a number of seconds.
    """
    global timer
    if count > 0:
        count_min = count // 60
        count_sec = count % 60
        if count_min < 10:
            count_min = f"0{count_min}"
        if count_sec < 10:
            count_sec = f"0{count_sec}"
        count_text = f"{count_min}:{count_sec}"
        canvas.itemconfig(timer_text, text=count_text)
        timer = window.after(1000, count_down, count - 1)
    else:
        start_timer()
        update_checks()

# ---------------------------- UI SETUP ------------------------------- #


window = Tk()
window.title(TITLE_TEXT)
window.config(padx=100, pady=50, bg=YELLOW)

label_timer = Label(width=12, text=START_TEXT, font=FONT_TOP, bg=YELLOW, fg=GREEN)
label_timer.grid(row=0, column=1)

photo = PhotoImage(file="tomato.png")
canvas = Canvas(width=200, height=224, bg=YELLOW, highlightthickness=0)
canvas.create_image(100, 112, image=photo)
timer_text = canvas.create_text(100, 130, text=START_TIME, fill="white", font=FONT_TIME)
canvas.grid(row=1, column=1)

button_start = Button(text="Start", command=start_timer, highlightthickness=0)
button_start.grid(row=2, column=0)
button_reset = Button(text="Reset", command=reset_timer, highlightthickness=0)
button_reset.grid(row=2, column=2)

check_marks = Label(text="", font=FONT_CHECK, bg=YELLOW, fg=GREEN)
check_marks.grid(row=3, column=1)


# Keep window open.  Loop forever, and see if events occurred.
window.mainloop()
