"use client";

import { useChat } from "ai/react";

import { useState } from "react"
import { getAnswer, generate } from "./action";
import { readStreamableValue } from 'ai/rsc';


export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// export default function Home() {
//   const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {messages.map(message => (
//         <div key={message.id}>
//           {message.role === 'user' ? 'User: ' : 'AI: '}
//           {message.content}
//         </div>
//       ))}
//       {isLoading && <div>Loading...</div>}
//       <form onSubmit={handleSubmit}>
//         <input
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Ask what to do at a location"
//           disabled={isLoading}
//         />
//       </form>
//     </main>
//   );
// }

export default function Home() {
  const [generation1, setGeneration1] = useState("");
  const [generation2, setGeneration2] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full justify-between w-60">
        <button onClick={async () => {
          const { text } = await getAnswer("What should I do in San Francisco?");
          setGeneration1(text);
        }}>Ask</button>
        <button onClick={async () => {
          const { output } = await generate("What should I do in San Francisco?");

          for await (const delta of readStreamableValue(output)) {
            setGeneration2(currentGeneration => currentGeneration + delta);
          }
        }}>Ask2</button>
      </div>
      <div className="flex w-full justify-between w-60">
        <p>{generation1}</p>
        <p>{generation2}</p>
      </div>
    </main>
  );
}

