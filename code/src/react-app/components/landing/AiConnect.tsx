import { Button } from "@/react-app/components/ui/button";
import { MessageSquare } from "lucide-react";

const examples = [
  "Quiz me on the words I added this week",
  "Write a short story using my most-reviewed words",
  "Which words am I still struggling with?",
];

export default function AiConnect() {
  return (
    <section id="ai-connect" className="py-24 md:py-32 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="uppercase tracking-widest text-primary text-sm font-medium mb-4">
            AI assistant
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: '"Source Serif 4", serif' }}
          >
            Your words, inside your AI assistant
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Don't just know words. Use them — in real conversations with the AI
            you already use every day. Connect VocaBranch to Claude or ChatGPT
            and your personal word library travels with you.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {examples.map((example) => (
            <div
              key={example}
              className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 px-5 py-4"
            >
              <MessageSquare className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
              <span className="text-sm text-foreground leading-snug">
                "{example}"
              </span>
            </div>
          ))}
        </div>

        <Button asChild size="lg" variant="outline" className="h-12 px-8">
          <a href="https://app.vocabranch.com/settings">
            Connect your AI assistant
          </a>
        </Button>
      </div>
    </section>
  );
}
