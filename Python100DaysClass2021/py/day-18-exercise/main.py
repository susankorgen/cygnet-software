# Exercises - Tuples, Packages, Graphics
# Student/Solution Author: Susan Korgen
# Course: Day 18, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 10, 2021


from turtle import Turtle, Screen
from random import randint, choice
import colorgram
from time import sleep


# Challenge 1 - Draw a Square

def draw_square():
    tim.reset()
    tim.shape("turtle")
    tim.color("DarkOrchid4")
    for _ in range(4):
        tim.forward(100)
        tim.right(90)


# Challenge 1 - Draw a Dashed Line

def draw_dash():
    tim.reset()
    tim.shape("turtle")
    tim.color("coral")
    for _ in range(20):
        tim.pendown()
        tim.forward(5)
        tim.penup()
        tim.forward(5)


# Challenge 3 - Draw n-sided Shapes

def draw_shape(side_count):
    if side_count > 2:
        angle = 360.0 / side_count
        tim.pendown()
        for _ in range(side_count):
            tim.forward(100)
            tim.right(angle)


def init_color():
    screen.colormode(255)
    red = randint(0, 170)
    green = randint(0, 170)
    blue = randint(0, 170)
    tim.pencolor((red, green, blue))


def color_change(color):
    color -= 50
    if color < 0:
        color += 255
    return color


def pick_color():
    color_tuple = tim.pencolor()
    red, green, blue = color_tuple
    picker = randint(0, 2)
    if picker == 0:
        red = color_change(red)
    elif picker == 1:
        green = color_change(green)
    elif picker == 2:
        blue = color_change(blue)
    tim.pencolor((int(red), int(green), int(blue)))


def draw_shapes(limit):
    if limit > 2:
        tim.hideturtle()
        tim.reset()
        tim.penup()
        tim.setposition(0, 340)
        tim.write("Polygons", align="center", font=("Arial", 16, "normal"))
        tim.setposition(-50, 315)
        tim.shape("classic")
        tim.speed(0)
        tim.width(3)
        tim.showturtle()
        init_color()
        tim.pendown()
        for sided in range(3, limit + 1):
            pick_color()
            draw_shape(sided)


# Challenge 4 = Draw Random Walk

def draw_random_step(length):
    """Take one step on a random walk.  length is the step length."""
    degree = 90 * randint(0, 3)
    if degree == 90:
        tim.right(degree)
    if degree == 180:
        if randint(0, 1) == 0:
            tim.right(degree)
        else:
            tim.left(degree)
    elif degree == 270:
        tim.left(90)
    tim.forward(length)


def random_walk(limit, width, length):
    """
    Start a random walk where the number of steps is limit.
    Draw the line with the provided width.
    length is the length of one step.
    """
    if limit > 0:
        tim.reset()
        tim.penup()
        tim.setposition(0, 340)
        tim.write("Random Walk", align="center", font=("Arial", 16, "normal"))
        tim.setposition(0, 315)
        tim.write("(Random Color Shifts by HTML Color Value)", align="center", font=("Arial", 14, "normal"))
        tim.shape("arrow")
        tim.speed(0)
        tim.width(width)
        tim.setposition(0, 0)
        tim.pendown()
        init_color()
        for _ in range(limit):
            pick_color()
            draw_random_step(length)


# Challenge 5 - Spirograph

def spirograph(gap, diam):
    if diam > 0 and gap in range(1, 359):
        tim.reset()
        tim.penup()
        tim.setposition(0, 340)
        tim.write("Spirograph", align="center", font=("Arial", 16, "normal"))
        tim.setposition(0, 315)
        tim.write("(Random Color Shifts by HTML Color Value)", align="center", font=("Arial", 14, "normal"))
        tim.shape("classic")
        tim.speed(0)
        init_color()
        tim.width(1)
        tim.setposition(0, 0)
        tim.pendown()
        for _ in range(int(360 / gap)):
            pick_color()
            tim.circle(diam)
            tim.setheading(tim.heading() + gap)
    sleep(1)


# Challenge 6 - Damien Hirst Spot Painting

def get_hirst_colors() -> list:
    """
    Sample an image of a Damien Hirst Spot Painting to get spot colors.
    :rtype:list
    """
    # image.jpg has 360 dots plus 1 background color = 361 maximum.
    # In practice we extract < 40 colors from image.jpg.
    colors = colorgram.extract('image.jpg', 361)
    color_list = []
    for color in colors:
        rgb = color.rgb
        # Remove background shades of white.
        # Build the list of dot colors.
        if rgb.r < 238 and rgb.g < 238 and rgb.b < 238:
            color_tuple = (rgb.r, rgb.g, rgb.b)
            color_list.append(color_tuple)
    return color_list


def hirst_spot_painting(width, height, diam, space):
    if width > 0 and height > 0:
        if diam > 0 and space > 0:
            full_width = space * (width - 1)
            full_height = space * (height - 1)
            x_start = 0 - full_width/2
            y_start = 0 - full_height/2
            tim.reset()
            tim.hideturtle()
            tim.penup()
            tim.speed(0)
            tim.setposition(0, 340)
            tim.write("Damien Hirst Painting", align="center", font=("Arial", 16, "normal"))
            screen.colormode(255)
            dot_colors = get_hirst_colors()
            tim.setposition(0, 315)
            tim.write("(Random Dot Colors Sampled from JPEG Image)", align="center", font=("Arial", 14, "normal"))
            for row in range(height):
                if row % 2 == 0:
                    tim.setheading(0)
                    tim.setposition(x_start, y_start)
                else:
                    tim.setheading(180)
                    tim.setposition(x_start + full_width, y_start)
                for col in range(width):
                    tim.pencolor(choice(dot_colors))
                    tim.pendown()
                    tim.dot(diam)
                    tim.penup()
                    tim.forward(space)
                y_start += space
    sleep(2)


# Initialize
screen = Screen()
tim = Turtle()


# Run a demonstration.
draw_square()
draw_dash()
draw_shapes(15)
spirograph(5, 140)
hirst_spot_painting(10, 8, 18, 50)
random_walk(500, 10, 16)


# Pause the screen at the ending point so you can see it.
screen.exitonclick()
