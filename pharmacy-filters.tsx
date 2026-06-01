'use client'

import type { PharmacyFilters, PharmacyCategory } from '@/lib/types'
import { PHARMACY_CATEGORY_LABELS } from '@/lib/types'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X, Download } from 'lucide-react'

interface PharmacyFiltersProps {
  filters: PharmacyFilters
  onFiltersChange: (filters: PharmacyFilters) => void
  provinces: string[]
  onExport: () => void
}

export function PharmacyFiltersBar({
  filters,
  onFiltersChange,
  provinces,
  onExport,
}: PharmacyFiltersProps) {
  const hasFilters =
    filters.province || filters.category || filters.status || filters.search

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:flex-1">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o ciudad..."
            value={filters.search || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value || undefined })
            }
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select
            value={filters.province || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                province: value === 'all' ? undefined : value,
              })
            }
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Provincia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las provincias</SelectItem>
              {provinces.map((province) => (
                <SelectItem key={province} value={province}>
                  {province}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.category || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                category: value === 'all' ? undefined : (value as PharmacyCategory),
              })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {Object.entries(PHARMACY_CATEGORY_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  Cat. {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={filters.status || 'all'}
            onValueChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value === 'all' ? undefined : (value as 'activa' | 'inactiva'),
              })
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="activa">Activa</SelectItem>
              <SelectItem value="inactiva">Inactiva</SelectItem>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Button variant="outline" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Exportar CSV
      </Button>
    </div>
  )
}
