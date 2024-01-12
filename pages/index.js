import { useState } from "react";
import Head from "next/head";
import Image from "next/image";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [error, setError] = useState(null);
  const [sending, setsending] = useState(false);

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
    try {
      e.preventDefault();
      setsending(true);
      handleSendMessage();

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: newMessage,
        }),
      });
      console.log(response);
      let prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }

      setMessages((prevState) => {
        return [...prevState, { text: prediction, user: "AI" }];
      });

      setsending(false);
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch("/api/predictions/" + prediction.id);
        prediction = await response.json();

        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        setMessages((prevState) => {
          return [...prevState, { text: prediction, user: "AI" }];
        });
      }
    } catch (e) {
      console.log(e);
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
          </div>
          <div className="ChatInput">
            <div>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
            </div>
            <button
              disabled={sending}
              style={{
                cursor: sending ? "not-allowed" : "pointer",
                color: sending && "#808080",
                backgroundColor: sending && "#a0a0a0",
              }}
              onClick={handleSubmit}
            >
              {sending ? "Sending.." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
