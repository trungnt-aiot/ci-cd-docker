'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RedisDetailPage() {
    const { key } = useParams() as { key: string };
    const router = useRouter();

    const [value, setValue] = useState<string>('');
    const [originalValueType, setOriginalValueType] = useState<'string' | 'object' | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [jsonError, setJsonError] = useState<string | null>(null);

    useEffect(() => {
        const fetchKeyValue = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis/${encodeURIComponent(key)}`);
                if (!res.ok) throw new Error(`Failed to fetch key: ${res.statusText}`);

                const data = await res.json();
                if (data.value !== null && typeof data.value === 'object') {
                    setValue(JSON.stringify(data.value, null, 2));
                    setOriginalValueType('object');
                } else {
                    setValue(data.value ?? '');
                    setOriginalValueType('string');
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.error(err);
                    setError(err.message);
                } else {
                    console.error('Unknown error', err);
                    setError('An unexpected error occurred.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchKeyValue();
    }, [key]);

    const handleSave = async () => {
        setJsonError(null);
        let valueToSave: string | object = value;

        if (originalValueType === 'object') {
            try {
                valueToSave = JSON.parse(value);
            } catch {
                setJsonError('Invalid JSON format. Please correct it before saving.');
                return;
            }
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis/${encodeURIComponent(key)}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value: valueToSave }),
            });

            if (!res.ok) throw new Error(`Failed to update: ${res.statusText}`);
            alert('Updated successfully.');
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                setError(err.message);
            } else {
                console.error('Unknown error', err);
                setError('An unexpected error occurred.');
            }
        }
    };

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this key?');
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis/${encodeURIComponent(key)}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error(`Failed to delete: ${res.statusText}`);
            alert('Key deleted successfully.');
            router.push('/redis-admin');
        } catch (err) {
            if (err instanceof Error) {
                console.error(err);
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <p className="p-6 text-gray-500">Loading...</p>;
    }

    return (
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow mt-8">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Redis Key</h1>

            {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

            <div className="mb-4">
                <label htmlFor="redis-key" className="block text-sm font-medium text-gray-700 mb-1">
                    Key
                </label>
                <input id="redis-key" value={key} disabled className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500 cursor-not-allowed" />
            </div>

            <div className="mb-4">
                <label htmlFor="redis-value" className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                </label>
                <textarea
                    id="redis-value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={`w-full border px-3 py-2 rounded h-52 focus:ring-2 ${
                        jsonError ? 'border-red-400 focus:ring-red-400' : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter value (JSON format if the original value was an object)"
                />
                {originalValueType === 'object' && (
                    <p className="text-sm text-gray-500 mt-1">This key was originally stored as a JSON object. Please enter valid JSON.</p>
                )}
                {jsonError && <p className="text-sm text-red-600 mt-2">{jsonError}</p>}
            </div>

            <div className="flex flex-wrap gap-3 justify-between mt-6">
                <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow transition">
                    Save
                </button>

                <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded shadow transition">
                    Delete
                </button>

                <button
                    onClick={() => router.push('/redis-admin')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded shadow transition"
                >
                    Back to List
                </button>
            </div>
        </div>
    );
}
