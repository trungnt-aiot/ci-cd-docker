'use client';

import { useEffect, useState } from 'react';
import NoteItem from '@/components/ui/NoteItem';
import CreateNoteBtn from '@/components/ui/CreateNoteBtn';

interface NoteItemInterface {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<NoteItemInterface[]>([]);

    async function fetchNotes() {
        const res = await fetch('http://localhost:3030/api/note', { cache: 'no-store' });
        const data = await res.json();
        setNotes(data.notes || []);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="flex justify-around flex-wrap gap-8 mt-4">
            {notes.length > 0 ? (
                notes.map((item, index) => (
                    <NoteItem id={item.id} key={index} title={item.title} content={item.content} />
                ))
            ) : (
                <p className="text-gray-600 text-lg">There is no note, please create new one</p>
            )}

            <CreateNoteBtn onNoteCreated={fetchNotes} />
        </div>
    );
}
