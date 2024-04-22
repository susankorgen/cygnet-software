from data import get_question_list


class QuizBrain:
    def __init__(self):
        self.question_number = 0
        self.question_list = get_question_list()
        self.score = 0

    def next_question(self):
        current = self.question_list[self.question_number]
        answer = input(f"Q.{self.question_number + 1}: {current.question} (True/False): ")
        if self.check_answer(answer, current.answer):
            self.score += 1
        self.question_number += 1
        print(f"Your current score: {self.score}/{self.question_number}")


    def still_has_questions(self) -> bool:
        return self.question_number < len(self.question_list)

    def check_answer(self, answer, right_answer) -> bool:
        if (
            ((answer.lower() == "true" or answer.lower() == "t") and right_answer == "True") or
            ((answer.lower() == "false" or answer.lower() == "f") and right_answer == "False")
        ):
            print(f"You are correct! The answer is {right_answer}.")
            return True
        else:
            print(f"You are wrong. The answer is {right_answer}.")
            return False
