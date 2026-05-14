import { MoreVertical, Smartphone, PlusSquare } from "lucide-react";

function IosShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
      <path d="M20 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4" />
    </svg>
  );
}

const iosSteps = [
  {
    icon: Smartphone,
    instruction: "Open the app in Safari",
  },
  {
    icon: IosShareIcon,
    instruction: 'Tap the Share button — the square with an arrow pointing up',
  },
  {
    icon: PlusSquare,
    instruction: 'Scroll down and tap "Add to Home Screen"',
  },
  {
    icon: PlusSquare,
    instruction: 'Tap "Add" to confirm',
  },
];

const androidSteps = [
  {
    icon: Smartphone,
    instruction: "Open the app in Chrome",
  },
  {
    icon: MoreVertical,
    instruction: "Tap the three-dot menu in the top right",
  },
  {
    icon: PlusSquare,
    instruction: 'Tap "Add to Home Screen"',
  },
  {
    icon: PlusSquare,
    instruction: 'Tap "Add" to confirm',
  },
];

function StepList({ steps }: { steps: typeof iosSteps }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-4">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0 mt-0.5">
            {i + 1}
          </div>
          <div className="flex items-center gap-3 pt-1">
            <step.icon className="w-4 h-4 text-muted-foreground shrink-0" />
            <p className="text-muted-foreground text-sm leading-relaxed">{step.instruction}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function InstallApp() {
  return (
    <section id="install" className="py-24 md:py-32 bg-muted/30 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" style={{ fontFamily: '"Source Serif 4", serif' }}>
            Add to your home screen
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            VocaBranch works like a native app on iOS and Android — no app store required.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* iOS */}
          <div className="rounded-2xl border border-border/50 bg-background p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {/* Apple-style logo mark */}
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">iOS — Safari</h3>
            </div>
            <StepList steps={iosSteps} />
          </div>

          {/* Android */}
          <div className="rounded-2xl border border-border/50 bg-background p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {/* Android logo mark */}
                <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.341a1 1 0 01-1 1h-9a1 1 0 010-2h9a1 1 0 011 1zm-5-12.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zm-3.5 3.5a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm5 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.5 9A8.5 8.5 0 0112 .5 8.5 8.5 0 0120.5 9H3.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold">Android — Chrome</h3>
            </div>
            <StepList steps={androidSteps} />
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          The app URL is{" "}
          <a href="https://app.vocabranch.com" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">
            app.vocabranch.com
          </a>
        </p>
      </div>
    </section>
  );
}
