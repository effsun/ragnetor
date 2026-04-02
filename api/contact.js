export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { from_name, from_email, message } = req.body

  if (!from_name || !from_email || !message) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  if (from_name.length > 100 || from_email.length > 200 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long' })
  }

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id:  process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id:     process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: { from_name, from_email, message },
    }),
  })

  if (!response.ok) {
    return res.status(500).json({ error: 'Failed to send email' })
  }

  return res.status(200).json({ ok: true })
}
