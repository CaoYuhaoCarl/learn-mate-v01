import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface SkillRadarProps {
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }>
  } | null
}

export function SkillRadar({ data }: SkillRadarProps) {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skill Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <Radar data={data} options={options} />
      </CardContent>
    </Card>
  )
}