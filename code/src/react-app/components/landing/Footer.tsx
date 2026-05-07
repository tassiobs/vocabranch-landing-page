import { useState } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { ArrowRight, Check, TreeDeciduous } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <footer className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
          Ready to master vocabulary
          <span className="text-primary"> for real?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Join the waitlist for early access. We're building VocaBranch for learners who are serious about fluency.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 px-4 bg-white border-border/60 focus:border-primary"
              required
            />
            <Button type="submit" size="lg" className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Join waitlist
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-3 text-primary font-medium">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            You're on the list. We'll be in touch soon.
          </div>
        )}

        {/* Logo and copyright */}
        <div className="mt-20 pt-8 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TreeDeciduous className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold" style={{ fontFamily: '"Source Serif 4", serif' }}>VocaBranch</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VocaBranch. The vocabulary app for advanced learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
