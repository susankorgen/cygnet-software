# CoffeeMachine Exercise - Object-Oriented Version, using Instructor package/modules.
# Student adjusted Instructor's coffee_maker.py and money_machine.py as noted.
# Student/Solution Author: Susan Korgen
# Course: Day 16, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 8, 2021


from menu import Menu
from coffee_maker import CoffeeMaker
from money_machine import MoneyMachine


def order_drink(order):
    """
    Get the user's request, and if all conditions are met, make the drink.
    """
    if len(order) > 0:
        for option in menu.get_items().split("/"):
            if option.startswith(order):
                item = menu.find_drink(option)
                if coffee_maker.is_resource_sufficient(item):
                    if money_machine.make_payment(item):
                        coffee_maker.make_coffee(item)
                break


def next_order() -> str:
    """Prompt user with a list of available coffee drinks."""
    options = menu.get_items()
    return input(f"What would you like ({options})? ").strip().lower()


def coffee_cycle():
    """
    Prompt user to choose one of the coffee drinks.
    Also accept 'report', 'fill', or 'off', but do not prompt for them.
    For drink names from the prompt, user may input the full
    string, or a substring that starts the desired string,
    like 'c' or 'cap' for cappuccino.
    Input is case-insensitive.
    To refill supplies (with a before and after report) type 'fill'.
    To get a report of supplies and money, type 'report'.
    To stop the CoffeeMachine type 'off'.
    """
    done = False
    while not done:
        order = next_order()
        if order == "report":
            coffee_maker.report()
            money_machine.report()
        elif order == "fill":
            coffee_maker.get_resources()
        elif order == "off":
            done = True
        else:
            order_drink(order)
    print("All done.")


# Initialize.
menu = Menu()
coffee_maker = CoffeeMaker()
money_machine = MoneyMachine()


# Keep prompting for input until user turns off machine.
coffee_cycle()
