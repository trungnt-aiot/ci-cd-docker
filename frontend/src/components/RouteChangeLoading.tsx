'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RouteChangeLoading() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, [pathname]);

    if (!loading) return null;

    const letters = ['T', 'R', 'U', 'N', 'G'];

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="flex gap-2 text-white text-5xl font-bold">
                {letters.map((char, i) => (
                    <span
                        key={i}
                        className={`inline-block animate-bounce transition-transform duration-700 ease-in-out`}
                        style={{ animationDelay: `${i * 150}ms` }}
                    >
                        <span
                            className="inline-block animate-spin-slow"
                            style={{
                                display: 'inline-block',
                                animation: `spin ${1.5 + i * 0.3}s linear infinite`,
                            }}
                        >
                            {char}
                        </span>
                    </span>
                ))}
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                .animate-spin-slow {
                    animation: spin 2s linear infinite;
                }
            `}</style>
        </div>
    );
}
