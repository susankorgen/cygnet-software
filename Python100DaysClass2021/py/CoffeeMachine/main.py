# CoffeeMachine Exercise - Procedural Version
# Student/Solution Author: Susan Korgen
# Course: Day 15, 100 Days of Code: Python 2021
# Instructor/Problem Author: Dr Angela Yu
# School: Udemy.com
# Date: August 8, 2021


# How many times bad user input for coffee drinks is tolerated.
MAX_TRIES = 20


# Data for the requirements to make coffee drinks.
MENU = {
    "espresso": {
        "ingredients": {
            "water": 50,
            "coffee": 18,
        },
        "cost": 1.5,
    },
    "latte": {
        "ingredients": {
            "water": 200,
            "milk": 150,
            "coffee": 24,
        },
        "cost": 2.5,
    },
    "cappuccino": {
        "ingredients": {
            "water": 250,
            "milk": 100,
            "coffee": 24,
        },
        "cost": 3.0,
    }
}


# Data for the current supplies to make coffee drinks.
resources = {
    "water": {
        "amount": 500,
        "units": "ml",
    },
    "milk": {
        "amount": 200,
        "units": "ml",
    },
    "coffee": {
        "amount": 100,
        "units": "g",
    },
}


# Data for the current money in the CoffeeMachine.
money = {
    "amount": 0.0,
    "symbol": "$",
}


def print_report():
    """
    Print a current resource and money report from the machine.
    :rtype: None
    """
    for item in resources:
        print(f"{item.title()}: {resources[item]['amount']}{resources[item]['units']}")
    print(f"Money: {money['symbol']}{'{:.2f}'.format(money['amount'])}")


def get_request() -> str:
    """
    Prompt user to choose one of the coffee drinks.
    Also accept the 'report', 'fill', or 'off' commands,
    but do not prompt for them.
    User must input one of the command strings from the prompt,
    or a substring that starts the desired string,
    like 'c' or 'cap' for cappuccino.
    Input is case-insensitive.
    To refill supplies (with a before and after report) type 'f' or 'fill'.
    To get a report of supplies type 'r' or 'report'.
    To stop the CoffeeMachine type 'o' or 'off'.
    :rtype: str
    """
    tries = 0
    request = ""
    while request == "" and tries < MAX_TRIES:
        typed = input("What would you like? (espresso/latte/cappuccino): ").strip().lower()
        if typed != "":
            for item in options:
                if item.startswith(typed):
                    request = item
                    break
        tries += 1
    return request


def have_resources(request) -> bool:
    """
    The amount of resources in the machine is sufficient.
    :rtype: bool
    """
    enough = True
    for item in resources:
        if resources[item]['amount'] < MENU[request]["ingredients"].get(item, 0):
            print(f"Sorry, not enough {item} to make {request}.")
            enough = False
    return enough


def process_coins(request) -> float:
    """
    Prompt for and process a number of coins, for each type of coin in turn
    (quarter, dime, nickel, penny).  Silently convert bad input to zero.
    Return the total money amount provided by the user.
    :rtype: float
    """
    cost = MENU[request]['cost']
    print(f"A {request} costs {money['symbol']}{'{:.2f}'.format(cost)}. Enter coins.")
    coins = input("Quarters: ").strip()
    try:
        quarters = int(coins)
    except ValueError:
        quarters = 0
    coins = input("Dimes: ")
    try:
        dimes = int(coins)
    except ValueError:
        dimes = 0
    coins = input("Nickels: ")
    try:
        nickels = int(coins)
    except ValueError:
        nickels = 0
    coins = input("Pennies: ")
    try:
        pennies = int(coins)
    except ValueError:
        pennies = 0
    return quarters*0.25 + dimes*0.1 + nickels*0.05 + pennies*0.01


def can_proceed(request, coins) -> bool:
    """
    The amount of money provided is sufficient.
    :rtype: bool
    """
    return coins >= MENU[request]['cost']


def give_refund(paid):
    """
    Print refund message.
    :rtype: None
    """
    print(f"Sorry, {money['symbol']}{'{:.2f}'.format(paid)} is not enough money. Refunded.")


def make_coffee(request):
    """
    Prompt for coins and (if possible) make coffee of the type requested.
    :rtype: None
    """
    print(f"Making {request}...")
    paid = process_coins(request)
    if can_proceed(request, paid):
        refund = update_counts(request, paid)
        if refund > 0:
            print(f"Here is {money['symbol']}{'{:.2f}'.format(refund)} in change.")
        print(f"Here is your {request} ☕. Enjoy!")
    else:
        give_refund(paid)


def update_counts(request, paid) -> float:
    """
    Update resources and money.  Return amount of change.
    :rtype: float
    """
    for item in resources:
        resources[item]['amount'] -= MENU[request]["ingredients"].get(item, 0)
    cost = MENU[request]['cost']
    money["amount"] += cost
    change = 0
    if paid > cost:
        change = paid - cost
    return change


def get_resources():
    """
      Prompt for and process an amount of refill of each resource.
      Silently convert bad input to zero.
      :rtype: None
    """
    print("Before refill:")
    print_report()
    for item in resources:
        units = resources[item]['units']
        added = input(f"Add {item} ({units}): ").strip()
        try:
            adding = int(added)
        except ValueError:
            adding = 0
        resources[item]['amount'] += adding
    print("After refill:")
    print_report()


def machine() -> bool:
    """
    Repeatedly offer coffee drinks or provide supply reports, until
    the user enters 'off' or fails to input a command within MAX_TRIES;
    in those cases returns False.
    :rtype: bool
    """
    request = get_request()
    if request == "":
        print("Sorry, can't tell what you want.")
        return False
    elif request == "off":
        return False
    elif request == "fill":
        get_resources()
    elif request == "report":
        print_report()
    else:
        if have_resources(request):
            make_coffee(request)
    return machine()


def get_commands() -> list:
    """
    Populate the command options.
    :rtype: list
    """
    # Maintenance commands
    menu = ["report", "fill", "off"]
    # Customer commands
    for item in MENU:
        menu.append(item)
    return menu


# Initialize.
options = get_commands()


# Keep prompting for input until user turns off machine.
if not machine():
    print("All done.")
