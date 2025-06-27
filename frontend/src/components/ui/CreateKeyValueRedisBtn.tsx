'use client';

import { useRef, useState } from 'react';
import { Plus, X } from 'lucide-react';

interface CreateKeyValueRedisBtnProps {
    onKeyValueCreated: () => void;
}

export default function CreateKeyValueRedisBtn({ onKeyValueCreated }: CreateKeyValueRedisBtnProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const keyRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);

    async function CreateNewKeyValue() {
        const key = keyRef.current?.value.trim() || '';
        const value = valueRef.current?.value.trim() || '';

        if (!key || !value) {
            setError('Key and Value are required.');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key, value }),
            });

            if (!res.ok) {
                throw new Error(`Failed with status ${res.status}`);
            }

            setIsOpen(false);
            setError(null);
            onKeyValueCreated();
        } catch (err: unknown) {
            console.error('Failed to create key-value:', err);
            setError('Failed to create key-value pair. Please try again.');
        }
    }

    return (
        <>
            <button
                className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition fixed bottom-4 right-4 z-50 cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                    setError(null); // reset error on open
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

                            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm">Key</label>
                                    <input ref={keyRef} className="w-full border border-indigo-900/50 rounded p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm">Value</label>
                                    <input ref={valueRef} className="w-full border border-indigo-900/50 rounded p-2" />
                                </div>
                                <button
                                    type="button"
                                    onClick={CreateNewKeyValue}
                                    className="w-full bg-blue-500 text-white py-2 rounded cursor-pointer"
                                >
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
