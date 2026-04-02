import { useEffect, useRef } from 'react'
import styles from './PigeonHunt.module.css'

const W = 800
const H = 450
const HIT_RADIUS = 32
const TOTAL_ROUNDS = 5
const STARS = [
  [50,30],[120,80],[200,20],[350,50],[500,30],
  [650,70],[720,20],[780,90],[100,120],[400,100],
  [300,60],[600,40],[160,140],[560,110],[440,25],
]

const ROUNDS = [
  { count: 2, speed: 1.5, shots: 3 },
  { count: 2, speed: 2.2, shots: 3 },
  { count: 3, speed: 2.5, shots: 3 },
  { count: 3, speed: 3.2, shots: 4 },
  { count: 4, speed: 3.8, shots: 5 },
]

function makePigeon(speed) {
  const fromLeft = Math.random() > 0.5
  const spd = speed * (0.8 + Math.random() * 0.4)
  return {
    x: fromLeft ? -50 : W + 50,
    y: 80 + Math.random() * (H - 220),
    vx: fromLeft ? spd : -spd,
    sineOffset: Math.random() * Math.PI * 2,
    sineAmp: 12 + Math.random() * 18,
    alive: true,
    shot: false,
    fallVy: 0,
    opacity: 1,
  }
}

function drawBackground(ctx) {
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, '#0e0018')
  sky.addColorStop(0.75, '#1a0028')
  sky.addColorStop(1, '#240038')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  // Stars
  ctx.fillStyle = 'rgba(232,197,58,0.5)'
  STARS.forEach(([sx, sy]) => ctx.fillRect(sx, sy, 2, 2))

  // Ground
  ctx.fillStyle = '#200030'
  ctx.fillRect(0, H - 55, W, 55)
  ctx.strokeStyle = 'rgba(232,197,58,0.25)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, H - 55)
  ctx.lineTo(W, H - 55)
  ctx.stroke()
}

function drawPigeon(ctx, p, t) {
  if (!p.alive && !p.shot) return
  ctx.save()
  ctx.globalAlpha = p.opacity
  ctx.translate(p.x, p.y)
  if (p.vx < 0) ctx.scale(-1, 1)

  const flap = Math.sin(t * 10 + p.sineOffset) > 0
  const wingY = flap ? -9 : 5

  ctx.shadowColor = '#e8c53a'
  ctx.shadowBlur = 8
  ctx.strokeStyle = '#e8c53a'
  ctx.lineWidth = 1.5
  ctx.fillStyle = 'rgba(232,197,58,0.12)'

  // Body
  ctx.beginPath()
  ctx.ellipse(0, 0, 16, 9, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Wing
  ctx.beginPath()
  ctx.ellipse(2, wingY, 13, 5, flap ? -0.25 : 0.2, 0, Math.PI * 2)
  ctx.stroke()

  // Head
  ctx.beginPath()
  ctx.arc(18, -5, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Eye
  ctx.shadowBlur = 0
  ctx.fillStyle = '#1a0028'
  ctx.beginPath()
  ctx.arc(20, -6, 2.5, 0, Math.PI * 2)
  ctx.fill()

  // Beak
  ctx.shadowBlur = 4
  ctx.shadowColor = '#e8c53a'
  ctx.fillStyle = '#e8c53a'
  ctx.beginPath()
  ctx.moveTo(24, -5)
  ctx.lineTo(33, -3)
  ctx.lineTo(24, -2)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

function drawHUD(ctx, round, ammo, score, totalShots) {
  ctx.save()
  ctx.shadowColor = '#e8c53a'
  ctx.shadowBlur = 8
  ctx.fillStyle = '#e8c53a'
  ctx.font = '11px "Press Start 2P", monospace'

  ctx.textAlign = 'left'
  ctx.fillText(`ROUND ${round}/${TOTAL_ROUNDS}`, 20, 28)

  ctx.textAlign = 'right'
  ctx.fillText(`SCORE  ${String(score).padStart(5, '0')}`, W - 20, 28)

  // Ammo bullets
  ctx.textAlign = 'center'
  ctx.fillText('AMMO', W / 2, 28)
  const startX = W / 2 - ((totalShots - 1) * 24) / 2
  for (let i = 0; i < totalShots; i++) {
    const bx = startX + i * 24
    if (i < ammo) {
      ctx.fillStyle = '#e8c53a'
      ctx.shadowBlur = 10
    } else {
      ctx.fillStyle = 'rgba(232,197,58,0.18)'
      ctx.shadowBlur = 0
    }
    // Bullet shape (manual rounded rect for browser compatibility)
    const bLeft = bx - 5, bTop = 34, bW = 10, bH = 14, r = 2
    ctx.beginPath()
    ctx.moveTo(bLeft + r, bTop)
    ctx.lineTo(bLeft + bW - r, bTop)
    ctx.arcTo(bLeft + bW, bTop, bLeft + bW, bTop + r, r)
    ctx.lineTo(bLeft + bW, bTop + bH - r)
    ctx.arcTo(bLeft + bW, bTop + bH, bLeft + bW - r, bTop + bH, r)
    ctx.lineTo(bLeft + r, bTop + bH)
    ctx.arcTo(bLeft, bTop + bH, bLeft, bTop + bH - r, r)
    ctx.lineTo(bLeft, bTop + r)
    ctx.arcTo(bLeft, bTop, bLeft + r, bTop, r)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()
}

function drawFlash(ctx, pos, timer) {
  if (!pos || timer <= 0) return
  ctx.save()
  ctx.globalAlpha = (timer / 10) * 0.7
  ctx.fillStyle = '#fff8cc'
  ctx.shadowColor = '#e8c53a'
  ctx.shadowBlur = 30
  ctx.beginPath()
  ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawOverlay(ctx, text1, text2) {
  ctx.save()
  ctx.fillStyle = 'rgba(10,0,20,0.75)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.shadowColor = '#e8c53a'
  ctx.shadowBlur = 18
  ctx.fillStyle = '#e8c53a'
  ctx.font = '20px "Press Start 2P", monospace'
  ctx.fillText(text1, W / 2, H / 2 - 18)
  if (text2) {
    ctx.font = '11px "Press Start 2P", monospace'
    ctx.shadowBlur = 10
    ctx.fillText(text2, W / 2, H / 2 + 20)
  }
  ctx.restore()
}

export default function PigeonHunt() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const state = {
      phase: 'idle', // idle | playing | roundEnd | gameOver
      round: 1,
      ammo: ROUNDS[0].shots,
      score: 0,
      hits: 0,
      pigeons: [],
      flash: null,
      flashTimer: 0,
      resultTimer: 0,
      t: 0,
    }

    function spawnRound() {
      const cfg = ROUNDS[state.round - 1]
      state.pigeons = Array.from({ length: cfg.count }, () => makePigeon(cfg.speed))
      state.ammo = cfg.shots
      state.hits = 0
      state.phase = 'playing'
    }

    function update() {
      state.t += 0.016

      if (state.phase === 'playing') {
        if (state.flashTimer > 0) state.flashTimer--

        state.pigeons.forEach(p => {
          if (!p.alive) return
          if (p.shot) {
            p.fallVy += 0.45
            p.y += p.fallVy
            p.opacity = Math.max(0, p.opacity - 0.04)
            if (p.y > H + 20) p.alive = false
            return
          }
          p.x += p.vx
          p.y += Math.sin(state.t * 4 + p.sineOffset) * p.sineAmp * 0.05
          if (p.x < -60 || p.x > W + 60) p.alive = false
        })

        // Check round end
        const anyActive = state.pigeons.some(p => p.alive && !p.shot)
        const anyFalling = state.pigeons.some(p => p.alive && p.shot)
        if (!anyActive && !anyFalling) {
          state.phase = 'roundEnd'
          state.resultTimer = 130
        }
      }

      if (state.phase === 'roundEnd') {
        state.resultTimer--
        if (state.resultTimer <= 0) {
          if (state.round >= TOTAL_ROUNDS) {
            state.phase = 'gameOver'
          } else {
            state.round++
            spawnRound()
          }
        }
      }
    }

    function render() {
      drawBackground(ctx)
      state.pigeons.forEach(p => drawPigeon(ctx, p, state.t))
      drawFlash(ctx, state.flash, state.flashTimer)
      drawHUD(ctx, state.round, state.ammo, state.score, ROUNDS[state.round - 1].shots)

      if (state.phase === 'idle') {
        drawOverlay(ctx, 'CLICK TO START', 'SHOOT THE PIGEONS')
      }
      if (state.phase === 'roundEnd') {
        const total = ROUNDS[state.round - 1].count
        const next = state.round < TOTAL_ROUNDS ? 'NEXT ROUND...' : null
        drawOverlay(ctx, `${state.hits}/${total} HIT`, next)
      }
      if (state.phase === 'gameOver') {
        drawOverlay(ctx, 'GAME OVER', `SCORE ${String(state.score).padStart(5,'0')}  |  CLICK TO RETRY`)
      }
    }

    let animId
    function loop() {
      animId = requestAnimationFrame(loop)
      update()
      render()
    }

    document.fonts.ready.then(() => loop())

    function onClick(e) {
      const rect = canvas.getBoundingClientRect()
      const cx = (e.clientX - rect.left) * (W / rect.width)
      const cy = (e.clientY - rect.top) * (H / rect.height)

      if (state.phase === 'idle') { spawnRound(); return }
      if (state.phase === 'gameOver') {
        state.round = 1
        state.score = 0
        spawnRound()
        return
      }
      if (state.phase !== 'playing' || state.ammo <= 0) return

      state.ammo--
      state.flash = { x: cx, y: cy }
      state.flashTimer = 10

      for (const p of state.pigeons) {
        if (!p.alive || p.shot) continue
        const dx = p.x - cx, dy = p.y - cy
        if (Math.hypot(dx, dy) < HIT_RADIUS) {
          p.shot = true
          p.fallVy = -1.5
          state.hits++
          state.score += 100 + state.ammo * 50
          break
        }
      }

      if (state.ammo <= 0) {
        // Remaining pigeons flee fast
        state.pigeons.forEach(p => { if (!p.shot && p.alive) p.vx *= 4 })
      }
    }

    canvas.addEventListener('click', onClick)
    return () => {
      cancelAnimationFrame(animId)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className={styles.canvas}
    />
  )
}
