"use client";
import { useEffect, useState } from "react";

import { useChat } from "ai/react";
import { useDropzone } from "react-dropzone";
import Markdown from "react-markdown";

const toBase64 = async (file: Blob): Promise<string> => {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  return new Promise((reslove, reject) => {
    const result = reader.result;
    if (!result || typeof result !== "string")
      throw new Error("FileReader did not return a result");
    reader.onload = () => reslove(result);
    reader.onerror = (error) => reject(error);
  });
};

export default function Chat() {
  const [encodedFiles, setEncodedFiles] = useState<string[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (files) => {
      const eFiles: string[] = [];
      for (const file of files) {
        eFiles.push(await toBase64(file));
      }
      setEncodedFiles(eFiles);
    },
  });
  const { messages, handleSubmit, isLoading } = useChat({
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
                Drag 'n' drop your photo here
              </p>
            </div>
          )}
          {encodedFiles.map((file, i) => (
            <img src={file} key={i} className="w-full" />
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
