# Instructor code.
# Except: Student added exception checking in process_coins(), touched up money messages.

class MoneyMachine:

    CURRENCY = "$"

    COIN_VALUES = {
        "quarters": 0.25,
        "dimes": 0.10,
        "nickels": 0.05,
        "pennies": 0.01
    }

    def __init__(self):
        self.profit = 0
        self.money_received = 0

    def report(self):
        """Prints the current profit"""
        print(f"Money: {self.CURRENCY}{'{:.2f}'.format(self.profit)}")

    def process_coins(self):
        """Returns the total calculated from coins inserted."""
        print("Please insert coins.")
        for coin in self.COIN_VALUES:
            try:
                adding = int(input(f"How many {coin}?: ")) * self.COIN_VALUES[coin]
            except ValueError:
                adding = 0
            self.money_received += adding
        return self.money_received

    def make_payment(self, item):
        """Returns True when payment is accepted, or False if insufficient."""
        print(f"Cost of {item.name} is ${'{:.2f}'.format(item.cost)}. ")
        self.process_coins()
        if self.money_received >= item.cost:
            change = round(self.money_received - item.cost, 2)
            if change > 0:
                print(f"Here is {self.CURRENCY}{'{:.2f}'.format(change)} in change.")
            self.profit += item.cost
            self.money_received = 0
            return True
        else:
            print("Sorry that's not enough money. Money refunded.")
            self.money_received = 0
            return False
