import { Faction } from '../types/factions';

export const INITIAL_FACTIONS: Faction[] = [
  { 
    id: 'business',
    name: "Fresnian Business Council", 
    relationship: 10, 
    description: "Major corporations, mining magnates. Controls 35% of GDP.",
    leaders: ["Damien Korvash", "Elena Sarros", "Viktor Malens"],
    power: 'Elite',
    demands: ["Low taxes", "Deregulation", "AU market access"]
  },
  { 
    id: 'labor',
    name: "Fresnian Labor Congress", 
    relationship: 0, 
    description: "Industrial unions and public sector workers.",
    leaders: ["Marina Volensk", "Gregor Tanis"],
    power: 'Mass',
    demands: ["Wage increases", "Job security", "Wealth redistribution"]
  },
  { 
    id: 'military',
    name: "Armed Forces Command", 
    relationship: 20, 
    description: "Military officer corps and defense establishment.",
    leaders: ["General Markus Draven", "Admiral Lena Kross"],
    power: 'Institutional',
    demands: ["Defense budget", "National security", "Strategic autonomy"]
  },
  { 
    id: 'vernish',
    name: "Vernish National Assembly", 
    relationship: -10, 
    description: "Regional minority party seeking autonomy.",
    leaders: ["Aleksandr Rovin", "Katya Marenko"],
    power: 'Regional',
    demands: ["Cultural autonomy", "Language rights", "Resource sharing"]
  },
  { 
    id: 'nationalist',
    name: "Fresnian National Party", 
    relationship: -20, 
    description: "Right-wing nationalist opposition.",
    leaders: ["Dimitri Volkov", "Father Mikhael"],
    power: 'Mass',
    demands: ["Ethnic dominance", "Traditional values", "Strong borders"]
  },
  { 
    id: 'democrats',
    name: "Democratic Alliance", 
    relationship: 10, 
    description: "Urban progressives and intellectuals.",
    leaders: ["Senator Irina Vasquez", "Alexei Dorn"],
    power: 'Elite',
    demands: ["Liberal democracy", "Rule of law", "Anti-corruption"]
  },
  { 
    id: 'agrarian',
    name: "Agrarian Union", 
    relationship: 5, 
    description: "Farmers and rural communities.",
    leaders: ["Josef Brandt", "Dr. Nadia Kovar"],
    power: 'Mass',
    demands: ["Subsidies", "Rural infrastructure", "Fair crop prices"]
  },
  { 
    id: 'religious',
    name: "Religious Orthodox Council", 
    relationship: 5, 
    description: "Fresnian Orthodox Church authority.",
    leaders: ["Patriarch Simeon IV", "Bishop Andrei Koslov"],
    power: 'Mass',
    demands: ["Religious freedom", "Traditional family values"]
  },
  { 
    id: 'enviro',
    name: "Environmental Coalition", 
    relationship: 0, 
    description: "Climate activists and scientists.",
    leaders: ["Dr. Elisa Varen", "Maxim Sedor"],
    power: 'Mass',
    demands: ["Climate action", "Renewable transition", "Pollution reduction"]
  },
  { 
    id: 'dakhari',
    name: "Dakhari Cultural Assembly", 
    relationship: -5, 
    description: "Highland minority group.",
    leaders: ["Tamara Davan", "Reza Kashani"],
    power: 'Regional',
    demands: ["Cultural recognition", "Infrastructure investment"]
  },
  { 
    id: 'judiciary',
    name: "Judiciary & Legal Establishment", 
    relationship: 30, 
    description: "Courts and legal profession.",
    leaders: ["Chief Justice Marta Volnova", "Boris Tarev"],
    power: 'Institutional',
    demands: ["Judicial independence", "Rule of law"]
  },
  { 
    id: 'media',
    name: "Media Consortium", 
    relationship: 20, 
    description: "Journalists and broadcasters.",
    leaders: ["Vera Kostin", "Edgar Volynsky"],
    power: 'Institutional',
    demands: ["Press freedom", "Access to information"]
  },
];