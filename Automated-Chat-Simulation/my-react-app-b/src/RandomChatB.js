import React, { useState, useEffect } from "react";

const phrasesB = [
  "Hi there!",
  "JavaScript all the way!",
  "Absolutely, coding is awesome!",
  "Did you know that I'm made of ones and zeros?",
  "My codebase is cloud-based, so no weather updates for me!"
];

const RandomChatB = () => {
  const [messages, setMessages] = useState([]);

  // Send message to App A (via backend)
  const sendMessageToA = async (message) => {
    try {
      const response = await fetch("http://localhost:3001/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "User B",
          message: message,
        }),
      });

      const newMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error("Error sending message to App A:", error);
    }
  };

  // Fetch messages from App A (via backend) continuously
  const fetchMessagesFromA = async () => {
    try {
      const response = await fetch("http://localhost:3001/messages");
      const data = await response.json();
      setMessages(data); // Set latest messages
    } catch (error) {
      console.error("Error fetching messages from App A:", error);
    }
  };

  // Fetch messages from App A every 3 seconds (or another interval)
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      fetchMessagesFromA();
    }, 3000); // Adjust interval as needed (3 seconds in this case)

    // Cleanup interval on component unmount
    return () => clearInterval(fetchInterval);
  }, []); // Empty dependency array to start the interval once on mount

  // Randomly generate messages from App B and send to App A
  useEffect(() => {
    const chatInterval = setInterval(() => {
      const newMessageB = `User B: ${phrasesB[Math.floor(Math.random() * phrasesB.length)]}`;
      setMessages((prev) => [...prev, { user: "User B", message: newMessageB }]);
      sendMessageToA(newMessageB);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds

    return () => clearInterval(chatInterval); // Cleanup interval
  }, []);

  return (
    <div>
      <h1>Random Chat B</h1>
      <div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((message, index) => (
          <p key={index}>{message.message}</p>
        ))}
      </div>
    </div>
  );
};

export default RandomChatB;
