import Image from 'next/image'
import type { Dictionary } from '@/i18n/it'

export default function Footer({ dict }: { dict: Dictionary['footer'] }) {
  return (
    <footer className=" py-6 px-6 md:px-16 lg:px-24">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/images/logo_footer_knowowcompleto.svg"
              alt="Knowow"
              width={100}
              height={28}
              className="h-9 md:h-16 w-auto mb-4"
              quality={100}
            />

            <p className="text-sm text-white/50 max-w-xs leading-relaxed text-balance">
              {dict.descLine1}
            </p>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed text-balance">
              {dict.descLine2}
            </p>

            <p className="text-xs text-white/25 mt-6">
              {dict.copyright}
            </p>
          </div>

          {/* Col 2 — Navigation (commented out — kept for parity with original) */}
          <div></div>

          {/* Col 3 — Contacts */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
              {dict.contactsLabel}
            </p>
            <ul className="flex flex-col gap-3">
              <li className="text-sm text-white/60">www.knowow.tech</li>
              <li>
                <a
                  href="mailto:info@knowow.tech"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  info@knowow.tech
                </a>
              </li>

              <li className="text-xs text-white/25 mt-2">
                {dict.associationLabel}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <span>{dict.rightsReserved}</span>
        </div>
      </div>
    </footer>
  )
}
