# Instructor code.
# Except: Student refactored the self.resources structure and added get_resources.

class CoffeeMaker:
    """Models the machine that makes the coffee"""
    def __init__(self):
        self.resources = {
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

    def report(self):
        """Prints a report of all resources."""
        for item in self.resources:
            drink = self.resources[item]
            print(f"{item.title()}: {drink['amount']}{drink['units']}")

    def is_resource_sufficient(self, drink):
        """Returns True when order can be made, False if ingredients are insufficient."""
        can_make = True
        for item in drink.ingredients:
            if drink.ingredients[item] > self.resources[item]['amount']:
                print(f"Sorry, there is not enough {item} to make {drink.name}.")
                can_make = False
        return can_make

    def make_coffee(self, order):
        """Deducts the required ingredients from the resources."""
        for item in order.ingredients:
            self.resources[item]['amount'] -= order.ingredients[item]
        print(f"Here is your {order.name} ☕. Enjoy!")

    # Student added.
    def get_resources(self):
        """
          Prompt for and process an amount of refill of each resource.
          Silently convert bad input to zero.
          :rtype: None
        """
        print("Before refill:")
        self.report()
        for item in self.resources:
            units = self.resources[item]['units']
            added = input(f"Add {item} ({units}): ").strip()
            try:
                adding = int(added)
            except ValueError:
                adding = 0
            self.resources[item]['amount'] += adding
        print("After refill:")
        self.report()
