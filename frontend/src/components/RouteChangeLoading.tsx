'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteChangeLoading() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 400);
        return () => clearTimeout(timer);
    }, [pathname]);

    return loading ? (
        <div className="fixed inset-0 z-50 bg-white/80 flex items-center justify-center">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    ) : null;
}
