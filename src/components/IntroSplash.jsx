import { useEffect, useState } from 'react'
import { ArrowRight, BookOpen, Lightbulb, Trophy } from 'lucide-react'

const INTRO_SEEN_KEY = 'pmu-education:intro-seen'
const INTRO_DURATION_MS = 5000

const learningSteps = [
  { label: 'Discover', Icon: BookOpen },
  { label: 'Learn', Icon: Lightbulb },
  { label: 'Grow', Icon: Trophy },
]

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(
    () => !window.sessionStorage.getItem(INTRO_SEEN_KEY),
  )

  useEffect(() => {
    if (!isVisible) return undefined

    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : INTRO_DURATION_MS
    const timeoutId = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
      setIsVisible(false)
    }, duration)

    return () => window.clearTimeout(timeoutId)
  }, [isVisible])

  function skipIntro() {
    window.sessionStorage.setItem(INTRO_SEEN_KEY, 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="pmu-intro"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pmu-intro-title"
    >
      <div className="pmu-intro-orbit" aria-hidden="true" />
      <div className="pmu-intro-glow" aria-hidden="true" />

      <button
        type="button"
        autoFocus
        onClick={skipIntro}
        className="pmu-intro-skip"
      >
        Skip intro <ArrowRight size={15} />
      </button>

      <div className="pmu-intro-content">
        <div className="pmu-intro-brand">
          <div className="pmu-intro-logo">
            <img src="/PMU%20Education.png" alt="" />
          </div>
          <p className="pmu-intro-kicker">Welcome to</p>
          <h1 id="pmu-intro-title">PMU Education</h1>
        </div>

        <p className="pmu-intro-eyebrow">Discover · Learn · Grow</p>
        <h2 className="pmu-intro-heading">
          Your next chapter
          <br />
          starts here.
        </h2>

        <div className="pmu-intro-steps" aria-hidden="true">
          {learningSteps.map(({ label, Icon }, index) => (
            <div
              key={label}
              className={`pmu-intro-step pmu-intro-step-${index + 1}`}
            >
              <span className="pmu-intro-step-icon">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <p className="pmu-intro-caption">A little curiosity can take you anywhere.</p>
      </div>

      <div className="pmu-intro-progress" aria-hidden="true">
        <span />
      </div>
    </div>
  )
}
