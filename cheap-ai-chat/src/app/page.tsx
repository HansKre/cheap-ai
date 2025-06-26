"use client";

import { useChat } from "ai/react";
import Markdown from "react-markdown";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <div className="flex flex-col w-screen h-screen px-8 stretch">
      <h1 className="text-2xl font-bold text-center my-4">Cheap AI Chat</h1>
      {/* large screen content limiter */}
      <div className="w-full max-w-[800px] mx-auto flex-1 flex flex-col">
        {isLoading && (
          <div className="py-4">
            <p className="text-gray-500">Streaming...</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={m.id}
            className={`flex whitespace-pre-wrap ${
              m.role === "user" && i !== 0 ? "mt-6" : ""
            }`}
          >
            <span className="flex-none min-w-[60px] text-gray-500 italic">
              {m.role === "user" ? "User: " : "AI: "}
            </span>
            <Markdown className="flex-1">{m.content}</Markdown>
          </div>
        ))}

        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0"
          style={{ width: "calc(100% - 4rem)" }}
        >
          <input
            className="w-full max-w-[800px] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
