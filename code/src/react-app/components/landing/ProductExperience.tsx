import { useEffect, useRef } from "react";

export default function ProductExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section className="py-24 md:py-32 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">

        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
            How it works
          </p>
          <h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
            style={{ fontFamily: '"Source Serif 4", serif' }}
          >
            Your vocabulary, organized like a tree
          </h2>
          <p className="text-lg text-muted-foreground">
            Not another flashcard deck. VocaBranch structures words by meaning, context, and
            relationships — so you learn faster and remember longer.
          </p>
        </div>

        {/* Browser frame */}
        <div className="rounded-2xl border border-gray-200 shadow-xl shadow-gray-200/70 overflow-hidden bg-white">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-gray-50/80">
            <div className="flex gap-1.5 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 text-center max-w-xs mx-auto">
                app.vocabranch.com
              </div>
            </div>
          </div>

          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
          >
            <source src="/assets/demo.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Feature callouts */}
        <div className="grid md:grid-cols-3 gap-4 mt-10">
          {[
            {
              title: "Build your own vocabulary tree",
              body: "Group words by meaning, context, and relationship — not just alphabetically.",
            },
            {
              title: "Go beyond memorization",
              body: "Every card includes synonyms, antonyms, collocations, and real-world examples.",
            },
            {
              title: "Designed for serious learners",
              body: "Whether you're building your first academic vocabulary or pushing toward fluency, VocaBranch gives you the precision to go further.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl bg-background border border-border/50"
            >
              <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
