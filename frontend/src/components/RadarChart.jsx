import { useEffect, useRef } from 'react'
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js'

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip)

export default function RadarChart({ tactics }) {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !tactics) return

    if (chartRef.current) chartRef.current.destroy()

    const scores = tactics.map((t) => t.score)
    const labels = tactics.map((t) => t.name)

    chartRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            data: scores,
            borderColor: '#E24B4A',
            backgroundColor: 'rgba(226, 75, 74, 0.12)',
            borderWidth: 1.5,
            pointBackgroundColor: '#E24B4A',
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.raw}/100`,
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(255,255,255,0.07)' },
            angleLines: { color: 'rgba(255,255,255,0.07)' },
            pointLabels: {
              font: { family: 'Space Mono, monospace', size: 9 },
              color: 'rgba(255,255,255,0.45)',
            },
          },
        },
      },
    })

    return () => {
      if (chartRef.current) chartRef.current.destroy()
    }
  }, [tactics])

  return (
    <div className="relative w-full" style={{ maxHeight: '240px' }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Radar chart showing psychological influence tactic scores"
      />
    </div>
  )
}
