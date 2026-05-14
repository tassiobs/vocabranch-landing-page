import { useState } from "react";
import { Button } from "@/react-app/components/ui/button";
import { Input } from "@/react-app/components/ui/input";
import { ArrowRight, Check, Loader2, TreeDeciduous } from "lucide-react";

// VITE_API_URL must be set in .env.local for local development and as an
// environment variable in the deployment platform for production.
export default function Footer() {
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
    <footer id="waitlist" className="py-24 md:py-32 relative overflow-hidden scroll-mt-14">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
          Ready to master vocabulary
          <span className="text-primary"> for real?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Request access and we'll reach out directly. We're building VocaBranch for learners who are serious about fluency.
        </p>

        {!submitted ? (
          <div className="max-w-md mx-auto">
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
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 text-primary font-medium">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            You're on the list. We'll review your application and email you when your spot is ready.
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
            © {new Date().getFullYear()} VocaBranch. The vocabulary app for ambitious learners.
          </p>
        </div>
      </div>
    </footer>
  );
}
