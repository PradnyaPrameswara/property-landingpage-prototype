export type LandingCard = { slug: string; title: string; excerpt: string; image: string; href: string };

export const services: LandingCard[] = [
  { slug: 'decoration', title: 'Decoration', excerpt: 'Customized decor', image: 'https://cdn.prod.website-files.com/676011e38753f7d22eefbfdf/686d2c8efa574682f32fb3b7_s002.webp', href: '/product/decoration' },
  { slug: 'exterior-design', title: 'Exterior design', excerpt: 'Outdoor spaces', image: '', href: '/product/exterior-design' },
  { slug: 'space-planning', title: 'Space planning', excerpt: 'Functional layouts', image: '', href: '/product/space-planning' },
  { slug: 'architecture-design', title: 'Architecture design', excerpt: 'Building designs', image: '', href: '/product/architecture-design' },
  { slug: 'interior-design', title: 'Interior design', excerpt: 'Beautiful interiors', image: '', href: '/product/interior-design' },
];

export const logos: string[] = ['acme', 'focalpoint', 'nietzsche', 'global bank', 'catalog', 'capsule', 'sisyphus', 'layers'];

export const projects: LandingCard[] = [
  { slug: 'the-garden-initiative', title: 'The Garden Initiative', excerpt: 'Transforming vacant lots', image: 'https://cdn.prod.website-files.com/676011e38753f7d22eefbfdf/686ce805ecfafe3123fe5efc_011%20(1).webp', href: '/project/the-garden-initiative' },
  { slug: 'the-eco-haven', title: 'The Eco Haven', excerpt: '', image: '', href: '/project/the-eco-haven' },
  { slug: 'the-urban-oasis', title: 'The Urban Oasis', excerpt: '', image: '', href: '/project/the-urban-oasis' },
  { slug: 'the-art-district', title: 'The Art District', excerpt: '', image: '', href: '/project/the-art-district' },
  { slug: 'the-digital-library', title: 'The Digital Library', excerpt: '', image: '', href: '/project/the-digital-library' },
  { slug: 'the-smart-city-hub', title: 'The Smart City Hub', excerpt: '', image: '', href: '/project/the-smart-city-hub' },
];

export const team: LandingCard[] = [
  { slug: 'interior-director', title: 'Alexandra Turner', excerpt: 'Interior design director', image: 'https://cdn.prod.website-files.com/676011e38753f7d22eefbfdf/686cba759671962810e71156_t001.webp', href: '/teams/interior-director' },
  { slug: 'furniture-specialist', title: 'Jonathan Harris', excerpt: 'Senior furniture specialist', image: '', href: '/teams/furniture-specialist' },
  { slug: 'customer-manager', title: 'Emil Rodriguez', excerpt: 'Customer manager', image: '', href: '/teams/customer-manager' },
  { slug: 'marketing-brand-strategist', title: 'Olivia Foster', excerpt: 'Marketing and Brand Strategist', image: '', href: '/teams/marketing-brand-strategist' },
  { slug: 'product-sourcing-coordinator', title: 'Daniel Carter', excerpt: 'Product sourcing coordinator', image: '', href: '/teams/product-sourcing-coordinator' },
];

export const blog: LandingCard[] = [
  { slug: 'innovative-materials-in-architecture', title: 'Innovative Materials in Architecture', excerpt: 'November 20, 2024 / 5 min to read', image: 'https://cdn.prod.website-files.com/676011e38753f7d22eefbfdf/6874b21e2f8c8e53bbed046c_0011.webp', href: '/blog/innovative-materials-in-architecture' },
  { slug: 'urban-gardens-a-green-future', title: 'Urban Gardens: A Green Future', excerpt: '', image: '', href: '/blog/urban-gardens-a-green-future' },
  { slug: 'the-future-of-modular-architecture', title: 'The Future of Modular Architecture', excerpt: '', image: '', href: '/blog/the-future-of-modular-architecture' },
];
