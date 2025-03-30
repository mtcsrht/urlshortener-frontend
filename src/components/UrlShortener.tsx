interface UrlShortenerProps {
  originalUrl: string;
  setOriginalUrl: (url: string) => void;
  onSubmit: () => void;
}

export default function UrlShortener({ 
  originalUrl, 
  setOriginalUrl, 
  onSubmit 
}: UrlShortenerProps) {
  return (
    <>
      <label className="block text-lg mb-2">Original URL</label>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="border-2 border-green-500 p-2 w-80 rounded-md"
        placeholder="Enter your URL"
      />

      <button
        onClick={onSubmit}
        className="bg-green-500 hover:bg-green-600 text-white p-5 mt-4 shadow-md rounded-md transition-colors"
      >
        Create Link
      </button>
    </>
  );
}