'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import CreateKeyValueRedisBtn from '@/components/ui/CreateKeyValueRedisBtn';
interface RedisItem {
    key: string;
    value: string;
}

export default function RedisAdminPage() {
    const [data, setData] = useState<RedisItem[]>([]);

    async function fetchData() {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redis`)
            .then((res) => res.json())
            .then((apiData) => {
                console.log(apiData.items);
                setData(apiData.items);
            })
            .catch((error) => {
                console.error('Failed to fetch Redis data:', error);
                setData([]);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Redis Key-Value List</h1>
            <table className="w-full table-auto border border-gray-300">
                <thead className="bg-gray-100">
                    <tr className="text-left bg-blue-300">
                        <th className="border px-4 py-2 text-left">Key</th>
                        <th className="border px-4 py-2 text-left">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.key || `item-${index}`} className="hover:bg-gray-50">
                            <td className="border px-4 py-2 text-blue-600">
                                <Link href={`/redis-admin/${encodeURIComponent(item.key)}`}>{item.key}</Link>
                            </td>
                            <td className="border px-4 py-2">
                                {typeof item.value === 'object' && item.value !== null ? JSON.stringify(item.value, null, 2) : String(item.value)}
                            </td>
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={2} className="text-center py-4 text-gray-500">
                                No data found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <CreateKeyValueRedisBtn onKeyValueCreated={fetchData} />
        </div>
    );
}
