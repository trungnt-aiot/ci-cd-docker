import HomePage from '@/components/HomePage';

export const dynamic = 'force-dynamic';

export default async function Home() {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/counter`);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/counter`, {
        method: 'PATCH',
    });

    console.log('HOME');

    const data = await res.json();

    return <HomePage count={data.visitorCounter} />;
}
