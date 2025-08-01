import transporter from '../../configs/mail.js'

export const sendVerificationEmail = async (email, code) => {
  const html = `
    <h2>Bienvenido a la Plataforma de Tutorías</h2>
    <p>Gracias por registrarte.</p>
    <p>Tu código de verificación es:</p>
    <h3 style="color: blue;">${code}</h3>
  `

  const mailOptions = {
    from: `"Sistema de Tutorías" <${process.env.EMAIL_APP}>`,
    to: email,
    subject: 'Código de verificación - Plataforma de Tutorías',
    html
  }

  await transporter.sendMail(mailOptions)
}
