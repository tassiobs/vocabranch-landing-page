import { TreeDeciduous } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <TreeDeciduous className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold" style={{ fontFamily: '"Source Serif 4", serif' }}>VocaBranch</span>
        </div>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <a href="https://app.vocabranch.com">Log in</a>
        </Button>
      </div>
    </header>
  );
}
