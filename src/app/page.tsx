"use client";

import { useState, FormEvent } from "react";
import { quotes, Quote } from "../../quotes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  // User input topic
  const [topic, setTopic] = useState<string>("");

  // Filtered quotes
  const [results, setResults] = useState<Quote[]>([]);

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filtered = quotes
      .filter(
        (q) => q.topic.toLowerCase() === topic.trim().toLowerCase()
      )
      .slice(0, 3);
    setResults(filtered);
  };

  return (
    <main className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Quote Generator</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <Input
          placeholder="Enter topic (e.g., inspiration)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button type="submit">Generate</Button>
      </form>

      <div className="space-y-2">
        {results.length === 0 && (
          <p className="text-gray-500">No quotes yet. Try a topic.</p>
        )}
        {results.map((quote, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-sm bg-gray-50"
          >
            {quote.text}
          </div>
        ))}
      </div>
    </main>
  );
}
