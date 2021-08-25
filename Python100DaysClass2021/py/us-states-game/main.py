import turtle
import pandas as pd


IMAGE = "blank_states_img.gif"
INPUT = "50_states.csv"
KNOWN_STATES = "known_states.csv"
HEADERS = ["state", "x", "y"]
TITLE = "U.S. States Game"
PROMPT = "What's another state's name?"
STATE_COUNT = 50
FONT_BIG = ("Arial", 20, "normal")
FONT_MEDIUM = ("Arial", 10, "normal")
FONT_SMALL = ("Arial", 6, "normal")
CENTER = "center"


def write_state(name: str, df: pd.DataFrame):
    """Write state name on background image."""
    state_data = df[df.state == name]
    writer.goto(int(state_data.x), int(state_data.y))
    writer.write(f"{name}", font=FONT_SMALL)


def write_state_list(y: int, state_list: list):
    """Write a list of state names in top or bottom margin. Fit within screen."""
    index = 0
    while index < len(state_list):
        new_index = index + 8
        writer.goto(0, y)
        if new_index >= len(state_list):
            writer.write(f"{state_list[index:]}", align=CENTER, font=FONT_MEDIUM)
        else:
            writer.write(f"{state_list[index:new_index]}", align=CENTER, font=FONT_MEDIUM)
        index = new_index
        y -= 12


# Create game background using GIF image.
screen = turtle.Screen()
screen.title(TITLE)
screen.addshape(IMAGE)
turtle.shape(IMAGE)

# Initialize text writer.
writer = turtle.Turtle()
writer.speed("fastest")
writer.hideturtle()
writer.penup()

# Get state data.
data = pd.read_csv(INPUT)
states = data.state.to_list()

# Get and display previous results.
correct_answers = 0
try:
    guessed = pd.read_csv(KNOWN_STATES)
    guessed_states = guessed.state.to_list()
    correct_answers = len(guessed_states)
    for state in guessed_states:
        write_state(state, guessed)
except FileNotFoundError:
    guessed = pd.DataFrame()
    guessed_states = []

# Initialize the game.
game_is_on = False
if correct_answers < STATE_COUNT:
    game_is_on = True

# Play the game.
while game_is_on:
    got_it = False
    answer = screen.textinput(title=f"{correct_answers}/{STATE_COUNT} States Correct", prompt=PROMPT)
    answer = answer.title()
    if answer == "Exit":
        break
    if answer not in guessed_states and answer in states:
        write_state(answer, data)
        correct_answers += 1
        guessed_states.append(answer)
    game_is_on = correct_answers < STATE_COUNT

# Show results of the game.
writer.goto(0, 370)
writer.write(f"Good job! Got {correct_answers}/{STATE_COUNT} states right.", align=CENTER, font=FONT_BIG)
write_state_list(350, guessed_states)

# Find the missed states.
missed_states = [state for state in states if state not in guessed_states]

# Show states that need review.
if correct_answers < STATE_COUNT:
    writer.goto(0, -300)
    writer.write("Need to learn these states:", align=CENTER, font=FONT_BIG)
    y_pos = -320
    write_state_list(y_pos, missed_states)

# Output the states that were guessed already.
guess_rows = []
for guess in guessed_states:
    gd = data[data.state == guess].index
    guess_rows.append([data.at[gd[0], "state"], data.at[gd[0], "x"], data.at[gd[0], "y"]])
guess_output = pd.DataFrame(guess_rows, columns=HEADERS)
guess_output.to_csv(KNOWN_STATES, index=False)

# Keep display open after the game.
screen.mainloop()
