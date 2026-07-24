import { Button } from "@/react-app/components/ui/button";
import { ArrowRight, TreeDeciduous } from "lucide-react";

export default function Footer() {
  return (
    <footer id="cta" className="py-24 md:py-32 relative overflow-hidden scroll-mt-14">
      {/* Subtle background accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
          Ready to master vocabulary
          <span className="text-primary"> for real?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Join learners who are serious about fluency. Sign up free and start building your vocabulary today.
        </p>

        <Button asChild size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
          <a href="https://app.vocabranch.com/">
            Get started free
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>

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
