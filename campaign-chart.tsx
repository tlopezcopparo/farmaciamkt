'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Campaign } from '@/lib/types'
import { CAMPAIGN_TYPE_LABELS } from '@/lib/types'

interface CampaignChartProps {
  campaigns: Campaign[]
}

export function CampaignChart({ campaigns }: CampaignChartProps) {
  // Prepare data for the chart - participation by campaign
  const chartData = campaigns
    .filter((c) => c.status !== 'borrador')
    .slice(0, 6)
    .map((campaign) => ({
      name: campaign.name.length > 20 ? campaign.name.substring(0, 20) + '...' : campaign.name,
      participacion: campaign.participation,
      tipo: CAMPAIGN_TYPE_LABELS[campaign.type],
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de Campañas</CardTitle>
        <CardDescription>Tasa de participación por campaña reciente</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
              <YAxis
                type="category"
                dataKey="name"
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, 'Participación']}
                labelFormatter={(label) => `Campaña: ${label}`}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar
                dataKey="participacion"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
