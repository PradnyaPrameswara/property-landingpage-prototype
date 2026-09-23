export type Service = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  href: string;
};

export type Logo = { name: string; image: string };

export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export type Advantage = { number: string; title: string; body: string; headingLevel: 's' | 'm' };

export type GallerySlide = {
  heading: string;
  subheading: string;
  body: string;
  image: string;
  alt: string;
};

export type FaqItem = { question: string; answer: string };

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  srcset?: string;
  sizes?: string;
  href: string;
};

export type Review = { quote: string; author: string; href: string };

export type BlogPost = {
  slug: string;
  date: string;
  readTime: string;
  title: string;
  image: string;
  srcset: string;
  sizes: string;
  href: string;
};

export type NavLink = { label: string; href: string };

const CDN = '/images';

export const hero = {
  title: 'Elevate your living',
  // R-37: em dash kept verbatim from source copy per locked contract.
  body: 'We understand that every home is unique. Our team of experts is ready to help you choose the perfect solutions — to suit your taste and needs.',
  ctaLabel: 'Get in touch',
  ctaHref: '#CTA',
};

export const servicesIntro = {
  title: 'Our services',
  body: 'Our services are focused on creating spaces that are both visually stunning and highly functional. We work closely with clients to tailor every detail to their needs, ensuring that every environment feels personal, comfortable, and efficient. Our approach combines creativity with practicality, ensuring that the spaces we design are not only beautiful, but also serve their intended purpose seamlessly.',
};

export const services: Service[] = [
  {
    slug: 'decoration',
    title: 'Decoration',
    excerpt:
      'We specialize in creating customized decor that enhances the character and atmosphere of any space. Our team carefully selects materials, colors, and furnishings to craft designs that reflect your personal taste and elevate the spaceâ€™s visual appeal.',
    image: `${CDN}/686d2c8efa574682f32fb3b7_s002.webp`,
    alt: 'Arhitecture Design',
    href: '/product/decoration',
  },
  {
    slug: 'exterior-design',
    title: 'Exterior design',
    excerpt:
      'Specializing in creating visually captivating and functional outdoor spaces, our exterior design service focuses on transforming your outdoor areas into beautiful extensions of your home or business. From landscaping to architectural features, our designs prioritize harmony with the surrounding environment while ensuring durability and sustainability.',
    image: `${CDN}/686fa9f9101af483ddc5a31d_serv.webp`,
    alt: 'Arhitecture Design',
    href: '/product/exterior-design',
  },
  {
    slug: 'space-planning',
    title: 'Space planning',
    excerpt:
      'We specialize in optimizing interior layouts to maximize functionality and flow, ensuring that every room serves its purpose and works seamlessly with the others. Our Space Planning service focuses on creating spaces that are both practical and comfortable, enhancing your daily living experience.',
    image: `${CDN}/686d2d0ac763b9a66974b84a_s003.webp`,
    alt: 'Arhitecture Design',
    href: '/product/space-planning',
  },
  {
    slug: 'architecture-design',
    title: 'Architecture design',
    excerpt:
      'We focus on understanding client needs and translating them into aesthetically pleasing and practical building designs. Our expertise covers a wide range of architectural styles and project scales. We are dedicated to delivering high-quality designs that meet both your vision and the demands of modern living.',
    image: `${CDN}/686d2d50c769c3204481eb6d_s005.webp`,
    alt: 'Arhitecture Design',
    href: '/product/architecture-design',
  },
  {
    slug: 'interior-design',
    title: 'Interior design',
    excerpt:
      'Our Interior Design service transforms your space by combining creativity with functionality. We work with you to understand your vision, preferences, and lifestyle to create an interior that is both beautiful and practical, reflecting your personal style.',
    image: `${CDN}/6876331b304d792127198c62_s001.webp`,
    alt: 'Arhitecture Design',
    href: '/product/interior-design',
  },
];

export const logos: Logo[] = [
  { name: 'acme', image: `${CDN}/687de82a3f56baf1deef079f_acme.webp` },
  { name: 'focalpoint', image: `${CDN}/687dea90437a9e8a0006d900_focalpoint.webp` },
  { name: 'nietzsche', image: `${CDN}/687dea815150bcad630d91fc_nietzsche.webp` },
  { name: 'global bank', image: `${CDN}/687dea71fa30cf1ba0673e02_global%20bank.webp` },
  { name: 'catalog', image: `${CDN}/687dea15960ffe37fccd8263_catalog.webp` },
  { name: 'capsule', image: `${CDN}/687de9d75f11f7410c3e85c1_capsule.webp` },
  { name: 'sisyphus', image: `${CDN}/687de90f6e9601058d4379e7_sisyphus.webp` },
  { name: 'layers', image: `${CDN}/687de80da5e6fa0028d62dd6_layers.webp` },
];

export const projectsIntro = { title: 'Our projects', ctaLabel: 'Go to project', ctaHref: '/projects' };

export const projects: Project[] = [
  {
    slug: 'the-garden-initiative',
    title: 'The Garden Initiative',
    excerpt: 'Transforming vacant lots into community gardens to promote local food production.',
    image: `${CDN}/686ce805ecfafe3123fe5efc_011%20(1).webp`,
    href: '/project/the-garden-initiative',
  },
  {
    slug: 'the-eco-haven',
    title: 'The Eco Haven',
    excerpt: 'A sustainable park promoting environmental education and community involvement.',
    image: `${CDN}/686ce92f749222f9928a6814_019p.webp`,
    href: '/project/the-eco-haven',
  },
  {
    slug: 'the-urban-oasis',
    title: 'The Urban Oasis',
    excerpt: 'A revitalized green space promoting relaxation and community engagement.',
    image: `${CDN}/686ceac6ecfafe31230155e3_012p.webp`,
    href: '/project/the-urban-oasis',
  },
  {
    slug: 'the-art-district',
    title: 'The Art District',
    excerpt: 'A community designed to support artists and cultural exchange.',
    image: `${CDN}/686cecd6fd33a1ac9396afed_013p.webp`,
    href: '/project/the-art-district',
  },
  {
    slug: 'the-digital-library',
    title: 'The Digital Library',
    excerpt: 'A modern library focused on technology and community engagement.',
    image: `${CDN}/686cedc9cd9072af7488eebd_014p.webp`,
    href: '/project/the-digital-library',
  },
  {
    slug: 'the-smart-city-hub',
    title: 'The Smart City Hub',
    excerpt: 'A facility designed to support innovation and entrepreneurship.',
    image: `${CDN}/686cee81230cd9cdedb8c418_015p.webp`,
    href: '/project/the-smart-city-hub',
  },
];

export const advantagesIntro = {
  title: 'Elevate your living start decorating!',
  body: 'Find inspiration for every corner of your home, from cozy bedrooms to chic living spaces, with our thoughtfully curated collections.',
};

export const advantages: Advantage[] = [
  {
    number: '01',
    title: 'Expert guidance',
    body: 'Benefit from the expertise of our dedicated team, offering personalized advice and tailored solutions to bring your design vision to life.',
    headingLevel: 's',
  },
  {
    number: '02',
    title: 'Contemporary style',
    body: 'Stay on trend with our curated collection of stylish and modern home accessories, furniture, and decor pieces.',
    headingLevel: 's',
  },
  {
    number: '03',
    title: 'Unmatched customer service',
    body: 'Experience unparalleled customer service, ensuring a smooth and enjoyable journey from selection to delivery.',
    headingLevel: 'm',
  },
  {
    number: '04',
    title: 'Strategic Innovation',
    body: 'Benefit from our forward-thinking approach that integrates cutting-edge technologies and sustainable practices, ensuring your project is not only aesthetically striking but also future-proof and environmentally responsible.',
    headingLevel: 's',
  },
];

const SLIDES = '/images';

export const gallerySlides: GallerySlide[] = [
  {
    heading: 'Our rule: quality and style',
    subheading: 'We take pride in curating a diverse collection',
    body: 'We take pride in curating a diverse collection of home furnishings and decor that embody quality aesthetics. Whether you are looking for the perfect sofa to unwind after a long day or unique decor pieces to add a personal touch, our selection is designed to meet the highest standards of style and durability.',
    image: `${SLIDES}/68677980c047367187d9033e_slide1.webp`,
    alt: 'Red house',
  },
  {
    heading: 'Personalized solutions for every home',
    subheading: 'Understanding that each home is unique',
    body: 'Understanding that each home is unique, our team of experts is committed to offering personalized solutions tailored to your preferences. From design consultations to product recommendations, we are here to guide you in creating a home that reflects your taste and meets your needs.',
    image: `${SLIDES}/686779bd54c1bb3b8dafa9d1_slide2.webp`,
    alt: 'Red and White house',
  },
  {
    heading: 'Convenience meets exceptional service',
    subheading: 'We value your time and convenience.',
    body: "We value your time and convenience. That's why we offer seamless online shopping experiences, swift delivery services, and flexible payment options. Our commitment to customer satisfaction extends beyond the purchase — we're here to ensure your ongoing delight with our products.",
    image: `${SLIDES}/686779e608de9968fddd8cae_slide3.webp`,
    alt: 'House',
  },
];

const FAQ_ANSWER =
  'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit';

export const faq: FaqItem[] = [
  { question: 'Can you cancel a project at any time?', answer: FAQ_ANSWER },
  { question: 'How often do we work without prepayment?', answer: FAQ_ANSWER },
  { question: 'How to contact technical support?', answer: FAQ_ANSWER },
  { question: 'What steps should you take if you encounter technical problems?', answer: FAQ_ANSWER },
  { question: 'Where can I leave feedback about your services?', answer: FAQ_ANSWER },
];

export const teamIntro = { title: 'Our team of specialist' };

function teamSrcset(base: string): string {
  return `${CDN}/${base}-p-500.webp 500w, ${CDN}/${base}-p-800.webp 800w, ${CDN}/${base}.webp 840w`;
}

export const team: TeamMember[] = [
  {
    slug: 'interior-director',
    name: 'Alexandra Turner',
    role: 'Interior design director',
    image: `${CDN}/686cba759671962810e71156_t001.webp`,
    href: '/teams/interior-director',
  },
  {
    slug: 'furniture-specialist',
    name: 'Jonathan Harris',
    role: 'Senior furniture specialist',
    image: `${CDN}/686cbb1598718f0d0aae69ba_t002.webp`,
    srcset: teamSrcset('686cbb1598718f0d0aae69ba_t002'),
    sizes: '100vw',
    href: '/teams/furniture-specialist',
  },
  {
    slug: 'customer-manager',
    name: 'Emil Rodriguez',
    role: 'Customer manager',
    image: `${CDN}/686cdb52fb6c1d10dc89412e_t003.webp`,
    srcset: teamSrcset('686cdb52fb6c1d10dc89412e_t003'),
    sizes: '100vw',
    href: '/teams/customer-manager',
  },
  {
    slug: 'marketing-brand-strategist',
    name: 'Olivia Foster',
    role: 'Marketing and Brand Strategist',
    image: `${CDN}/686cd85c53bc00829cd551b4_t004.webp`,
    srcset: teamSrcset('686cd85c53bc00829cd551b4_t004'),
    sizes: '100vw',
    href: '/teams/marketing-brand-strategist',
  },
  {
    slug: 'product-sourcing-coordinator',
    name: 'Daniel Carter',
    role: 'Product sourcing coordinator',
    image: `${CDN}/686cda7d0e7ac6d9e8dbcf99_t005.webp`,
    srcset: teamSrcset('686cda7d0e7ac6d9e8dbcf99_t005'),
    sizes: '100vw',
    href: '/teams/product-sourcing-coordinator',
  },
];

export const reviewsIntro = {
  title: 'Our commitment: quality and style',
  body: "Whether you're looking for the perfect sofa to unwind after a long day or unique decor pieces to add a personal touch, our selection is designed to meet the highest standards of style and durability.",
};

export const reviewStars =
  '/images/676433a45b6dfabc13bb625d_stars.png';

export const reviewsListA: Review[] = [
  {
    quote:
      'Highly recommend for anyone seeking truly unique and contemporary architectural solutions. They push boundaries.',
    author: 'Brendan',
    href: '/reviews/california-coffee',
  },
  {
    quote:
      "The office they designed for us has significantly boosted employee morale and productivity. It's a joy to work there.",
    author: 'Daniel R.',
    href: '/reviews/vonami',
  },
  {
    quote:
      'They turned our abstract ideas into a tangible, beautiful reality. A truly exceptional architectural practice.',
    author: 'Liana M.',
    href: '/reviews/arhimarket',
  },
  {
    quote:
      'Absolutely blown away by the innovative design and meticulous attention to detail. Our new office space is a masterpiece.',
    author: 'Danie, 22 years',
    href: '/reviews/top-italian-men',
  },
  {
    quote:
      "They truly redefined what's possible in modern living. Every aspect of our home feels intentionally crafted and incredibly functional.",
    author: 'John, 28 years',
    href: '/reviews/luxury-stake',
  },
  {
    quote:
      'Working with them was a seamless experience from concept to completion. Their vision for sustainable design is truly inspiring.',
    author: 'Michele, 31 years',
    href: '/reviews/brewery-toun-tour',
  },
  {
    quote:
      "The team delivered a breathtaking commercial building that perfectly encapsulates our brand's forward-thinking ethos.",
    author: 'M. White',
    href: '/reviews/live-music-avenue',
  },
  {
    quote: 'The menu is diverse, offering everything from gourmet tacos to mouthwatering burgers. ',
    author: 'Kavin T.',
    href: '/reviews/kavin-t-media',
  },
  {
    quote: 'The entire process, from selecting furniture to decorating the interior.',
    author: 'Emma B., 35 years',
    href: '/reviews/best-coffee-shop-in-sity',
  },
  {
    quote:
      'Their approach to urban planning is revolutionary. The new public space they designed has transformed our community.',
    author: 'Daniel Harris',
    href: '/reviews/delicious-food-truck',
  },
];

export const reviewsListB: Review[] = [
  {
    quote:
      'Their approach to urban planning is revolutionary. The new public space they designed has transformed our community.',
    author: 'Daniel Harris',
    href: '/reviews/delicious-food-truck',
  },
  {
    quote:
      'This live music venue is a must-visit for music lovers. The atmosphere is electric, and the staff is friendly and efficient. I had an unforgettable night enjoying great performances and meeting fellow music enthusiasts.',
    author: 'Jessica White',
    href: '/reviews/live-music-venue',
  },
  {
    quote:
      "I never thought our historic property could be so beautifully modernized while retaining its charm. They're geniuses.",
    author: 'Chris Taylor',
    href: '/reviews/art-gallery-exhibition',
  },
  {
    quote:
      "The hiking trail offers breathtaking views and a chance to connect with nature. The path is well-marked and suitable for all skill levels. Along the way, we encountered beautiful wildflowers and even spotted some wildlife. It was a refreshing escape from the city, and I can't wait to return.",
    author: 'Laura Martinez',
    href: '/reviews/scenic-hiking-trail',
  },
  {
    quote:
      "We are thrilled with the result and sincerely appreciate the entire team. If you're looking for a reliable partner to create coziness in your home, I unequivocally recommend turning to this company.",
    author: 'David Lee, 36 years',
    href: '/reviews/cozy-bookstore-cafe',
  },
  {
    quote:
      "We are thrilled with the result and sincerely appreciate the entire team. If you're looking for a reliable partner to create coziness in your home",
    author: 'Sarah Wilson, 41 years',
    href: '/reviews/family-friendly-amusement-park',
  },
  {
    quote:
      'The way they integrated smart home technology into the design was brilliant. Our apartment is now truly future-proof.',
    author: 'Michael Brown, 31 years',
    href: '/reviews/local-brewery-tour',
  },
  {
    quote:
      'From the initial sketches to the final touches, their professionalism and artistic flair were consistently exceptional.',
    author: 'Emily Johnson, 28 years',
    href: '/reviews/luxury-hotel-stay',
  },
  {
    quote:
      'We are confident it was the best decision for our home and look forward to the opportunity to use their services again.',
    author: 'Daniel W., 24 years',
    href: '/reviews/top-italian-restaurant',
  },
  {
    quote:
      'The entire process, from selecting furniture to decorating the interior, was incredibly smooth and enjoyable. The collections presented by the company epitomize style, quality',
    author: 'Emma Y., 31 years',
    href: '/reviews/best-coffee-shop-2023',
  },
];

export const blogIntro = {
  title: 'ProForma blog insights',
  ctaLabel: 'Go to blog',
  ctaHref: '/blog',
};

function blogSrcset(base: string, max: 2464 | 2496): string {
  const widths = [500, 800, 1080, 1600, 2000];
  const parts = widths.map((w) => `${CDN}/${base}-p-${w}.webp ${w}w`);
  parts.push(`${CDN}/${base}.webp ${max}w`);
  return parts.join(', ');
}

const BLOG_SIZES = '(max-width: 1919px) 100vw, 2496px';

export const blogPosts: BlogPost[] = [
  {
    slug: 'innovative-materials-in-architecture',
    date: 'November 20, 2024',
    readTime: ' 5 min to read',
    title:
      'Uncover the cutting-edge substances revolutionizing building design and construction. This article explores the most promising innovative materials shaping the future of architecture.',
    image: `${CDN}/6874b21e2f8c8e53bbed046c_0011.webp`,
    srcset: blogSrcset('6874b21e2f8c8e53bbed046c_0011', 2464),
    sizes: BLOG_SIZES,
    href: '/blog/innovative-materials-in-architecture',
  },
  {
    slug: 'urban-gardens-a-green-future',
    date: 'December 5, 2024',
    readTime: ' 9 min to read',
    title:
      'Discover how integrating nature into cityscapes is cultivating a sustainable future. This article explores the vital role of urban gardens in creating greener, healthier urban environments.',
    image: `${CDN}/6874b2995ed7074873d575a3_0041.webp`,
    srcset: blogSrcset('6874b2995ed7074873d575a3_0041', 2464),
    sizes: BLOG_SIZES,
    href: '/blog/urban-gardens-a-green-future',
  },
  {
    slug: 'the-future-of-modular-architecture',
    date: 'July 30, 2024',
    readTime: ' 5 min to read',
    title:
      "Explore how pre-fabricated units are revolutionizing construction speed and sustainability. This article examines the transformative potential of modular architecture in the building industry's future.",
    image: `${CDN}/6874b2745001139fbf8e5b4b_0031.webp`,
    srcset: blogSrcset('6874b2745001139fbf8e5b4b_0031', 2496),
    sizes: BLOG_SIZES,
    href: '/blog/the-future-of-modular-architecture',
  },
  {
    slug: 'the-future-of-architecture-trends-to-watch',
    date: 'October 30, 2024',
    readTime: ' 5 min to read',
    title: 'The Future of Architecture: Trends to Watch',
    image: `${CDN}/6874b1f87d199e1c9937c4d7_0021.webp`,
    srcset: '',
    sizes: BLOG_SIZES,
    href: '/blog/the-future-of-architecture-trends-to-watch',
  },
  {
    slug: '3d-printing-in-architecture',
    date: 'August 19, 2024',
    readTime: ' 5 min to read',
    title: '3D Printing in Architecture',
    image: `${CDN}/68763f07a8769168f2894756_00111.webp`,
    srcset: blogSrcset('68763f07a8769168f2894756_00111', 2464),
    sizes: BLOG_SIZES,
    href: '/blog/3d-printing-in-architecture',
  },
  {
    slug: 'biophilic-design-in-modern-architecture',
    date: 'August 30, 2024',
    readTime: ' 5 min to read',
    title: 'Biophilic Design in Modern Architecture',
    image: `${CDN}/6874b32a60dd7413c3d21e87_0061.webp`,
    srcset: blogSrcset('6874b32a60dd7413c3d21e87_0061', 2464),
    sizes: BLOG_SIZES,
    href: '/blog/biophilic-design-in-modern-architecture',
  },
];

export const navLinks: NavLink[] = [
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/#services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerPages: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerCms: NavLink[] = [
  { label: 'Blog post', href: '/blog/the-future-of-architecture-trends-to-watch' },
  { label: 'Member page', href: '/teams/customer-manager' },
  { label: 'Service page', href: '/product/space-planning' },
  { label: 'Project page', href: '/project/the-garden-initiative' },
];

export const footerUtility: NavLink[] = [
  { label: '404', href: '/404' },
  { label: 'Licenses', href: '/licenses' },
  { label: 'Style guide', href: '/style-guide' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Instructions', href: '/instructions' },
];

export const footerSocials: NavLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/digitalbutlers/' },
  { label: 'Twitter', href: 'https://twitter.com/Digital_Butlers' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Digital-Butlers-Studio/100090264223869/' },
];

export const cta = {
  title: 'Got a project? Letâ€™s talk!',
  body: 'We value your privacy and promise to send you only the most important and interesting information.',
};

export const aboutIntro = {
  title: 'About us',
  body: 'We understand that your home is your sanctuary. Our mission is to assist you in creating a space that not only reflects your unique style but also enhances your lifestyle.',
  ctaLabel: 'Get in touch',
  ctaHref: '#CTA',
};

export const aboutHelps: Advantage[] = [
  {
    number: '01',
    title: 'Expert design consultations',
    body: 'Our experienced team of interior designers is here to guide you through the creative process. From selecting the perfect color palette to optimizing spatial layouts, we offer personalized consultations to ensure your vision comes to life.',
    headingLevel: 's',
  },
  {
    number: '02',
    title: 'Customization for uniqueness',
    body: "Make your home truly yours with our customization options. Whether it's personalized furniture or bespoke decor, we provide opportunities to add unique touches that reflect your personality and lifestyle.",
    headingLevel: 's',
  },
  {
    number: '03',
    title: 'Quality assurance',
    body: 'We take pride in delivering products of the highest quality. Our commitment to craftsmanship ensures that every piece you bring into your home meets our stringent standards, promising longevity and enduring style.',
    headingLevel: 's',
  },
];

export const contactIntro = { title: 'Connect with us' };

export type ContactCard = {
  title: string;
  lines: string[];
  links?: Array<{ label: string; href: string }>;
};

export const contactCards: ContactCard[] = [
  {
    title: 'Address',
    lines: ['752 New South Headr Rd', 'Triple Bay SWFW 3148,', 'New York'],
  },
  {
    title: 'Contact',
    lines: ['3853315402', 'contactemail@studios.com'],
    links: [
      { label: '3853315402', href: 'tel:3853315402' },
      { label: 'contactemail@studios.com', href: 'mailto:contactemail@studios.com' },
    ],
  },
  { title: 'Social', lines: ['Instagram', 'Twitter', 'Linkedin'] },
];




