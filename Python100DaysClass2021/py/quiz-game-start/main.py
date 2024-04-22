from data import get_question_list
from quiz_brain import QuizBrain



print("Welcome to QuizBrain.\n\n")
quiz_brain = QuizBrain()
question_bank = get_question_list()
while quiz_brain.still_has_questions():
    quiz_brain.next_question()
print(f"Thank you for playing! Final score: {quiz_brain.score}/{quiz_brain.question_number}")
