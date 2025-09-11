import { useEffect, useState } from 'react'

const PerformanceMonitor = ({ enabled = false }) => {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  })

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
            }
            break
          case 'largest-contentful-paint':
            setMetrics(prev => ({ ...prev, lcp: Math.round(entry.startTime) }))
            break
          case 'first-input':
            setMetrics(prev => ({ ...prev, fid: Math.round(entry.processingStart - entry.startTime) }))
            break
          case 'layout-shift':
            if (!entry.hadRecentInput) {
              setMetrics(prev => ({ ...prev, cls: prev.cls + entry.value }))
            }
            break
          case 'navigation':
            setMetrics(prev => ({ ...prev, ttfb: Math.round(entry.responseStart - entry.requestStart) }))
            break
        }
      }
    })

    // Observe all performance entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] })
    } catch (e) {
      console.warn('Performance Observer not fully supported')
    }

    return () => observer.disconnect()
  }, [enabled])

  if (!enabled) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50 backdrop-blur-sm">
      <div className="mb-2 font-bold text-[#d4af37]">Performance</div>
      <div>FCP: {metrics.fcp}ms</div>
      <div>LCP: {metrics.lcp}ms</div>
      <div>FID: {metrics.fid}ms</div>
      <div>CLS: {metrics.cls.toFixed(3)}</div>
      <div>TTFB: {metrics.ttfb}ms</div>
    </div>
  )
}

export default PerformanceMonitor
