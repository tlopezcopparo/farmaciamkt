'use client'

import { useState } from 'react'
import type { Product, ProductFilters } from '@/lib/types'
import { PRODUCT_CATEGORY_LABELS } from '@/lib/types'
import { formatCurrency } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Package, Eye } from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  filters: ProductFilters
}

export function ProductGrid({ products, filters }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false
    if (filters.laboratory && product.laboratory !== filters.laboratory) return false
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !product.sku.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <>
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No se encontraron productos</h3>
          <p className="text-sm text-muted-foreground">
            Intenta ajustar los filtros de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium leading-tight line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.laboratory}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {PRODUCT_CATEGORY_LABELS[product.category]}
                    </Badge>
                    <span className="text-sm font-medium">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-muted-foreground">
                      SKU: {product.sku}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.laboratory}</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Package className="h-20 w-20 text-muted-foreground/50" />
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Categoría</span>
                  <Badge variant="outline">
                    {PRODUCT_CATEGORY_LABELS[selectedProduct.category]}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU</span>
                  <span className="font-mono">{selectedProduct.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Precio</span>
                  <span className="font-medium">
                    {formatCurrency(selectedProduct.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock</span>
                  <span>{selectedProduct.stock.toLocaleString('es-AR')} unidades</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-muted-foreground">{selectedProduct.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
