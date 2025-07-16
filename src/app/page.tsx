"use client";

import { useState, FormEvent, useEffect } from "react";
import { quotes, Quote } from "../../quotes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lightbulb, BookOpen } from "lucide-react";

const suggestions = ["Inspiration", "Life", "Success", "Happiness", "Motivation"];

export default function Page() {
  const [topic, setTopic] = useState<string>("");
  const [results, setResults] = useState<Quote[]>([]);
  const [animatedText, setAnimatedText] = useState<string>("");

  // Typewriter header effect
  useEffect(() => {
    const text = "Find Your Perfect Quote 💡";
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const filtered = quotes
      .filter((q) => q.topic.toLowerCase() === topic.trim().toLowerCase())
      .slice(0, 3);
    setResults(filtered);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTopic(suggestion);
    const filtered = quotes
      .filter((q) => q.topic.toLowerCase() === suggestion.toLowerCase())
      .slice(0, 3);
    setResults(filtered);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-blue-300 to-green-500 p-8">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 max-w-md w-full transition hover:shadow-green-500/50">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-800">
          {animatedText}
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <Input
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 border-green-500 focus:ring-green-500"
          />
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Search
          </Button>
        </form>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-green-600" /> Suggestions:
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <Button
                key={i}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(s)}
                className="text-xs hover:bg-green-100 border-green-400 text-green-700"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          <div className="space-y-3">
            {results.length === 0 && (
              <motion.p
                className="text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🔍 No quotes yet. Try a topic!
              </motion.p>
            )}
            {results.map((quote, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-gradient-to-r from-green-100 to-blue-100 shadow-md hover:shadow-lg hover:scale-105 transition transform"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="text-green-500 w-5 h-5 mt-1" />
                  <p className="text-gray-800">{quote.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </main>
  );
}
