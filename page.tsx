import { mockCampaigns } from '@/lib/mock-data'
import { CampaignCalendar } from '@/components/calendar/campaign-calendar'

export default function CalendarioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendario de Campañas</h1>
        <p className="text-muted-foreground">
          Visualiza todas las campañas en una vista de calendario mensual.
        </p>
      </div>

      <CampaignCalendar campaigns={mockCampaigns} />
    </div>
  )
}
