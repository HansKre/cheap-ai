"use client";
import { useEffect, useState } from "react";

import { useChat } from "ai/react";
import { useDropzone } from "react-dropzone";
import Markdown from "react-markdown";

const toBase64 = async (file: Blob) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((reslove, reject) => {
    reader.onload = () => reslove(reader.result as unknown);
    reader.onerror = (error) => reject(error);
  });
};

export default function Chat() {
  const [encodedFiles, setEncodedFiles] = useState<string[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (files) => {
      const eFiles: string[] = [];
      for (const file of files) {
        const convertedFile = await toBase64(file);
        if (typeof convertedFile === "string") eFiles.push(convertedFile);
      }

      // reset previous chat
      if (isLoading) stop();
      if (messages.find(({ role }) => role !== "user")) setMessages([]);

      setEncodedFiles(eFiles);
    },
  });

  const { messages, handleSubmit, isLoading, stop, setMessages } = useChat({
    body: {
      encodedFiles,
    },
  });

  useEffect(() => {
    if (
      !isLoading &&
      encodedFiles.length > 0 &&
      !messages.find(({ role }) => role !== "user")
    ) {
      // must be called in useEffect to make sure encodedFiles is updated
      handleSubmit();
    }
  }, [isLoading, encodedFiles, messages, handleSubmit]);

  return (
    <div className="flex gap-2 m-5">
      <div className="w-1/2">
        <section className="p-5 border-2 rounded-md flex flex-col gap-2">
          {encodedFiles.length === 0 && (
            <div
              {...getRootProps({
                className: "dropzone h-24 flex flex-col justify-center",
              })}
            >
              <input {...getInputProps()} />
              <p className="text-2xl font-bold">
                Drag &aposn&apos drop your photo here
              </p>
            </div>
          )}
          {encodedFiles.map((file, i) => (
            <img
              src={file}
              key={i}
              {...getRootProps({
                className: "dropzone w-full",
              })}
              onClick={() => {
                stop();
                setEncodedFiles([]);
                setMessages([]);
              }}
            />
          ))}
        </section>
      </div>

      <div className="w-1/2 text-2xl">
        {isLoading && (
          <div className="mb-5 text-2xl italic font-bold">
            Having a good look at your photo...
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role !== "user" && <Markdown>{m.content}</Markdown>}
          </div>
        ))}
      </div>
    </div>
  );
}
