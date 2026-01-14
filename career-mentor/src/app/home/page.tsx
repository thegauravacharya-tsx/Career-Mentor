import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Target, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto w-full">
        <div className="font-bold text-2xl tracking-tighter flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          CareerPath.AI
        </div>
        <div className="space-x-4">
          <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm font-medium">About</Link>
          <Link href="/library" className="text-muted-foreground hover:text-foreground text-sm font-medium">Library</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
          ✨ Powered by Google Gemini
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
          Discover your future. <br />
          <span className="text-primary">Without the confusion.</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          Our AI analyzes your interests, work style, and personality to recommend the perfect career paths and degrees for you.
        </p>
        
        <Link href="/assessment">
          <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
            Start Career Test <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* How it Works */}
      <section className="bg-secondary/30 py-20 w-full border-t border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
          <FeatureStep 
            icon={<Target className="w-8 h-8 text-chart-1" />}
            title="1. Answer Questions"
            desc="Take a simple, stress-free assessment about your interests and preferences."
          />
          <FeatureStep 
            icon={<BrainCircuit className="w-8 h-8 text-chart-2" />}
            title="2. AI Analysis"
            desc="Our advanced AI model cross-references your profile with thousands of career paths."
          />
          <FeatureStep 
            icon={<Sparkles className="w-8 h-8 text-chart-3" />}
            title="3. Get Matched"
            desc="Receive a personalized roadmap with degrees, skills, and job roles."
          />
        </div>
      </section>
    </main>
  );
}

function FeatureStep({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all">
      <div className="bg-secondary p-4 rounded-xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  )
}