# Atari(TM) Pong Game Tribute
# Student/Solution Author: Susan Korgen
# Course: Day 22, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 21, 2021

from turtle import Turtle


class Net(Turtle):
    """Draw the net on the game board, using a turtle shape for fun."""
    def __init__(self, bottom, top):
        super().__init__()
        self.penup()
        self.hideturtle()
        self.shape("turtle")
        self.color("white")
        self.width(3)
        self.setheading(90)
        self.draw_dashed(bottom, top)

    def draw_dashed(self, bottom, top):
        self.goto(0, bottom)
        dash_length = int(round(5*self.width()))
        self.showturtle()
        while bottom < top:
            self.pendown()
            self.forward(dash_length)
            self.penup()
            self.forward(dash_length)
            bottom += 2*dash_length
        self.hideturtle()
