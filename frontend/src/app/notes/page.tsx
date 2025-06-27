'use client';

import { useEffect, useState } from 'react';
import NoteItem from '@/components/ui/NoteItem';
import CreateNoteBtn from '@/components/ui/CreateNoteBtn';

interface Note {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchNotes = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
                cache: 'no-store',
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const data = await res.json();
            setNotes(data.notes || []);
        } catch (err) {
            console.error('Failed to fetch notes:', err);
            setError('Failed to load notes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="flex justify-around flex-wrap gap-8 mt-4">
            {loading ? (
                <p className="text-gray-500">Loading notes...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : notes.length > 0 ? (
                notes.map((note) => <NoteItem key={note.id} id={note.id} title={note.title} content={note.content} />)
            ) : (
                <p className="text-gray-600 text-lg">There is no note, please create a new one</p>
            )}

            <CreateNoteBtn onNoteCreated={fetchNotes} />
        </div>
    );
}
