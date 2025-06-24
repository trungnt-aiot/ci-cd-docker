import Link from "next/link";


type CardItemProps = {
    id: string;
    title: string;
    content: string;
};

export default function NoteItem({title, content, id}: CardItemProps) {
    return (
        <div className="w-82 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.15)] bg-white p-6 space-y-4 hover:shadow-[0_0_10px_rgba(0,0,0,0.25)] transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600">
                {content}
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                <Link href={`notes/${id}`}>Read detail</Link>
            </button>
        </div>
    )
}