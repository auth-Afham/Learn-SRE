import React, { useState, useEffect } from "react";

const phrasesA = [
  "Hello, how are you?",
  "What's your favorite programming language?",
  "Do you like coding?",
  "Tell me something interesting!",
  "How's the weather in your part of the code?"
];

const RandomChatA = () => {
  const [messages, setMessages] = useState([]);

  // Send message to App B (via backend)
  const sendMessageToB = async (message) => {
    try {
      const response = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "User A",
          message: message,
        }),
      });

      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message to App B:", error);
    }
  };

  // Fetch messages from App B (via backend) continuously
  const fetchMessagesFromB = async () => {
    try {
      const response = await fetch("http://localhost:3001/messages");
      const data = await response.json();
      setMessages(data); // Set latest messages
    } catch (error) {
      console.error("Error fetching messages from App B:", error);
    }
  };

  // Fetch messages from App B every 3 seconds (or another interval)
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchMessagesFromB();
    }, 3000); // Adjust interval as needed (3 seconds in this case)

    // Cleanup interval on component unmount
    return () => clearInterval(fetchInterval);
  }, []); // Empty dependency array to start the interval once on mount

  // Randomly generate messages from App A and send to App B
  useEffect(() => {
    const chatInterval = setInterval(() => {
      const newMessageA = `User A: ${phrasesA[Math.floor(Math.random() * phrasesA.length)]}`;
      setMessages((prev) => [...prev, { user: "User A", message: newMessageA }]);
      sendMessageToB(newMessageA);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds

    return () => clearInterval(chatInterval); // Cleanup interval
  }, []);

  return (
    <div>
      <h1>Random Chat A</h1>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((message, index) => (
          <p key={index}>{message.message}</p>
        ))}
      </div>
    </div>
  );
};

export default RandomChatA;
