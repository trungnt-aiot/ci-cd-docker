"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function NoteDetail({ id }: { id: string }) {
  //   const router = useRouter();
  const [note, setNote] = useState<{ title: string; content: string } | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3030/api/note/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNote(data?.note[0]);
        setTitle(data?.note[0]?.title);
        setContent(data?.note[0]?.content);
      });
  }, [id]);

  const handleDelete = async () => {
    await fetch(`http://localhost:3030/api/note/${id}`, { method: "DELETE" });
    // router.push("/notes");
  };

  const handleSave = async () => {
    await fetch(`http://localhost:3030/api/note/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    setNote({ title, content });
    setEditMode(false);
  };
  console.log(note)

  if (!note) return <p>Loading...</p>;


  return (
    <div className="p-4 max-w-xl mx-auto mt-8">
      {editMode ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 mb-2 border-indigo-900/50 rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border w-full p-2 border-indigo-900/50 rounded"
            rows={6}
          />
          <div className="mt-4 flex gap-2">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl px-4 py-2 rounded-t-xl font-bold border-2 bg-blue-300">{note.title}</h1>
          <p className="whitespace-pre-line rounded-b-xl px-4 py-2 border-l-2 border-b-2 border-r-2 bg-lime-300">{note.content}</p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
