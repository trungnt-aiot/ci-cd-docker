import HomePage from '@/components/HomePage';

export const dynamic = 'force-dynamic';

export default async function Home() {
    let count: string = '0';

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/counter`, {
            method: 'PATCH',
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error(`Failed to update visitor counter: ${res.status} ${res.statusText}`);
        } else {
            const data = await res.json();
            count = data.visitorCounter || 0;
        }
    } catch (err: unknown) {
        console.error('Error fetching visitor counter:', err);
    }

    return <HomePage count={count} />;
}
