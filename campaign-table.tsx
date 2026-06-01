'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Campaign, CampaignFilters, CampaignStatus, CampaignType } from '@/lib/types'
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_STATUS_LABELS } from '@/lib/types'
import { formatDate } from '@/lib/mock-data'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Megaphone, MoreHorizontal, Eye, Pencil, Copy, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface CampaignTableProps {
  campaigns: Campaign[]
  filters: CampaignFilters
}

export function CampaignTable({ campaigns, filters }: CampaignTableProps) {
  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filters.status && campaign.status !== filters.status) return false
    if (filters.type && campaign.type !== filters.type) return false
    if (
      filters.search &&
      !campaign.name.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  const getStatusBadgeVariant = (status: CampaignStatus) => {
    switch (status) {
      case 'activa':
        return 'default'
      case 'borrador':
        return 'secondary'
      case 'finalizada':
        return 'outline'
    }
  }

  const getStatusBadgeClass = (status: CampaignStatus) => {
    switch (status) {
      case 'activa':
        return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'borrador':
        return 'bg-amber-100 text-amber-700 hover:bg-amber-100'
      case 'finalizada':
        return ''
    }
  }

  const getTypeBadgeClass = (type: CampaignType) => {
    switch (type) {
      case 'descuento':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'promocion':
        return 'bg-purple-100 text-purple-700 border-purple-200'
      case 'lanzamiento':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'fidelizacion':
        return 'bg-rose-100 text-rose-700 border-rose-200'
    }
  }

  const handleDuplicate = (campaign: Campaign) => {
    toast.success(`Campaña "${campaign.name}" duplicada (simulado)`)
  }

  const handleDelete = (campaign: Campaign) => {
    toast.success(`Campaña "${campaign.name}" eliminada (simulado)`)
  }

  return (
    <>
      {filteredCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No se encontraron campañas</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Intenta ajustar los filtros o crea una nueva campaña
          </p>
          <Button asChild>
            <Link href="/campanas/nueva">Crear Campaña</Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Alcance</TableHead>
                <TableHead>Participación</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <Link
                      href={`/campanas/${campaign.id}`}
                      className="font-medium hover:underline"
                    >
                      {campaign.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTypeBadgeClass(campaign.type)}>
                      {CAMPAIGN_TYPE_LABELS[campaign.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(campaign.status)}
                      className={getStatusBadgeClass(campaign.status)}
                    >
                      {CAMPAIGN_STATUS_LABELS[campaign.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{formatDate(campaign.startDate)}</div>
                      <div className="text-muted-foreground">
                        al {formatDate(campaign.endDate)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{campaign.reach} farmacias</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${campaign.participation}%` }}
                        />
                      </div>
                      <span className="text-sm">{campaign.participation}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/campanas/${campaign.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Ver detalles
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/campanas/${campaign.id}/editar`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(campaign)}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(campaign)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
