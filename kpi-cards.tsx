import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Megaphone, Building2, Package, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface KPICardsProps {
  activeCampaigns: number
  totalPharmacies: number
  activePharmacies: number
  totalProducts: number
  avgParticipation: number
}

export function KPICards({
  activeCampaigns,
  totalPharmacies,
  activePharmacies,
  totalProducts,
  avgParticipation,
}: KPICardsProps) {
  const kpis = [
    {
      title: 'Campañas Activas',
      value: activeCampaigns,
      description: 'En ejecución ahora',
      icon: Megaphone,
      trend: null,
    },
    {
      title: 'Farmacias Alcanzadas',
      value: `${activePharmacies}/${totalPharmacies}`,
      description: 'Farmacias activas en la red',
      icon: Building2,
      trend: null,
    },
    {
      title: 'Productos en Catálogo',
      value: totalProducts,
      description: 'Productos disponibles',
      icon: Package,
      trend: null,
    },
    {
      title: 'Tasa de Participación',
      value: `${avgParticipation}%`,
      description: 'Promedio de campañas activas',
      icon: TrendingUp,
      trend: avgParticipation >= 70 ? 'up' : avgParticipation >= 50 ? 'neutral' : 'down',
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {kpi.title}
            </CardTitle>
            <kpi.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p
              className={cn(
                'text-xs',
                kpi.trend === 'up'
                  ? 'text-green-600'
                  : kpi.trend === 'down'
                    ? 'text-red-600'
                    : 'text-muted-foreground'
              )}
            >
              {kpi.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
