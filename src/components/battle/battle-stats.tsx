import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Target, Activity } from 'lucide-react'
import { useBattleStats } from '@/hooks/use-battle-stats'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function BattleStats() {
  const { stats, loading } = useBattleStats()

  if (loading) return <div>Loading stats...</div>
  if (!stats) return null

  const chartData = {
    labels: stats.dates,
    datasets: [
      {
        label: 'Your Score',
        data: stats.scores,
        borderColor: 'rgb(75, 140, 80)',
        backgroundColor: 'rgba(75, 140, 80, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Opponent Score',
        data: stats.opponentScores,
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalGames} total games
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">
              Points per game
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Score</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.bestScore}</div>
            <p className="text-xs text-muted-foreground">
              Personal record
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} options={options} className="h-[300px]" />
        </CardContent>
      </Card>
    </div>
  )
}