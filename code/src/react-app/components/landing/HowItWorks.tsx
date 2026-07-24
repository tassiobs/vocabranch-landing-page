import { Sparkles, BookOpen, Play, Brain } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Generate your vocabulary library",
    description: "Give AI a single prompt — like \"gym vocabulary with folders for workouts and expressions\" — and get an entire structured library instantly. No manual card creation.",
    accent: "From prompt to library in seconds"
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Rich metadata for every word",
    description: "Each word comes with meanings by grammar role, collocations, synonyms, antonyms, word forms, IPA pronunciation, etymology, register, and difficulty level.",
    accent: "Deep knowledge, not just translation"
  },
  {
    number: "03",
    icon: Play,
    title: "Practice through a 5-step wizard",
    description: "Listen to real YouTube usage via YouGlish, write a phrase, define the meaning, name a synonym, name an antonym — with AI feedback guiding you at each step.",
    accent: "Active production, not passive recognition"
  },
  {
    number: "04",
    icon: Brain,
    title: "Track mastery over time",
    description: "Track mastery based on how you actually perform. Review analytics show what you've truly learned — not just what you clicked \"know\" on.",
    accent: "Real progress, measured honestly"
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
            How VocaBranch works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete system for vocabulary mastery — from discovery to retention.
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative grid md:grid-cols-[100px_1fr] gap-6 p-6 md:p-8 rounded-2xl border border-border/50 hover:border-primary/30 bg-background hover:bg-primary/[0.02] transition-all"
            >
              {/* Step number */}
              <div className="hidden md:flex items-start">
                <span className="text-5xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors" style={{ fontFamily: '"Source Serif 4", serif' }}>
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                  <span className="inline-block text-sm font-medium text-primary">{step.accent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
