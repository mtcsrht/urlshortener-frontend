"use client";
import { useState } from "react";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const handleSubmit = async () => {
    if (!originalUrl.trim()) return;

    try {
      const response = await fetch("http://localhost:3030/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        setShortUrl(`http://localhost:3000/${data.short_url}`);
      } else {
        console.error("Failed to create short URL");
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  const copylink = () => {
    if (!shortUrl) return;

    navigator.clipboard.writeText(shortUrl);
    setCopyMessage("Copied to clipboard!");

    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Make your links shorter</h1>

      <label className="block text-lg mb-2">Original URL</label>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="border-2 border-green-500 p-2 w-80 rounded-md"
        placeholder="Enter your URL"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white p-5 mt-4 shadow-md rounded-md"
      >
        Create Link
      </button>

      <label className="block text-lg mt-6">Short URL</label>
      <div className="relative w-80">
        <input
          type="text"
          value={shortUrl}
          readOnly
          onClick={copylink}
          className="border-2 border-gray-300 p-2 w-full rounded-md bg-gray-200"
        />
        {copyMessage && (
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
            {copyMessage}
          </span>
        )}
      </div>
    </div>
  );
}
