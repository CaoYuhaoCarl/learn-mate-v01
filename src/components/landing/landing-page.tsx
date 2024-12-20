import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { GraduationCap, BookOpen, Brain, Trophy } from 'lucide-react'
import { FeatureCard } from '@/components/feature-card'
import { AnimatedBackground } from '@/components/ui/animated-background'

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative py-24 sm:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Master English with AI-Powered Learning
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Personalized learning paths, interactive exercises, and real-time feedback
              to help you achieve fluency faster.
            </p>
            <Button onClick={onGetStarted} size="lg">
              Get Started Free
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 sm:py-32">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose LearnMatePro?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <FeatureCard
                icon={<GraduationCap className="h-6 w-6" />}
                title="Personalized Learning"
                description="AI-driven study plans tailored to your goals and learning style"
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6" />}
                title="Rich Content"
                description="Access to diverse learning materials including audio, video, and text"
              />
              <FeatureCard
                icon={<Brain className="h-6 w-6" />}
                title="Smart Practice"
                description="Interactive exercises that adapt to your progress"
              />
              <FeatureCard
                icon={<Trophy className="h-6 w-6" />}
                title="Track Progress"
                description="Detailed analytics to monitor your improvement"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}