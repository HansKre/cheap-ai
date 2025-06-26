"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="flex flex-col w-screen h-screen px-8 stretch">
      {isLoading && (
        <div className="py-4">
          <p className="text-gray-500">Streaming...</p>
        </div>
      )}
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          <Markdown>{m.content}</Markdown>
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-0"
        style={{ width: "calc(100% - 4rem)" }}
      >
        <input
          className="w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
