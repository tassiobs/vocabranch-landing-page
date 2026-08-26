import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import Seo from "@/react-app/components/Seo";

export default function About() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Seo
        title="About"
        description="Meet Tassio, the Brazilian advanced English learner who built VocaBranch to bridge the vocabulary gap for serious learners."
        canonical="/about"
      />

      <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="VocaBranch" className="w-7 h-7 rounded-lg" />
            <Link
              to="/"
              className="font-semibold hover:text-primary transition-colors"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              VocaBranch
            </Link>
          </div>
          <Button asChild variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary">
            <a href="https://app.vocabranch.com">Log in</a>
          </Button>
        </div>
      </header>

      <main className="pt-14">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-10 text-muted-foreground">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Button>

          <div className="grid md:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-start">

            {/* Photo */}
            <div className="flex justify-center md:justify-start">
              <img
                src="/assets/tassio.jpg"
                alt="Tassio, founder of VocaBranch"
                className="w-64 md:w-full rounded-2xl shadow-lg object-cover"
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
                Meet the founder
              </p>
              <h1
                className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
                style={{ fontFamily: '"Source Serif 4", serif' }}
              >
                Hi, I'm Tassio.
              </h1>

              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  I'm a Brazilian advanced English learner living in Brazil. I have the privilege of using
                  English every day at work and speaking with native speakers regularly. And yet, one thing
                  still bothers me: when someone uses a word I don't know.
                </p>
                <p>
                  And that's natural. I'm not surrounded by English all day, every day. I don't live in an
                  English-speaking country, and I'm not exposed to the same amount and variety of English as
                  a native speaker. So I need to find ways to bridge that gap.
                </p>
                <p>
                  There's no magic wand for this. Vocabulary acquisition takes time, effort, and consistent
                  practice. But I believe the right tools can make that process much more effective.
                </p>
                <p>
                  For intermediate and advanced learners, vocabulary is often the biggest challenge when trying to take their
                  English to the next level. You already understand most of what you hear and read. The
                  challenge is discovering those words and expressions you don't know yet — and, more
                  importantly, making them part of the English you can actually use.
                </p>
                <p className="text-foreground font-medium text-lg">That's why I built VocaBranch.</p>
                <p>
                  I wanted a place where I could capture the vocabulary I encounter, organize it in a
                  meaningful way, and practice it until it becomes part of my active vocabulary.
                </p>
                <p>
                  VocaBranch started as a tool I wanted for myself. Now, I'm building it for other
                  intermediate and advanced English learners who are on the same journey.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
