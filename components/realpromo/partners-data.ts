export interface Partner {
  name: string
  logo: string
  website: string
  description: string
}

export const partnersData: Partner[] = [
  {
    name: "Nike",
    logo: "/nike-logo.svg",
    website: "https://www.nike.com",
    description: "Just Do It"
  },
  {
    name: "Track & Field",
    logo: "/track-field-logo.svg", 
    website: "https://www.trackandfield.com.br",
    description: "Esporte e Performance"
  },
  {
    name: "Americanas",
    logo: "/americanas-logo.svg",
    website: "https://www.americanas.com.br",
    description: "Tudo para você"
  },
  {
    name: "Energisa",
    logo: "/energisa-logo.svg",
    website: "https://www.energisa.com.br",
    description: "Energia para a vida"
  },
  {
    name: "SEBRAE",
    logo: "/sebrae-logo.svg",
    website: "https://www.sebrae.com.br",
    description: "Desenvolvimento empresarial"
  }
]
