"use client";
import React, { useState } from "react";
import Replicate from "replicate";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages((prevState) => {
        return [...prevState, { text: newMessage, user: "You" }];
      });
      setNewMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newMessage,
      }),
    });
    let prediction = await response.json();
    if (response.status !== 200) {
      setError(prediction.detail);
      return;
    }

    setPrediction(prediction);

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(1000);
      const response = await fetch("/api/predictions/" + prediction.id);
      console.log("response", response);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }
      // console.log({ prediction });
      setPrediction(prediction);
    }
  };

  return (
    <div className="bg">
      <div className="welcome-container">
        <h1
          className="text-center"
          style={{ fontFamily: "cursive", fontSize: "bolder" }}
        >
          Welcome to Portugal
        </h1>
      </div>
      <div className="App" style={{ marginTop: "130px" }}>
        <div className="ChatWindow">
          <div className="ChatMessages">
            {messages.map((message, index) => (
              <div key={index} className="Message">
                <strong style={{ color: message.user == "AI" && "red" }}>
                  {message.user}:
                </strong>
                {message.text}
              </div>
            ))}

            {/* {messages.map((m) => (
              <div key={m.id} className="Message">
                {m.role === "user" ? "User: " : "AI: "}
                {m.content}
              </div>
            ))} */}
          </div>
          <div className="ChatInput">
            <form>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </form>
            <button onClick={handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
