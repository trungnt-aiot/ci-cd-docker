'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

interface NoteData {
    title: string;
    content: string;
}

export default function NoteDetail({ id }: { id: string }) {
    // const router = useRouter();
    const [note, setNote] = useState<NoteData | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchNote = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}`);
                if (!res.ok) throw new Error('Failed to fetch note.');

                const data = await res.json();
                const fetchedNote = data?.note?.[0];
                if (!fetchedNote) throw new Error('Note not found.');

                setNote(fetchedNote);
                setTitle(fetchedNote.title);
                setContent(fetchedNote.content);
            } catch (err) {
                console.error(err);
                setError('Failed to load note.');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Failed to delete note.');
            // router.push('/notes');
            alert('Note deleted successfully.');
        } catch (err) {
            console.error(err);
            alert('Error deleting note.');
        }
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) throw new Error('Failed to update note.');
            setNote({ title, content });
            setEditMode(false);
        } catch (err) {
            console.error(err);
            alert('Error saving note.');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (error) return <p className="text-red-500 p-4">{error}</p>;
    if (!note) return <p className="p-4 text-gray-500">Note not found.</p>;

    return (
        <div className="p-4 max-w-xl mx-auto mt-8">
            {editMode ? (
                <>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="border w-full p-2 mb-2 border-indigo-900/50 rounded" />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border w-full p-2 border-indigo-900/50 rounded"
                        rows={6}
                    />
                    <div className="mt-4 flex gap-2">
                        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>
                            Save
                        </button>
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>
                            Cancel
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl px-4 py-2 rounded-t-xl font-bold border-2 bg-blue-300">{note.title}</h1>
                    <p className="whitespace-pre-line rounded-b-xl px-4 py-2 border-l-2 border-b-2 border-r-2 bg-lime-300">{note.content}</p>
                    <div className="mt-4 flex gap-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setEditMode(true)}>
                            Edit
                        </button>
                        <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
