# Atari(TM) Pong Game Tribute
# Student/Solution Author: Susan Korgen
# Course: Day 22, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 21, 2021

from turtle import Screen
from net import Net
from paddle import Paddle
from ball import Ball
from scoreboard import Scoreboard
from time import sleep

HALF_HEIGHT = 300
HALF_WIDTH = 400
EDGE_LEFT = -380
EDGE_RIGHT = 370
EDGE_TOP = 280
EDGE_BOTTOM = -280
BALL_SIZE = 20

# Create the game board.
screen = Screen()
screen.setup(width=2*HALF_WIDTH, height=2*HALF_HEIGHT)
screen.bgcolor("black")
screen.title("Atari(TM) Pong Tribute")
net = Net(0 - HALF_HEIGHT, HALF_HEIGHT)

# Create the paddles.
right = Paddle(HALF_HEIGHT, EDGE_RIGHT)
left = Paddle(HALF_HEIGHT, EDGE_LEFT)

# Bind right paddle actions to arrow keys.
# Bind left paddle actions to letter "w" and "s" keys.
screen.listen()
screen.onkey(right.up, "Up")
screen.onkey(right.down, "Down")
screen.onkey(left.up, "w")
screen.onkey(left.down, "s")

# Create the ball and make it move.
ball = Ball(BALL_SIZE, HALF_WIDTH, HALF_HEIGHT)

# Create the scoreboard.
scoreboard = Scoreboard(HALF_HEIGHT)

# Start the game.
screen.tracer(0)
final = 0
game_over = False
while not game_over:
    sleep(0.1)
    screen.update()
    ball.move()

    # Detect collision with paddles.
    if ball.collides(right):
        ball.rebound()
    elif ball.collides(left):
        ball.rebound()
    else:
        # Detect ball out of bounds.
        x_ball = ball.xcor()
        if x_ball <= EDGE_LEFT:
            ball.refresh(EDGE_RIGHT)
            final = scoreboard.update_score(EDGE_RIGHT)
        elif x_ball >= EDGE_RIGHT:
            ball.refresh(EDGE_LEFT)
            final = scoreboard.update_score(EDGE_LEFT)
        if final != 0:
            game_over = True

# Game over.
net.clear()
scoreboard.final_score(final)

# Leave screen visible after the run.
screen.exitonclick()
