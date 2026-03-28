import TitleSubtitle from "@/components/titleSubtitle";

export default function About() {
  return (
    <div className="w-full flex flex-col mt-16">
      <div className="fixed inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 backdrop-blur-xs" />
      </div>
      <section className="min-h-[calc(100vh-90px)] md:min-h-[calc(100vh-33px)] flex flex-col items-center justify-center text-center px-4">
        
        <TitleSubtitle 
          title="About Rydex"
          subtitle="Premium car rental experience, redefined." />

      </section>
      
      
    </div>
  );
}