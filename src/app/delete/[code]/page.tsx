"use client"
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page(){
    const params = useParams();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    
    // Effect to hide error message after 5 seconds
    useEffect(() => {
        if (errorMessage) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);
            
            // Clean up the timer when component unmounts or errorMessage changes
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);
    
    const handleDelete = async () => {
        const short_url = params.code;
        try {
            const response = await fetch(`http://localhost:3030/url/${short_url}`, {
                method: "DELETE",
            });
            
            // When deletion is successful
            if (response.ok) {
                // Navigate to home with success parameter
                router.push('/?deleted=true');
            } else {
                const data = await response.json();
                setErrorMessage(data.message || "Failed to delete URL");
            }
        } catch (error) {
            console.error("Error deleting short URL: ", error);
            setErrorMessage("Network error. Please try again later.");
        }
    }
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">Delete Short URL</h1>  
                <p className="mb-4">Are you sure you want to delete the URL with code: <span className="font-semibold">{params.code}</span>?</p>
                
                {/* Error message */}
                {showError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}
                
                <div className="flex justify-center gap-4 mt-6">
                    <button 
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Delete
                    </button>
                    <Link href="/">
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition-colors">
                            Cancel
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}