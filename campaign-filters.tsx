'use client'

import Link from 'next/link'
import type { CampaignFilters, CampaignStatus, CampaignType } from '@/lib/types'
import { CAMPAIGN_TYPE_LABELS, CAMPAIGN_STATUS_LABELS } from '@/lib/types'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X, Plus } from 'lucide-react'

interface CampaignFiltersProps {
  filters: CampaignFilters
  onFiltersChange: (filters: CampaignFilters) => void
}

export function CampaignFiltersBar({
  filters,
  onFiltersChange,
}: CampaignFiltersProps) {
  const hasFilters = filters.status || filters.type || filters.search

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-1">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar campaña..."
            value={filters.search || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value || undefined })
            }
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value === 'all' ? undefined : (value as CampaignStatus),
              })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              {Object.entries(CAMPAIGN_STATUS_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.type || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                type: value === 'all' ? undefined : (value as CampaignType),
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              {Object.entries(CAMPAIGN_TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Button asChild>
        <Link href="/campanas/nueva">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Campaña
        </Link>
      </Button>
    </div>
  )
}
