import { useState } from 'react'
import styles from './ContactSection.module.css'
import CrosshairSVG from '../svg/CrosshairSVG'

export default function ContactSection() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')
  const [status,  setStatus]  = useState('idle') // 'idle' | 'sending' | 'success' | 'error'

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from_name: name, from_email: email, message }),
      })

      if (!res.ok) throw new Error()
      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contacts" className={styles.section}>
      <div className={styles.iconWrap}>
        <CrosshairSVG />
      </div>

      <h2 className={styles.title}>CONTACT US</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="name">NAME</label>
            <input
              id="name"
              type="text"
              placeholder="YOUR NAME"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">EMAIL</label>
            <input
              id="email"
              type="email"
              placeholder="YOUR EMAIL"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="message">MESSAGE</label>
          <textarea
            id="message"
            rows={3}
            placeholder="YOUR MESSAGE"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className={styles.submitWrap}>
          <button
            type="submit"
            className={styles.btn}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'SENDING...' : 'SEND'}
          </button>
        </div>

        {status === 'success' && (
          <p className={styles.statusSuccess}>MESSAGE SENT!</p>
        )}
        {status === 'error' && (
          <p className={styles.statusError}>ERROR. TRY AGAIN.</p>
        )}
      </form>
    </section>
  )
}
