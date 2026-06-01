'use client'

import type { ProductFilters, ProductCategory } from '@/lib/types'
import { PRODUCT_CATEGORY_LABELS } from '@/lib/types'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  laboratories: string[]
}

export function ProductFiltersBar({
  filters,
  onFiltersChange,
  laboratories,
}: ProductFiltersProps) {
  const hasFilters = filters.category || filters.laboratory || filters.search

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre o SKU..."
          value={filters.search || ''}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value || undefined })
          }
          className="pl-9"
        />
      </div>
      <div className="flex gap-2">
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              category: value === 'all' ? undefined : (value as ProductCategory),
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {Object.entries(PRODUCT_CATEGORY_LABELS).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.laboratory || 'all'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              laboratory: value === 'all' ? undefined : value,
            })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Laboratorio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los laboratorios</SelectItem>
            {laboratories.map((lab) => (
              <SelectItem key={lab} value={lab}>
                {lab}
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
  )
}
