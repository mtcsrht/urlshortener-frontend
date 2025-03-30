"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import SuccessAlert from "@/components/SuccessAlert";
import UrlShortener from "@/components/UrlShortener"; // Import the new component
import CopyableUrl from "@/components/CopyableUrl";
import DeleteLinkForm from "@/components/DeleteLinkForm";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Get URL search parameters
  const searchParams = useSearchParams();

  // Check for deleted=true parameter on mount
  useEffect(() => {
    if (searchParams.get("deleted") === "true") {
      setDeleteSuccess(true);

      // Hide the success message after 5 seconds
      const timer = setTimeout(() => {
        setDeleteSuccess(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

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
        setShortUrl(`${window.location}${data.short_url}`);
      } else {
        console.error("Failed to create short URL");
      }
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Make your links shorter</h1>

      {deleteSuccess && <SuccessAlert message="Link deleted successfully!" />}

      {/* Replace the input and button with the UrlShortener component */}
      <UrlShortener 
        originalUrl={originalUrl}
        setOriginalUrl={setOriginalUrl}
        onSubmit={handleSubmit}
      />

      <CopyableUrl shortUrl={shortUrl} />
      <DeleteLinkForm />
    </div>
  );
}
