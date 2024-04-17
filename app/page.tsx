"use client";

import { useChat } from "ai/react";
import styles from "./styles/page.module.css"; 

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className={styles.chatContainer}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${message.role === "user" ? styles.userMessage : styles.botMessage}`}
        >
          <strong>{`${message.role}: `}</strong>
          {message.content}
          <br />
          <br />
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className={styles.inputField}
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}

