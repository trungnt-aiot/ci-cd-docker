type Props = {
  count: string;
};

export default function HomePage({count}: Props) {

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <span className=" text-black font-semibold text-xl px-6 py-3 rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.25)]">
                Visitor: {count}
            </span>
        </div>
    );
}
