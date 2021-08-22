# Atari(TM) Pong Game Tribute
# Student/Solution Author: Susan Korgen
# Course: Day 22, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 21, 2021

from turtle import Turtle

LEFT = -100
RIGHT = 100
GAME_OVER = 3


class Scoreboard(Turtle):
    """Scoreboard updates and displays left and right scores, detects game over."""
    def __init__(self, half_height):
        super().__init__()
        self.hideturtle()
        self.penup()
        self.color("white")
        self.left_score = 0
        self.right_score = 0
        self.height = half_height - 100
        self.show_score()

    def update_score(self, side_won: int) -> int:
        """
        side_won is positive if right scored a point.
        side_won is negative if left scored a point.
        Update the total for that side.
        When game is over, return the winning score: as a
        positive value if right won, negative if left won.
        If there is no winner yet, return 0.
        """
        if side_won > 0:
            self.right_score += 1
        else:
            self.left_score -= 1
        self.show_score()
        if self.right_score == GAME_OVER:
            return self.right_score
        elif self.left_score == 0 - GAME_OVER:
            return self.left_score
        else:
            return 0

    def show_score(self):
        """Refresh the scoreboard display showing both sides."""
        self.clear()
        self.goto(LEFT, self.height)
        self.write(0 - self.left_score, align="center", font=("Courier", 80, "normal"))
        self.goto(RIGHT, self.height)
        self.write(self.right_score, align="center", font=("Courier", 80, "normal"))

    def final_score(self, winning_score):
        """Refresh game board display to announce the winner."""
        self.goto(0, 0)
        if winning_score > 0:
            text = f"GAME OVER: RIGHT WON!"
        else:
            text = f"GAME OVER: LEFT WON!"
        self.write(text, align="center", font=("Courier", 30, "normal"))
