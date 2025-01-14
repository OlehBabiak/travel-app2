"use client";

import { useChat } from "ai/react";

import { useState } from "react"
import { getAnswer, generate, getData, generateObj, streamComponent } from "./action";
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
  const [component, setComponent] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="flex w-full justify-between w-60">
        <button onClick={async () => {
          const { text } = await getAnswer("What should I do in San Francisco?");
          setGeneration1(text);
        }}>Ask</button>
        <button onClick={
          async () => {
            const { people } = await getData("People who sound like they have superhero names");
            setGeneration1(JSON.stringify(people, null, 2));
          }
        }>View People</button>
        <button onClick={async () => {
          const { output } = await generate("What should I do in San Francisco?");

          for await (const delta of readStreamableValue(output)) {
            setGeneration2(currentGeneration => currentGeneration + delta);
          }
        }}>Ask2</button>

        <button onClick={
          async () => {
            const { object } = await generateObj("People who sound like they have superhero names");
            for await (const partialObject of readStreamableValue(object)) {
              if (partialObject) {
                setGeneration2(JSON.stringify(partialObject.people, null, 2));
              }
            }
          }
        }>View People2</button>
      </div> */}
      <div className="flex w-full flex-col justify-between w-60">
        <form onSubmit={async (e) => {
          e.preventDefault();
          setComponent(await streamComponent());
        }}>
          <button >Get component</button>
        </form>
        <div>{component}</div>
      </div>
      <div className="flex w-full justify-between w-60">
        <pre>{generation1}</pre>
        <pre>{generation2}</pre>
      </div>
    </main>
  );
}

