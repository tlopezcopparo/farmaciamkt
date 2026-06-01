// Campaign types
export type CampaignType = 'descuento' | 'promocion' | 'lanzamiento' | 'fidelizacion'
export type CampaignStatus = 'borrador' | 'activa' | 'finalizada'

export interface PharmacySegment {
  provinces: string[]
  categories: PharmacyCategory[]
  minVolume?: number
  maxVolume?: number
}

export interface Campaign {
  id: string
  name: string
  description: string
  type: CampaignType
  status: CampaignStatus
  startDate: string
  endDate: string
  products: string[] // product IDs
  pharmacySegment: PharmacySegment
  reach: number // farmacias alcanzadas
  participation: number // % participación
  createdAt: string
  updatedAt: string
}

// Product types
export type ProductCategory = 'analgesicos' | 'antibioticos' | 'vitaminas' | 'dermocosmetica' | 'otc' | 'receta'

export interface Product {
  id: string
  name: string
  laboratory: string
  category: ProductCategory
  sku: string
  image: string
  price: number
  description: string
  stock: number
}

// Pharmacy types
export type PharmacyCategory = 'A' | 'B' | 'C' // por volumen de compras

export interface Pharmacy {
  id: string
  name: string
  address: string
  city: string
  province: string
  category: PharmacyCategory
  contactName: string
  contactPhone: string
  contactEmail: string
  status: 'activa' | 'inactiva'
  monthlyVolume: number
  joinedDate: string
}

// Dashboard types
export interface KPIData {
  label: string
  value: number | string
  change?: number // percentage change
  trend?: 'up' | 'down' | 'neutral'
}

export interface ActivityItem {
  id: string
  type: 'campaign_created' | 'campaign_started' | 'campaign_ended' | 'product_added' | 'pharmacy_joined'
  description: string
  timestamp: string
  relatedId?: string
}

// Form types for campaign creation
export interface CampaignFormData {
  name: string
  description: string
  type: CampaignType
  startDate: string
  endDate: string
  products: string[]
  pharmacySegment: PharmacySegment
}

// Filter types
export interface CampaignFilters {
  status?: CampaignStatus
  type?: CampaignType
  search?: string
}

export interface ProductFilters {
  category?: ProductCategory
  laboratory?: string
  search?: string
}

export interface PharmacyFilters {
  province?: string
  category?: PharmacyCategory
  status?: 'activa' | 'inactiva'
  search?: string
}

// Constants
export const CAMPAIGN_TYPE_LABELS: Record<CampaignType, string> = {
  descuento: 'Descuento',
  promocion: 'Promoción',
  lanzamiento: 'Lanzamiento',
  fidelizacion: 'Fidelización',
}

export const CAMPAIGN_STATUS_LABELS: Record<CampaignStatus, string> = {
  borrador: 'Borrador',
  activa: 'Activa',
  finalizada: 'Finalizada',
}

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  analgesicos: 'Analgésicos',
  antibioticos: 'Antibióticos',
  vitaminas: 'Vitaminas',
  dermocosmetica: 'Dermocosmética',
  otc: 'OTC',
  receta: 'Receta',
}

export const PHARMACY_CATEGORY_LABELS: Record<PharmacyCategory, string> = {
  A: 'Categoría A (Alto volumen)',
  B: 'Categoría B (Medio volumen)',
  C: 'Categoría C (Bajo volumen)',
}

export const ARGENTINA_PROVINCES = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
]
