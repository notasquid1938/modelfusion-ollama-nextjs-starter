"use client"
import { useChat } from "ai/react";
import styles from "./styles/page.module.css";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatMessages}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${
              message.role === "User" ? styles.userMessage : styles.botMessage
            }`}
          >
            <div className={styles.messageContent}>
              <strong>{`${message.role}: `}</strong>
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputContainer}>
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