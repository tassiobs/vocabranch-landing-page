import { useState } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { ArrowRight, Check, Loader2 } from "lucide-react";

// VITE_API_URL must be set in .env.local for local development and as an
// environment variable in the deployment platform for production.
export default function Hero() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, first_name: firstName, last_name: lastName, waitlist: true }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.detail ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            The vocabulary app for busy professionals who've outgrown Duolingo.
            AI-generated word trees, active practice, real-world context —
            and actual mastery tracking.
          </p>

          {/* Request Access form */}
          {!submitted ? (
            <div className="max-w-md">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 px-4 bg-white border-border/60 focus:border-primary"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 px-4 bg-white border-border/60 focus:border-primary"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 px-4 bg-white border-border/60 focus:border-primary"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        Request Access
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
              <p className="text-sm text-muted-foreground mt-4">Request your spot — we review applications and reach out directly.</p>
              <p className="text-sm text-muted-foreground mt-1">Free during the pilot period. No credit card required.</p>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-primary font-medium">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              You're on the list. We'll review your application and email you when your spot is ready.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
