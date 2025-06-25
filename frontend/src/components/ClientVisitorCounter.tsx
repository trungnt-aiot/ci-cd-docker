'use client';

import { useEffect } from 'react';

export default function ClientVisitorCounter() {
    useEffect(() => {
        const navEntries = performance.getEntriesByType(
            'navigation'
        ) as PerformanceNavigationTiming[];
        const navType = navEntries[0]?.type;

        if (navType === 'reload' || navType === 'navigate') {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/counter`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then(() => {
                    console.log('Visitor API called');
                })
                .catch((err) => {
                    console.error('API call failed:', err);
                });
        }
    }, []);

    return null;
}
