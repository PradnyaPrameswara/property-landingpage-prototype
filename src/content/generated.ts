import blogJson from './generated/blog.json';
import projectsJson from './generated/projects.json';
import teamsJson from './generated/teams.json';
import servicesJson from './generated/services.json';

export type BlogDetail = {
  slug: string;
  h1: string;
  cover: string;
  description: string;
  author: string;
  authorPhoto: string;
  body: string;
};

export type ProjectDetail = {
  slug: string;
  h1: string;
  cover: string;
  description: string;
  client: string;
  budget: string;
  date: string;
  location: string;
  service: string;
  body: string;
};

export type TeamDetail = {
  slug: string;
  h1: string;
  cover: string;
  description: string;
  email: string;
  phone: string;
  body: string;
};

export type ServiceDetail = {
  slug: string;
  h1: string;
  cover: string;
  description: string;
  priceSymbol: string;
  price: string;
  body: string;
};

export const blogDetails = blogJson as BlogDetail[];
export const projectDetails = projectsJson as ProjectDetail[];
export const teamDetails = teamsJson as TeamDetail[];
export const serviceDetails = servicesJson as ServiceDetail[];
