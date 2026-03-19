export default function TitleSubtitle({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="relative flex flex-col mt-50 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
            <p className="text-lg md:text-xl p-2">{subtitle}</p>
        </div>
    );
}