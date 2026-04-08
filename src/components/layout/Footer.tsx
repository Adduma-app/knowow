import Image from 'next/image'

const navLinks = [
  'FFTM — Cos\'è FFTM',
  'FFTM — Come funziona',
  'Applicazioni',
  'Servizi',
  'Chi siamo',
  'Contatti',
]

export default function Footer() {
  return (
    <footer className=" py-6 px-6 md:px-16 lg:px-24">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="KnoWow"
              width={100}
              height={28}
              className="h-7 w-auto mb-4"
            />
            <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
              beyond ordinary engineering
            </p>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Spin-off dell&apos;Università di Messina. Fast Fatigue Testing Technology.
            </p>
            <p className="text-xs text-white/25 mt-6">
              © 2026 KnoWow s.r.l. — P.IVA [in registrazione]
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            {/* TODO decommenta quando crei altre pagine */}
            {/* <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Navigazione
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Col 3 — Contacts */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
              Contatti
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
              <li className="text-sm text-white/60">
                Università di Messina — Spin-off accademico
              </li>
              <li className="text-xs text-white/25 mt-2">
                Membro Confindustria
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <span>KnoWow s.r.l. — Tutti i diritti riservati</span>

          {/* TODO_crea pagine e decommenta */}
          {/* <div className="flex gap-6">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Cookie Policy</a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
