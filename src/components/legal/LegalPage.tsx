import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedBackground from '@/components/ui/AnimatedBackground'
import type { Dictionary } from '@/i18n/it'

export type LegalSection = {
  heading: string
  paragraphs?: string[]
  list?: string[]
  table?: { headers: string[]; rows: string[][] }
}

export type LegalContent = {
  title: string
  lastUpdated: string
  intro?: string
  sections: LegalSection[]
}

interface LegalPageProps {
  dict: Dictionary
  content: LegalContent
  homeHref: string
  switchHref: string
  ctaHref: string
}

export default function LegalPage({ dict, content, homeHref, switchHref, ctaHref }: LegalPageProps) {
  return (
    <>
      <AnimatedBackground />

      <main className="relative z-10 min-h-screen overflow-x-clip">
        <Navbar
          dict={dict.navbar}
          navLinks={dict.navLinks}
          homeHref={homeHref}
          switchHref={switchHref}
          ctaHref={ctaHref}
        />

        <article className="max-w-3xl mx-auto px-6 md:px-8 pt-32 pb-24">
          <h1 className="text-3xl md:text-4xl font-display text-white mb-3">{content.title}</h1>
          <p className="text-xs uppercase tracking-widest text-white/40 mb-10">{content.lastUpdated}</p>

          {content.intro && (
            <p className="text-white/70 leading-relaxed mb-10 text-balance">{content.intro}</p>
          )}

          {content.sections.map((section, i) => (
            <section key={i} className="mb-9">
              <h2 className="text-xl text-white mb-3">{section.heading}</h2>

              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-sm text-white/60 leading-relaxed mb-3">
                  {p}
                </p>
              ))}

              {section.list && (
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-white/60 leading-relaxed">
                  {section.list.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr>
                        {section.table.headers.map((h, j) => (
                          <th
                            key={j}
                            className="border-b border-white/15 py-2 pr-4 text-white/50 font-medium uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, j) => (
                        <tr key={j}>
                          {row.map((cell, k) => (
                            <td key={k} className="border-b border-white/[0.06] py-2.5 pr-4 text-white/60 align-top">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </article>

        <Footer dict={dict.footer} />
      </main>
    </>
  )
}
