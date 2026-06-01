import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Campaign } from '@/lib/types'
import { CAMPAIGN_TYPE_LABELS } from '@/lib/types'
import { formatDate } from '@/lib/mock-data'
import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

interface UpcomingCampaignsProps {
  campaigns: Campaign[]
}

function getDaysUntilEnd(endDate: string): number {
  const end = new Date(endDate)
  const today = new Date()
  const diffTime = end.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function UpcomingCampaigns({ campaigns }: UpcomingCampaignsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas a Vencer</CardTitle>
        <CardDescription>Campañas activas por fecha de finalización</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay campañas activas
            </p>
          ) : (
            campaigns.map((campaign) => {
              const daysLeft = getDaysUntilEnd(campaign.endDate)
              const isUrgent = daysLeft <= 7
              return (
                <Link
                  key={campaign.id}
                  href={`/campanas/${campaign.id}`}
                  className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{campaign.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {CAMPAIGN_TYPE_LABELS[campaign.type]}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(campaign.endDate)}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 text-xs font-medium ${
                      isUrgent ? 'text-destructive' : 'text-muted-foreground'
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {daysLeft > 0 ? `${daysLeft} días` : 'Finaliza hoy'}
                  </div>
                </Link>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
