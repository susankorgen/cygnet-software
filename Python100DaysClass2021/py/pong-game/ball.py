# Atari(TM) Pong Game Tribute
# Student/Solution Author: Susan Korgen
# Course: Day 22, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 21, 2021

from turtle import Turtle
from paddle import Paddle
from time import sleep


class Ball(Turtle):
    """Ball is round, unlike the historical Pong ball, which was square."""
    def __init__(self, ball_size, half_width, half_height):
        super().__init__()
        self.shape("circle")
        self.color("white")
        self.ball_size = ball_size
        if ball_size != 20:
            # set the size stretch on the ball
            pass
        self.penup()
        self.goto(0, 0)
        self.max_top = half_height - ball_size
        self.min_bottom = 0 - half_height + ball_size
        self.half_width = half_width
        self.half_height = half_height
        self.speed_factor = 1
        self.dx = half_width
        self.dy = half_height
        self.reset_speed()

    def move(self):
        if self.at_top() or self.at_bottom():
            self.dy = 0 - self.dy
        x = self.xcor() + self.dx
        y = self.ycor() + self.dy
        self.goto(x, y)

    def at_top(self) -> bool:
        """True when at top of game board."""
        return self.ycor() >= self.max_top

    def at_bottom(self) -> bool:
        """True when at bottom of game board."""
        return self.ycor() <= self.min_bottom

    def rebound(self):
        """
        Change right-left direction, as from a paddle collision.
        On each rebound(), also increase_speed().
        """
        self.dx = 0 - self.dx
        self.increase_speed()

    def increase_speed(self):
        self.speed_factor = 1.2
        self.dx = int(round(self.speed_factor * self.dx))
        self.dy = int(round(self.speed_factor * self.dy))

    def reset_speed(self):
        """Return to normal speed."""
        self.speed_factor = 1
        self.dx = int(round(self.half_width / 50))
        self.dy = int(round(self.half_height / 25))

    def collides(self, paddle: Paddle) -> bool:
        """
        Return True if the ball and paddle are close enough
        on the game board for us to say they have collided.
        """
        x_ball = self.xcor()
        if abs(x_ball - paddle.xcor()) < 12:
            y_ball = self.ycor()
            if y_ball < paddle.top and y_ball > paddle.bottom:
                if x_ball < 0 and x_ball >= paddle.xcor():
                    return True
                elif x_ball > 0 and x_ball <= paddle.xcor():
                    return True
        return False

    def refresh(self, face_side):
        """
        Start the ball from the center at normal speed.
        At the very beginning, send the ball up and right.
        While the game is on, right and left direction is
        towards the player who most recently won a point.
        Up and down direction is the same as previous.
        """
        self.hideturtle()
        self.goto(0, 0)
        if face_side > 0 and self.dx < 0:
            self.rebound()
        elif face_side < 0 and self.dx > 0:
            self.rebound()
        self.reset_speed()
        self.showturtle()
        sleep(0.8)
