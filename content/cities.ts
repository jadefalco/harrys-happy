export interface City {
  name: string;
  slug: string;
  priority: boolean;
  x: number;
  y: number;
}

export const cities: City[] = [
  { name: "Hamilton", slug: "hamilton", priority: true, x: 140, y: 290 },
  { name: "Stoney Creek", slug: "stoney-creek", priority: true, x: 195, y: 312 },
  { name: "Burlington", slug: "burlington", priority: true, x: 195, y: 232 },
  { name: "Milton", slug: "milton", priority: true, x: 262, y: 188 },
  { name: "Oakville", slug: "oakville", priority: true, x: 267, y: 240 },
  { name: "Mississauga", slug: "mississauga", priority: false, x: 342, y: 228 },
  { name: "Etobicoke", slug: "etobicoke", priority: false, x: 402, y: 208 },
  { name: "Brampton", slug: "brampton", priority: false, x: 340, y: 138 },
];
