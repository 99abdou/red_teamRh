import { useState, useEffect } from 'react'

export const useCounter = (endValue: number, duration = 2000, delay = 0) => {
  const [count, setCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true)
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Fonction d'easing pour une animation plus naturelle
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentValue)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(endValue)
          setIsAnimating(false)
        }
      }
      
      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [endValue, duration, delay])

  return { count, isAnimating }
} 