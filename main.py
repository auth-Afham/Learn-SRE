import random
import time

# Define some phrases or responses
phrases_a = [
    "Hello, how are you?",
    "What's your favorite programming language?",
    "Do you like coding?",
    "Tell me something interesting!",
    "How's the weather in your part of the code?"
]

phrases_b = [
    "Hi there!",
    "Python all the way!",
    "Absolutely, coding is awesome!",
    "Did you know that I'm made of ones and zeros?",
    "My codebase is cloud-based, so no weather updates for me!"
]

# Function to simulate a chat
def simulate_chat():
    print("Starting automated chat...")
    while True:
        time.sleep(random.uniform(1, 3))  # Simulate typing delay
        message_a = random.choice(phrases_a)
        print("User A:", message_a)

        time.sleep(random.uniform(1, 3))  # Simulate typing delay
        message_b = random.choice(phrases_b)
        print("User B:", message_b)

        # Optional: Exit condition
        if "bye" in message_a.lower() or "bye" in message_b.lower():
            print("Ending automated chat...")
            break

# Run the chat simulation
simulate_chat()
