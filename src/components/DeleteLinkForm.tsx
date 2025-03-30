import { useState } from 'react';

export default function DeleteLinkForm() {
  const [deleteLink, setDeleteLink] = useState("");

  const redirectToDelete = () => {
    if (!deleteLink) return;

    const redirectTo = `${window.location}delete/${deleteLink}`;
    window.location.href = redirectTo;
  };

  return (
    <>
      <label className="block text-lg mt-6">
        Paste your short code here to delete it:
      </label>
      <div className="relative w-80">
        <input
          value={deleteLink}
          onChange={(e) => setDeleteLink(e.target.value)}
          type="text"
          className="border-2 border-red-600 p-2 w-80 rounded-md"
          placeholder="Code to delete"
        />
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={redirectToDelete}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}