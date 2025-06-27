'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CreateKeyValueRedisBtn from '@/components/ui/CreateKeyValueRedisBtn';

interface RedisItem {
    key: string;
    value: string | object | null;
}

export default function RedisAdminPage() {
    const [data, setData] = useState<RedisItem[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis`, { cache: 'no-store' });
            if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
            const apiData = await res.json();
            setData(apiData.items || []);
        } catch (err) {
            console.error('Failed to fetch Redis data:', err);
            setError('Failed to load Redis key-value list.');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-blue-700">Redis Key-Value List</h1>

            {error && <p className="text-red-600 font-medium mb-4">{error}</p>}
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <table className="w-full table-auto border border-gray-300 shadow-sm">
                    <thead className="bg-gray-100">
                        <tr className="text-left bg-blue-200">
                            <th className="border px-4 py-2">Key</th>
                            <th className="border px-4 py-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item.key || `item-${index}`} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2 text-blue-600 whitespace-nowrap">
                                        <Link href={`/redis-admin/${encodeURIComponent(item.key)}`}>{item.key}</Link>
                                    </td>
                                    <td className="border px-4 py-2 text-sm">
                                        {typeof item.value === 'object' && item.value !== null
                                            ? JSON.stringify(item.value, null, 2)
                                            : String(item.value ?? '')}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="text-center py-4 text-gray-500">
                                    No data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            <div className="mt-6">
                <CreateKeyValueRedisBtn onKeyValueCreated={fetchData} />
            </div>
        </div>
    );
}
