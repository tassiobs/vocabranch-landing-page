import { X } from "lucide-react";

const problems = [
  {
    tool: "Duolingo & beginner apps",
    issue: "Too simple. You're not learning \"apple\" anymore."
  },
  {
    tool: "Anki & flashcard apps",
    issue: "Manual card creation takes forever. Who has the time?"
  },
  {
    tool: "ChatGPT & AI tools",
    issue: "No structure. No tracking. Just scattered conversations."
  },
  {
    tool: "Notebooks & YouTube",
    issue: "Words everywhere with no system to actually learn them."
  }
];

export default function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 bg-muted/30 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
            Ambitious learners have no good tool
          </h2>
          <p className="text-lg text-muted-foreground">
            You've put in the work. You're fluent enough for meetings, emails, maybe even jokes. 
            But there's a gap — nuance, collocations, the words that separate "good" from "precise."
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl bg-background border border-border/50 hover:border-destructive/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                  <X className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{problem.tool}</h3>
                  <p className="text-muted-foreground text-sm">{problem.issue}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-center text-lg text-foreground">
            <span className="font-medium">The result?</span>{" "}
            <span className="text-muted-foreground">
              You keep encountering words you "kind of know" — but can't use precisely when it counts.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
