import { Button } from "@/react-app/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center scroll-mt-14">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Purple accent glow */}
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            For ambitious English learners
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6" style={{ fontFamily: '"Source Serif 4", serif' }}>
            Master vocabulary at the level
            <span className="text-primary"> you actually need</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
            The vocabulary app for serious learners who've outgrown Duolingo.
            AI-generated word trees, active practice, real-world context —
            and actual mastery tracking.
          </p>

          <Button asChild size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            <a href="https://app.vocabranch.com/">
              Get started free
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">Free during the beta period. No credit card required.</p>
        </div>
      </div>
    </section>
  );
}
