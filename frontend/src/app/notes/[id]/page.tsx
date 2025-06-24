import NoteDetail from '@/components/NoteDetail';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <NoteDetail id={id} />;
}