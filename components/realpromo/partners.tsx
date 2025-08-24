"use client"

export default function Partners() {
  const partners = [
    {
      name: "Marcos Cunha",
      logo: "/MARKlg.svg",
      website: "https://www.markuiux.com.br",
      description: "Product Designer"
    },
    {
      name: "Real Led",
      logo: "/realled.svg",
      website: "https://www.instagram.com/reall_led/",
      description: "Projeção e Comunicação Visual"
    },
    {
      name: "Real Lazer",
      logo: "/reallazer.svg",
      website: "https://www.instagram.com/reallazer_/",
      description: "Área de Lazer"
    },
    {
      name: "Figueroa Business",
      logo: "/figueroalg.svg",
      website: "",
  
    }
  ]

  const handlePartnerClick = (website: string) => {
    window.open(website, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-[var(--rp-black)] py-20 md:py-28 pb-32 md:pb-40">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Empresas Parceiras
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Trabalhamos com as principais empresas do mercado para oferecer soluções de qualidade
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="group cursor-pointer transition-all duration-500 hover:scale-110 text-center"
              onClick={() => handlePartnerClick(partner.website)}
              title={`Visitar ${partner.name}`}
            >
              {/* Logo padronizada para todas as empresas */}
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`Logo ${partner.name}`}
                  className="w-full h-full object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    // Fallback se a imagem não carregar
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.parentElement?.querySelector('.logo-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="logo-fallback hidden text-white/60 group-hover:text-white/80 text-xs font-medium">
                  LOGO
                </div>
              </div>
              
              <div className="text-lg md:text-xl font-bold text-white/90 group-hover:text-white transition-all duration-300 mb-2">
                {partner.name}
              </div>
              <div className="text-sm text-white/60 group-hover:text-white/80 transition-all duration-300 mb-3">
                {partner.description}
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto group-hover:from-white/60 group-hover:via-white group-hover:to-white/60 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
