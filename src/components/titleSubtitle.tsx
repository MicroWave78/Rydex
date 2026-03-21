export default function TitleSubtitle({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="relative flex flex-col text-center">
            <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
            <p className="text-md md:text-xl p-2">{subtitle}</p>
        </div>
    );
}