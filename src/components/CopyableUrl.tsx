import { useState } from 'react';

interface CopyableUrlProps {
  shortUrl: string;
}

export default function CopyableUrl({ shortUrl }: CopyableUrlProps) {
  const [copyMessage, setCopyMessage] = useState("");

  const copyLink = () => {
    if (!shortUrl) return;

    navigator.clipboard.writeText(shortUrl);
    setCopyMessage("Copied to clipboard!");

    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  return (
    <>
      <label className="block text-lg mt-6">Short URL</label>
      <div className="relative w-80">
        <input
          type="text"
          value={shortUrl}
          readOnly
          onClick={copyLink}
          className="border-2 border-gray-300 p-2 w-full rounded-md bg-gray-200"
        />
        {copyMessage && (
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm">
            {copyMessage}
          </span>
        )}
      </div>
    </>
  );
}