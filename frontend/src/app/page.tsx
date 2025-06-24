import HomePage from "@/components/HomePage";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // await fetch('http://localhost:3000/api/counter', { method: 'PATCH' });

  const res = await fetch('http://backend:3030/api/counter', { method: 'PATCH' });

  console.log("HOME")

  const data = await res.json();

  return (
    <HomePage count={data.visitorCounter} />
  );
}
