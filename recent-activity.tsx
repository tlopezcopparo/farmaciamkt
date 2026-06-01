import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ActivityItem } from '@/lib/types'
import { formatDateTime } from '@/lib/mock-data'
import { Megaphone, Package, Building2, Play, CheckCircle } from 'lucide-react'

interface RecentActivityProps {
  activities: ActivityItem[]
}

const activityIcons: Record<ActivityItem['type'], typeof Megaphone> = {
  campaign_created: Megaphone,
  campaign_started: Play,
  campaign_ended: CheckCircle,
  product_added: Package,
  pharmacy_joined: Building2,
}

const activityColors: Record<ActivityItem['type'], string> = {
  campaign_created: 'bg-blue-100 text-blue-600',
  campaign_started: 'bg-green-100 text-green-600',
  campaign_ended: 'bg-gray-100 text-gray-600',
  product_added: 'bg-purple-100 text-purple-600',
  pharmacy_joined: 'bg-amber-100 text-amber-600',
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
        <CardDescription>Últimos eventos en la plataforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay actividad reciente
            </p>
          ) : (
            activities.slice(0, 6).map((activity) => {
              const Icon = activityIcons[activity.type]
              const colorClass = activityColors[activity.type]
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${colorClass}`}>
                    <Icon className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
