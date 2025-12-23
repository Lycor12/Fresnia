export interface Region {
  id: string;
  name: string;
  population: string;
  economy: string;
  politicalLean: string;
  issues: string[];
  colorCode: string; // Tailwind color class for map representation roughly
}

export const REGIONS: Region[] = [
  {
    id: 'valens',
    name: 'Valens Metropolitan Area',
    population: '9M',
    economy: 'Service, Tech, Banking',
    politicalLean: 'Liberal, Pro-AU',
    issues: ['Housing', 'Immigration'],
    colorCode: 'bg-blue-200'
  },
  {
    id: 'vernish',
    name: 'Vernish River Valley',
    population: '11M',
    economy: 'Agriculture',
    politicalLean: 'Regionalist, Autonomist',
    issues: ['Water rights', 'Language rights', 'Autonomy'],
    colorCode: 'bg-green-200'
  },
  {
    id: 'western',
    name: 'Western Mining Territories',
    population: '7M',
    economy: 'Rare Earth Extraction',
    politicalLean: 'Pragmatic, Corporate',
    issues: ['Jobs vs Environment', 'Corporate Tax'],
    colorCode: 'bg-yellow-200'
  },
  {
    id: 'northern',
    name: 'Northern Coastal Province',
    population: '13M',
    economy: 'Manufacturing, Shipping',
    politicalLean: 'Social Democratic, Nationalist',
    issues: ['Deindustrialization', 'Job Security'],
    colorCode: 'bg-gray-300'
  },
  {
    id: 'dakhari',
    name: 'Dakhari Highlands',
    population: '7M',
    economy: 'Pastoral Agriculture',
    politicalLean: 'Traditionalist, Marginalized',
    issues: ['Poverty', 'Infrastructure'],
    colorCode: 'bg-orange-200'
  }
];
