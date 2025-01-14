"use server";

import { openai } from '@ai-sdk/openai';
import { generateText, streamText, generateObject, streamObject } from 'ai';

import { createStreamableValue, streamUI } from 'ai/rsc';
import { object, z } from 'zod'

export async function generate(input) {
    const stream = createStreamableValue("");
    (async () => {
        const { textStream } = await streamText({
            model: openai('gpt-3.5-turbo'),
            prompt: input,
        })
        for await (const delta of textStream) {
            stream.update(delta);
        }
        stream.done();
    })();
    return { output: stream.value };
};

export async function getAnswer(prompt) {
    const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        prompt,
    });

    return { text };
}

export async function getData(input) {
    'use server';
    const { object: people } = await generateObject({
        model: openai('gpt-3.5-turbo'),
        system: "You generate data for three people.",
        prompt: input,
        schema: z.object({
            people: z.array(
                z.object({
                    name: z.string().describe("The name of the fake person."),
                    address: z.string().describe("Us address format."),
                    age: z.number(),
                })),
        }),
    });
    return { people };
};

export async function generateObj(input) {
    'use server';
    const stream = createStreamableValue();
    (async () => {
        const { partialObjectStream } = await streamObject({
            model: openai('gpt-3.5-turbo'),
            system: "You generate data for three people.",
            prompt: input,
            schema: z.object({
                people: z.array(
                    z.object({
                        name: z.string().describe("The name of the fake person."),
                        address: z.string().describe("Us address format."),
                        age: z.number(),
                    })),
            }),
        });
        for await (const partialObject of partialObjectStream) {
            stream.update(partialObject);
        }
        stream.done();
    })();
    return { object: stream.value };
};

export async function streamComponent() {
    const result = await streamUI({
        model: openai('gpt-4o'),
        prompt: "Give me some advice on how to plan a trip to San Francisco.",
        text: ({ content }) => <div>{content}</div>
    });
    return result.value;
}