"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const params = useParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for: ", params.code);
        
        const response = await fetch(`http://localhost:3030/url/${params.code}`, {
          method: "GET",
        });
    
        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          } else {
            setError("Invalid URL or link has expired");
            setLoading(false);
          }
        } else {
          setError(`Error ${response.status}: Link not found or server error`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error: ", error);
        setError("Failed to fetch URL data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.code]);

  // Show error page if there was an error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <Link 
            href="/" 
            className="block text-center bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
          >
            Go back to homepage
          </Link>
        </div>
      </div>
    );
  }

  // Show loading indicator while waiting
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg">Redirecting...</p>
      </div>
    );
  }

  // This will only be shown momentarily before redirect
  return null;
}