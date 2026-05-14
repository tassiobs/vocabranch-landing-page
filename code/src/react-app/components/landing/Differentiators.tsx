import { Zap, PenTool, Video, LineChart, Users2 } from "lucide-react";

const differentiators = [
  {
    icon: Zap,
    title: "AI-generated vocabulary trees",
    description: "Full structured libraries from a single prompt. No manual card creation ever again."
  },
  {
    icon: PenTool,
    title: "Active practice, not flashcards",
    description: "You write, define, and produce — not just tap \"I know this\" over and over."
  },
  {
    icon: Video,
    title: "Real-world YouTube context",
    description: "Hear native speakers use each word in authentic contexts via YouGlish integration."
  },
  {
    icon: LineChart,
    title: "Honest mastery tracking",
    description: "Track which words you've truly mastered, with analytics that tell the truth."
  },
  {
    icon: Users2,
    title: "Collaborative workspaces",
    description: "Share collections with teammates or study groups. Learn together."
  }
];

export default function Differentiators() {
  return (
    <section id="differentiators" className="py-24 md:py-32 bg-foreground text-background scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
            What makes VocaBranch different
          </h2>
          <p className="text-lg text-background/70 max-w-2xl mx-auto">
            Built specifically for ambitious learners who demand more than beginner tools can offer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((diff, index) => (
            <div 
              key={index}
              className={`p-6 rounded-xl border border-background/10 hover:border-primary/50 bg-background/5 hover:bg-background/10 transition-all ${index === 4 ? 'lg:col-span-1 md:col-span-2 lg:mx-auto lg:max-w-sm' : ''}`}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                <diff.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{diff.title}</h3>
              <p className="text-background/60 text-sm leading-relaxed">{diff.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
