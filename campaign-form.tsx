'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Campaign, CampaignType, PharmacyCategory, Product } from '@/lib/types'
import {
  CAMPAIGN_TYPE_LABELS,
  ARGENTINA_PROVINCES,
  PHARMACY_CATEGORY_LABELS,
} from '@/lib/types'
import { mockProducts } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Package, Building2, Info, CheckCircle } from 'lucide-react'

const campaignFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  type: z.enum(['descuento', 'promocion', 'lanzamiento', 'fidelizacion']),
  startDate: z.string().min(1, 'La fecha de inicio es requerida'),
  endDate: z.string().min(1, 'La fecha de fin es requerida'),
  products: z.array(z.string()),
  provinces: z.array(z.string()),
  categories: z.array(z.enum(['A', 'B', 'C'])),
})

type CampaignFormData = z.infer<typeof campaignFormSchema>

interface CampaignFormProps {
  campaign?: Campaign
  mode: 'create' | 'edit'
}

export function CampaignForm({ campaign, mode }: CampaignFormProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('info')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: campaign?.name || '',
      description: campaign?.description || '',
      type: campaign?.type || 'promocion',
      startDate: campaign?.startDate || '',
      endDate: campaign?.endDate || '',
      products: campaign?.products || [],
      provinces: campaign?.pharmacySegment?.provinces || [],
      categories: campaign?.pharmacySegment?.categories || [],
    },
  })

  const selectedProducts = form.watch('products')
  const selectedProvinces = form.watch('provinces')
  const selectedCategories = form.watch('categories')

  const onSubmit = async (data: CampaignFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success(
      mode === 'create'
        ? 'Campaña creada exitosamente'
        : 'Campaña actualizada exitosamente'
    )
    router.push('/campanas')
  }

  const tabs = [
    { id: 'info', label: 'Información', icon: Info },
    { id: 'products', label: 'Productos', icon: Package },
    { id: 'segmentation', label: 'Segmentación', icon: Building2 },
    { id: 'review', label: 'Revisión', icon: CheckCircle },
  ]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="info" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Define el nombre, descripción y fechas de la campaña
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la Campaña</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Promoción Invierno 2026" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el objetivo y detalles de la campaña..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Campaña</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(CAMPAIGN_TYPE_LABELS).map(([key, label]) => (
                            <SelectItem key={key} value={key}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Inicio</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha de Fin</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="button" onClick={() => setActiveTab('products')}>
                Siguiente: Productos
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Selección de Productos</CardTitle>
                <CardDescription>
                  Selecciona los productos que incluirás en la campaña
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="products"
                  render={() => (
                    <FormItem>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {mockProducts.map((product) => (
                          <FormField
                            key={product.id}
                            control={form.control}
                            name="products"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={product.id}
                                  className="flex items-start space-x-3 space-y-0 rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(product.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, product.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== product.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-medium cursor-pointer">
                                      {product.name}
                                    </FormLabel>
                                    <FormDescription className="text-xs">
                                      {product.laboratory} - {product.sku}
                                    </FormDescription>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedProducts.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      {selectedProducts.length} producto(s) seleccionado(s)
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setActiveTab('info')}>
                Anterior
              </Button>
              <Button type="button" onClick={() => setActiveTab('segmentation')}>
                Siguiente: Segmentación
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="segmentation" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Segmentación de Farmacias</CardTitle>
                <CardDescription>
                  Define qué farmacias recibirán esta campaña
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="provinces"
                  render={() => (
                    <FormItem>
                      <FormLabel>Provincias</FormLabel>
                      <FormDescription>
                        Deja vacío para incluir todas las provincias
                      </FormDescription>
                      <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4 mt-2">
                        {ARGENTINA_PROVINCES.map((province) => (
                          <FormField
                            key={province}
                            control={form.control}
                            name="provinces"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={province}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(province)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, province])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== province
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    {province}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categories"
                  render={() => (
                    <FormItem>
                      <FormLabel>Categorías de Farmacias</FormLabel>
                      <FormDescription>
                        Deja vacío para incluir todas las categorías
                      </FormDescription>
                      <div className="flex gap-4 mt-2">
                        {(['A', 'B', 'C'] as PharmacyCategory[]).map((category) => (
                          <FormField
                            key={category}
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={category}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(category)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, category])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== category
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal cursor-pointer">
                                    Categoría {category}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setActiveTab('products')}>
                Anterior
              </Button>
              <Button type="button" onClick={() => setActiveTab('review')}>
                Siguiente: Revisión
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="review" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revisión de la Campaña</CardTitle>
                <CardDescription>
                  Verifica los datos antes de {mode === 'create' ? 'crear' : 'guardar'} la campaña
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Nombre</h4>
                    <p className="mt-1">{form.watch('name') || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Tipo</h4>
                    <p className="mt-1">
                      {CAMPAIGN_TYPE_LABELS[form.watch('type') as CampaignType] || '-'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Fecha de Inicio</h4>
                    <p className="mt-1">{form.watch('startDate') || '-'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Fecha de Fin</h4>
                    <p className="mt-1">{form.watch('endDate') || '-'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Descripción</h4>
                  <p className="mt-1">{form.watch('description') || '-'}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Productos ({selectedProducts.length})
                  </h4>
                  {selectedProducts.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedProducts.map((productId) => {
                        const product = mockProducts.find((p) => p.id === productId)
                        return product ? (
                          <Badge key={productId} variant="secondary">
                            {product.name}
                          </Badge>
                        ) : null
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Sin productos seleccionados</p>
                  )}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    Segmentación
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm">Provincias: </span>
                      {selectedProvinces.length > 0 ? (
                        <span className="text-sm">{selectedProvinces.join(', ')}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Todas</span>
                      )}
                    </div>
                    <div>
                      <span className="text-sm">Categorías: </span>
                      {selectedCategories.length > 0 ? (
                        <span className="text-sm">
                          {selectedCategories.map((c) => `Cat. ${c}`).join(', ')}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Todas</span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab('segmentation')}
              >
                Anterior
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {mode === 'create' ? 'Crear Campaña' : 'Guardar Cambios'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
