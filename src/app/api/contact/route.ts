import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { nome, email, azienda, messaggio } = await req.json()

    // Validazione server-side
    if (!nome?.trim() || !email?.trim() || !azienda?.trim()) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'KnoWow Contact Form <onboarding@resend.dev>', // sostituire con dominio verificato
      to: 'graziabaiamonte19@gmail.com',
      replyTo: email,
      subject: `Nuovo contatto da ${nome} — ${azienda}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="color: #E9704D; margin-bottom: 24px;">Nuovo messaggio dal form KnoWow</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 120px;">Nome</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${nome}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${email}" style="color: #E9704D;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Azienda</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${azienda}</td>
            </tr>
            ${messaggio?.trim() ? `
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Messaggio</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${messaggio}</td>
            </tr>` : ''}
          </table>

          <p style="margin-top: 32px; font-size: 12px; color: #999;">
            Inviato tramite il form di contatto su knowow.tech
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('[Resend error]', error)
      return NextResponse.json({ error: 'Errore invio email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[Contact API error]', err)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
