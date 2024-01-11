"use client";
import React, { useState } from "react";
// import { useChat } from 'ai/react';

export default function Home() {
  const dummyResponseComplettion = async () => {
    return "test";
  };

  // const { messages, input, handleInputChange, handleSubmit } = useChat();

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

  const handleSubmit = (e) => {
    handleSendMessage();
    setMessages((prevState) => {
      return [...prevState, { text: "TEST", user: "AI" }];
    });
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

// https://sdk.vercel.ai/docs/guides/providers/mistral
// 'use client';
// import { useChat } from 'ai/react';
// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   return (
//     <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
//       {messages.map(m => (
// <div key={m.id} className="whitespace-pre-wrap">
//   {m.role === 'user' ? 'User: ' : 'AI: '}
//   {m.content}
// </div>
//       ))}
//       <form onSubmit={handleSubmit}>
//         <input
//           className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
//           value={input}
//           placeholder="Say something..."
//           onChange={handleInputChange}
//         />
//       </form>
//     </div>
//   );
// }
