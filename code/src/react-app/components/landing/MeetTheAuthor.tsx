export default function MeetTheAuthor() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Photo */}
          <div className="flex justify-center md:justify-start">
            <img
              src="/assets/tassio.jpg"
              alt="Tassio, founder of VocaBranch"
              className="w-72 h-72 lg:w-80 lg:h-80 object-cover object-top rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">
              Meet the founder
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-6"
              style={{ fontFamily: '"Source Serif 4", serif' }}
            >
              Hi, I'm Tassio.
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a Brazilian advanced English learner living in Brazil. I have the privilege of using
                English every day at work and speaking with native speakers regularly. And yet, one thing
                still bothers me: when someone uses a word I don't know.
              </p>
              <p>
                That's natural. I'm not surrounded by English all day. I don't live in an English-speaking
                country, and I'm not exposed to the same variety of English as a native speaker. So I need
                to find ways to bridge that gap.
              </p>
              <p>
                For advanced learners, vocabulary is often the biggest challenge. You already understand
                most of what you hear and read. The challenge is discovering the words you don't know yet —
                and making them part of the English you can actually use.
              </p>
              <p className="text-foreground font-medium">That's why I built VocaBranch.</p>
              <p>
                I wanted a place to capture vocabulary I encounter, organize it meaningfully, and practice
                it until it becomes part of my active vocabulary. VocaBranch started as a tool I wanted
                for myself. Now I'm building it for other intermediate and advanced learners on the same
                journey.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
