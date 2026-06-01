'use client'

import { useState } from 'react'
import type { Pharmacy, PharmacyFilters, PharmacyCategory } from '@/lib/types'
import { PHARMACY_CATEGORY_LABELS } from '@/lib/types'
import { formatCurrency } from '@/lib/mock-data'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Building2, Eye, Mail, Phone, MapPin } from 'lucide-react'

interface PharmacyTableProps {
  pharmacies: Pharmacy[]
  filters: PharmacyFilters
}

export function PharmacyTable({ pharmacies, filters }: PharmacyTableProps) {
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null)

  // Filter pharmacies
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (filters.province && pharmacy.province !== filters.province) return false
    if (filters.category && pharmacy.category !== filters.category) return false
    if (filters.status && pharmacy.status !== filters.status) return false
    if (
      filters.search &&
      !pharmacy.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !pharmacy.city.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  const getCategoryBadgeVariant = (category: PharmacyCategory) => {
    switch (category) {
      case 'A':
        return 'default'
      case 'B':
        return 'secondary'
      case 'C':
        return 'outline'
    }
  }

  return (
    <>
      {filteredPharmacies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No se encontraron farmacias</h3>
          <p className="text-sm text-muted-foreground">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Vol. Mensual</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.id}>
                  <TableCell className="font-medium">{pharmacy.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{pharmacy.city}</div>
                      <div className="text-muted-foreground">{pharmacy.province}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryBadgeVariant(pharmacy.category)}>
                      Cat. {pharmacy.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{pharmacy.contactName}</div>
                  </TableCell>
                  <TableCell>{formatCurrency(pharmacy.monthlyVolume)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={pharmacy.status === 'activa' ? 'default' : 'secondary'}
                      className={
                        pharmacy.status === 'activa'
                          ? 'bg-green-100 text-green-700 hover:bg-green-100'
                          : ''
                      }
                    >
                      {pharmacy.status === 'activa' ? 'Activa' : 'Inactiva'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPharmacy(pharmacy)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!selectedPharmacy} onOpenChange={() => setSelectedPharmacy(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedPharmacy?.name}</DialogTitle>
            <DialogDescription>Detalles de la farmacia</DialogDescription>
          </DialogHeader>
          {selectedPharmacy && (
            <div className="space-y-4">
              <div className="grid gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <div>{selectedPharmacy.address}</div>
                    <div className="text-muted-foreground">
                      {selectedPharmacy.city}, {selectedPharmacy.province}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPharmacy.contactPhone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{selectedPharmacy.contactEmail}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-muted-foreground">Categoría</div>
                  <div className="font-medium">
                    {PHARMACY_CATEGORY_LABELS[selectedPharmacy.category]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Vol. Mensual</div>
                  <div className="font-medium">
                    {formatCurrency(selectedPharmacy.monthlyVolume)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Estado</div>
                  <Badge
                    variant={selectedPharmacy.status === 'activa' ? 'default' : 'secondary'}
                    className={
                      selectedPharmacy.status === 'activa'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : ''
                    }
                  >
                    {selectedPharmacy.status === 'activa' ? 'Activa' : 'Inactiva'}
                  </Badge>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Contacto</div>
                  <div className="font-medium">{selectedPharmacy.contactName}</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
