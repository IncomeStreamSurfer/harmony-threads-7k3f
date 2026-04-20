// Catalogue source of truth. Derived from the Shopify CSV; three products with variants. Prices in GBP pence.

export type Variant = { sku: string; size: string; color: string; inventory: number; barcode?: string };

export type Product = {
  id: string; slug: string; name: string; tagline: string; vendor: string; type: string;
  description: string; long_description: string[]; highlights: string[];
  price_pence: number; compare_at_pence?: number; currency: 'GBP';
  image_url: string; image_alt: string;
  gallery: { url: string; alt: string }[];
  collections: string[]; tags: string[];
  seo_title: string; seo_description: string;
  variants: Variant[]; weight_g: number; shipping_note: string; care: string[];
};

const p1: Product = {
  id: 'the-band-tee', slug: 'product-one', name: '“The Band” Graphic T-Shirt',
  tagline: 'A love letter to rock, printed on premium cotton.', vendor: 'Harmony Threads', type: 'Graphic shirt',
  description: 'Celebrate the timeless legacy of one of rock music\'s most influential groups with our exclusive The Band Graphic T-Shirt.',
  long_description: [
    'Celebrate the timeless legacy of one of rock music\'s most influential groups with our exclusive The Band Graphic T-Shirt. The print is pulled on a mid-weight 180gsm cotton body that holds its shape after dozens of washes.',
    'Designed in-house and screen-printed in small batches, each shirt is individually inspected before it leaves the studio. Available in three colourways and a full size run.',
    'This is the tee you reach for on gig nights, weekends away, and long-haul flights.',
  ],
  highlights: ['180gsm ringspun combed cotton', 'Screen-printed in small UK batches', 'Pre-shrunk', 'Unisex fit'],
  price_pence: 1999, compare_at_pence: 2499, currency: 'GBP',
  image_url: 'https://burst.shopifycdn.com/photos/forest-hiker.jpg?width=1000',
  image_alt: 'Green t-shirt with The Band graphic',
  gallery: [
    { url: 'https://burst.shopifycdn.com/photos/forest-hiker.jpg?width=1200', alt: 'Green t-shirt with The Band graphic — front' },
    { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80', alt: 'Model wearing The Band graphic tee' },
    { url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=80', alt: 'Folded t-shirts on a table' },
  ],
  collections: ['bestsellers', 'sale'],
  tags: ['unisex', 'clothing', 'casual', 'vintage', 'graphic tee'],
  seo_title: 'Vintage The Band Graphic T-Shirt | MyStore',
  seo_description: 'The Band Graphic T-Shirt. Premium cotton, small-batch screen print, free UK shipping over £40.',
  weight_g: 150, shipping_note: 'Ships in 1-2 working days from our Birmingham studio.',
  care: ['Machine wash cold', 'Tumble dry low', 'Iron reverse', 'Do not dry clean'],
  variants: [
    { sku: 'TheBandTShirt-SG', size: 'S', color: 'Green', inventory: 47, barcode: '5784397765' },
    { sku: 'TheBandTShirt-SA', size: 'S', color: 'Gray', inventory: 42, barcode: '5784397766' },
    { sku: 'TheBandTShirt-SR', size: 'S', color: 'Red', inventory: 51, barcode: '5784397767' },
    { sku: 'TheBandTShirt-MG', size: 'M', color: 'Green', inventory: 38 },
    { sku: 'TheBandTShirt-MA', size: 'M', color: 'Gray', inventory: 44 },
    { sku: 'TheBandTShirt-MR', size: 'M', color: 'Red', inventory: 29 },
    { sku: 'TheBandTShirt-LG', size: 'L', color: 'Green', inventory: 31 },
    { sku: 'TheBandTShirt-LA', size: 'L', color: 'Gray', inventory: 27 },
    { sku: 'TheBandTShirt-LR', size: 'L', color: 'Red', inventory: 22 },
    { sku: 'TheBandTShirt-XG', size: 'XL', color: 'Green', inventory: 18 },
    { sku: 'TheBandTShirt-XA', size: 'XL', color: 'Gray', inventory: 14 },
    { sku: 'TheBandTShirt-XR', size: 'XL', color: 'Red', inventory: 11 },
  ],
};

const p2: Product = {
  id: 'side-a-hoodie', slug: 'product-two', name: '“Side A” Heavyweight Hoodie',
  tagline: 'Fleece-lined, stadium-ready, heirloom soft.', vendor: 'Harmony Threads', type: 'Hoodie',
  description: 'A heavyweight 400gsm pullover hoodie with a brushed fleece interior and embroidered wordmark.',
  long_description: [
    'We spent eighteen months working with a small factory in Portugal to nail the weight, drape and hand-feel. 400gsm cotton blend outer, brushed fleece interior.',
    'Twin-needle kangaroo pocket, flat drawcords, double-lined hood. Embroidered wordmark in tonal thread.',
    'Wear it on the school run, at the gig, or under a wax jacket.',
  ],
  highlights: ['400gsm brushed-back cotton fleece', 'Made in Portugal', 'Twin-needle pocket', 'Pre-washed'],
  price_pence: 5900, compare_at_pence: 7500, currency: 'GBP',
  image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80',
  image_alt: 'Heavyweight charcoal hoodie laid flat',
  gallery: [
    { url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80', alt: 'Side A heavyweight hoodie — charcoal' },
    { url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=80', alt: 'Side A hoodie styled with denim' },
    { url: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1200&q=80', alt: 'Close-up of brushed fleece interior' },
  ],
  collections: ['new-arrivals', 'bestsellers'], tags: ['unisex', 'clothing', 'hoodie', 'heavyweight', 'fleece'],
  seo_title: '“Side A” Heavyweight Hoodie | MyStore',
  seo_description: '400gsm brushed-fleece Side A hoodie. Made in Portugal, embroidered wordmark.',
  weight_g: 780, shipping_note: 'Ships in 1-2 working days. Free UK shipping over £40.',
  care: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron cool'],
  variants: [
    { sku: 'SideA-SCH', size: 'S', color: 'Charcoal', inventory: 24 }, { sku: 'SideA-MCH', size: 'M', color: 'Charcoal', inventory: 31 },
    { sku: 'SideA-LCH', size: 'L', color: 'Charcoal', inventory: 22 }, { sku: 'SideA-XCH', size: 'XL', color: 'Charcoal', inventory: 13 },
    { sku: 'SideA-SBO', size: 'S', color: 'Bone', inventory: 18 }, { sku: 'SideA-MBO', size: 'M', color: 'Bone', inventory: 21 },
    { sku: 'SideA-LBO', size: 'L', color: 'Bone', inventory: 15 }, { sku: 'SideA-XBO', size: 'XL', color: 'Bone', inventory: 9 },
    { sku: 'SideA-SRU', size: 'S', color: 'Rust', inventory: 12 }, { sku: 'SideA-MRU', size: 'M', color: 'Rust', inventory: 14 },
    { sku: 'SideA-LRU', size: 'L', color: 'Rust', inventory: 8 }, { sku: 'SideA-XRU', size: 'XL', color: 'Rust', inventory: 5 },
  ],
};

const p3: Product = {
  id: 'needle-drop-tote', slug: 'product-three', name: '“Needle-Drop” Canvas Tote',
  tagline: 'A bag big enough for two LPs, a laptop and a coffee.', vendor: 'Harmony Threads', type: 'Accessory',
  description: 'A 16oz natural canvas tote with a screen-printed graphic and reinforced box stitching.',
  long_description: [
    'Sized to fit a 12" LP flat. 16oz natural canvas that ages beautifully and stands up on its own when loaded.',
    'Straps are 60cm. Every seam reinforced with a box-stitch, base doubled for heavy loads.',
    'The "Needle-Drop" graphic is a nod to the record shop owner who taught us it\'s not snobbery if you\'re right about the pressing.',
  ],
  highlights: ['16oz natural cotton canvas', 'Fits a 12" record flat', 'Reinforced seams', 'Screen-printed'],
  price_pence: 1450, compare_at_pence: 1800, currency: 'GBP',
  image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
  image_alt: 'Natural canvas tote bag',
  gallery: [
    { url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80', alt: 'Needle-Drop canvas tote — natural' },
    { url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80', alt: 'Tote carried on a shoulder' },
  ],
  collections: ['bestsellers', 'gifts', 'new-arrivals'], tags: ['accessory', 'tote', 'gift', 'canvas'],
  seo_title: '“Needle-Drop” Canvas Tote Bag | MyStore',
  seo_description: '16oz heavyweight canvas tote. Fits a 12" LP flat, reinforced stitching.',
  weight_g: 320, shipping_note: 'Ships in 1-2 working days. Gift wrap available.',
  care: ['Spot clean', 'Machine wash cold if needed', 'Air dry flat'],
  variants: [
    { sku: 'NeedleDrop-NAT', size: 'One size', color: 'Natural', inventory: 84 },
    { sku: 'NeedleDrop-BLK', size: 'One size', color: 'Black', inventory: 62 },
    { sku: 'NeedleDrop-RED', size: 'One size', color: 'Red', inventory: 40 },
  ],
};

const PRODUCTS: Product[] = [p1, p2, p3];

export async function getAllProducts(): Promise<Product[]> { return PRODUCTS; }
export async function getProductBySlug(slug: string): Promise<Product | undefined> { return PRODUCTS.find((p) => p.slug === slug); }
export async function getCollection(slug: string): Promise<Product[]> { return PRODUCTS.filter((p) => p.collections.includes(slug)); }

export const COLLECTIONS: { slug: string; name: string; tagline: string; hero: string }[] = [
  { slug: 'bestsellers', name: 'Bestsellers', tagline: 'Fan favourites that fly off the shelves.', hero: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'new-arrivals', name: 'New arrivals', tagline: 'Just landed — be first to shop.', hero: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'sale', name: 'Sale', tagline: 'End-of-season savings on favourites.', hero: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80' },
  { slug: 'gifts', name: 'Gifts', tagline: 'Curated ideas for every occasion.', hero: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1400&q=80' },
];
