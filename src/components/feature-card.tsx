import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode
  title: string
  description: string
}

export function FeatureCard({ 
  icon, 
  title, 
  description, 
  className,
  ...props 
}: FeatureCardProps) {
  return (
    <Card className={cn("hover:border-primary/50", className)} {...props}>
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}