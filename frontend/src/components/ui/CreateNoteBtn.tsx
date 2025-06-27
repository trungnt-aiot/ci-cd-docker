'use client';

import { useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CreateNoteBtnProps {
    onNoteCreated: () => void;
}

export default function CreateNoteBtn({ onNoteCreated }: CreateNoteBtnProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    async function CreateNewNote() {
        const title = titleRef.current?.value.trim() || '';
        const content = contentRef.current?.value.trim() || '';

        if (!title || !content) {
            setError('Title and content are required.');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/note`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error(`Failed with status ${res.status}`);
            }

            setIsOpen(false);
            setError(null);
            onNoteCreated();
        } catch (err: unknown) {
            console.error('Failed to create note:', err);
            setError('Failed to create note. Please try again.');
        }
    }

    return (
        <>
            <button
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition fixed bottom-4 right-4 z-50 cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                    setError(null);
                }}
            >
                <Plus size={24} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black opacity-70 z-40"></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg w-96 relative">
                            <button className="absolute top-2 right-2" onClick={() => setIsOpen(false)}>
                                <X size={20} />
                            </button>
                            <h2 className="text-xl font-bold mb-4">Create New Note</h2>

                            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm">Title</label>
                                    <input ref={titleRef} className="w-full border border-indigo-900/50 rounded p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm">Message</label>
                                    <textarea ref={contentRef} rows={4} className="w-full border border-indigo-900/50 rounded p-2" />
                                </div>
                                <button type="button" onClick={CreateNewNote} className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer">
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
