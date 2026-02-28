export default function TitleSubtitle({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="centered-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-description">{subtitle}</p>
        </div>
    );
}