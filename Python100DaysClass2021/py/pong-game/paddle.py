# Atari(TM) Pong Game Tribute
# Student/Solution Author: Susan Korgen
# Course: Day 22, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 21, 2021

from turtle import Turtle

WIDTH = 20
HEIGHT = 100
MOVE_DISTANCE = 30
DOWN = 270
LEFT = 180
UP = 90
RIGHT = 0


class Paddle(Turtle):
    """Paddle class supports right and left paddles for Pong."""
    def __init__(self, half_height, x_start):
        super().__init__()
        self.hideturtle()
        self.penup()
        self.shape("square")
        self.color("white")
        self.setheading(UP)
        self.shapesize(stretch_len=HEIGHT/20, stretch_wid=WIDTH/20)
        self.max_top = half_height - int(round(MOVE_DISTANCE/2))
        self.min_bottom = 0 - half_height + int(round(MOVE_DISTANCE/2))
        self.top = HEIGHT/2
        self.bottom = 0 - HEIGHT/2
        self.goto(x_start, 0)
        if x_start < 0:
            self.inside_edge = int(self.xcor() + WIDTH/2)
        else:
            self.inside_edge = int(self.xcor() - WIDTH/2)
        self.refresh_position()
        self.showturtle()

    def refresh_position(self):
        """Tell the Paddle where it is now, top and bottom."""
        self.top = int(self.ycor() + HEIGHT/2)
        self.bottom = int(self.ycor() - HEIGHT/2)

    def move(self):
        self.forward(MOVE_DISTANCE)
        self.refresh_position()

    def up(self):
        if not self.at_top():
            self.hideturtle()
            self.setheading(UP)
            self.showturtle()
            self.move()

    def down(self):
        if not self.at_bottom():
            self.hideturtle()
            self.setheading(DOWN)
            self.showturtle()
            self.move()

    def at_top(self) -> bool:
        return self.top >= self.max_top

    def at_bottom(self) -> bool:
        return self.bottom <= self.min_bottom
