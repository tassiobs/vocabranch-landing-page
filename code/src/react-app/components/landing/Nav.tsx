import { Button } from "@/react-app/components/ui/button";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="VocaBranch" className="w-7 h-7 rounded-lg" />
          <span className="font-semibold" style={{ fontFamily: '"Source Serif 4", serif' }}>VocaBranch</span>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <a href="https://app.vocabranch.com">Log in</a>
        </Button>
      </div>
    </header>
  );
}
