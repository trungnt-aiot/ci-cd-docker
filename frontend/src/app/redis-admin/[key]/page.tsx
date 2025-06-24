'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RedisDetailPage() {
  const { key } = useParams() as { key: string };
  const [value, setValue] = useState<string>('');
  const [originalValueType, setOriginalValueType] = useState<'string' | 'object' | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchKeyValue = async () => {
      try {
        const res = await fetch(`http://localhost:3030/api/redis/${encodeURIComponent(key)}`);
        if (!res.ok) {
          throw new Error(`Error fetching data: ${res.statusText}`);
        }
        const data = await res.json();

        if (data.value !== null && typeof data.value === 'object') {
          setValue(JSON.stringify(data.value, null, 2));
          setOriginalValueType('object');
        } else {
          setValue(data.value ?? '');
          setOriginalValueType('string');
        }
      } catch (error) {
        console.error('Failed to fetch Redis key detail:', error);
        setValue('');
      } finally {
        setLoading(false);
      }
    };

    fetchKeyValue();
  }, [key]);

  const handleSave = async () => {
    let valueToSave = value;

    if (originalValueType === 'object') {
      try {
        valueToSave = JSON.parse(value);
      } catch (e) {
        console.log('Invalid JSON format. Please correct it before saving as an object.', e);
        return;
      }
    }

    try {
      const res = await fetch(`http://localhost:3030/api/redis/${encodeURIComponent(key)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: valueToSave }),
      });

      if (!res.ok) {
        throw new Error(`Error saving data: ${res.statusText}`);
      }
      alert('Updated successfully!');
    } catch (error) {
      console.error('Failed to save Redis key:', error);
      alert('Failed to update. Check console for details.');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this key? This action cannot be undone.')) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:3030/api/redis/${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Error deleting data: ${res.statusText}`);
      }
      alert('Key deleted!');
      router.push('/redis-admin');
    } catch (error) {
      console.error('Failed to delete Redis key:', error);
      alert('Failed to delete. Check console for details.');
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Redis Key</h1>

      <div className="mb-4">
        <label htmlFor="redis-key" className="block font-semibold mb-1">Key:</label>
        <input
          id="redis-key"
          value={key}
          disabled
          className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="redis-value" className="block font-semibold mb-1">Value:</label>
        <textarea
          id="redis-value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border px-3 py-2 rounded h-48 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter value (JSON format if the original value was an object)"
        />
        {originalValueType === 'object' && (
          <p className="text-sm text-gray-500 mt-1">
            This value was originally stored as a JSON object. Please maintain valid JSON format if you edit it.
          </p>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-md transition-colors duration-200"
        >
          Save
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-md transition-colors duration-200"
        >
          Delete
        </button>
        <button
          onClick={() => router.push('/redis-admin')}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow-md transition-colors duration-200 ml-auto"
        >
          Back to List
        </button>
      </div>
    </div>
  );
}