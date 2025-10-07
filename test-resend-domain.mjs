import { Resend } from "resend"

const resend = new Resend("re_JmfzChnp_LTncPg737gXwZiC1jmqAPJJm")

await resend.emails.send({
  from: "contact@troisiemechemin.fr",
  to: "leo.gayrard@gmail.com",
  subject: "Test depuis contact@troisiemechemin.fr",
  html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6">
      <p>Test d’envoi avec ton vrai domaine configuré sur Resend.</p>
      <p>Si tu reçois ce mail, la configuration DNS est correcte ✅</p>
    </div>
  `,
})

console.log("Email test envoyé depuis le domaine.")
