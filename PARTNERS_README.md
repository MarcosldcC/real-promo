# Componente de Empresas Parceiras

## Visão Geral
Este componente cria uma seção horizontal de empresas parceiras na página principal, seguindo o mesmo padrão de design dos outros componentes do site.

## Funcionalidades
- ✅ Layout horizontal responsivo
- ✅ Animações de entrada com scroll
- ✅ Cards clicáveis que redirecionam para os websites
- ✅ Design consistente com o resto do site
- ✅ Dados centralizados para fácil manutenção

## Como Personalizar

### 1. Alterar Empresas Parceiras
Edite o arquivo `components/realpromo/partners-data.ts`:

```typescript
export const partnersData: Partner[] = [
  {
    name: "Nome da Empresa",
    logo: "/caminho-para-logo.svg", // ou .png, .jpg
    website: "https://www.website-da-empresa.com",
    description: "Descrição ou slogan da empresa"
  },
  // ... adicione mais empresas
]
```

### 2. Adicionar Logos
- Coloque os arquivos de logo na pasta `public/`
- Formatos suportados: SVG, PNG, JPG
- Tamanho recomendado: 200x200px ou proporcional

### 3. Modificar Estilos
- Cores e espaçamentos: edite `components/realpromo/partners.tsx`
- Animações: edite `components/realpromo/animations.module.css`

### 4. Alterar Posição na Página
Edite `app/ClientPage.tsx` para mover a seção:
```typescript
<section id="partners">
  <Partners />
</section>
```

## Estrutura de Arquivos
```
components/realpromo/
├── partners.tsx          # Componente principal
├── partners-data.ts      # Dados das empresas
└── animations.module.css # Estilos e animações

app/
└── ClientPage.tsx        # Página principal (inclui o componente)
```

## Tecnologias Utilizadas
- Next.js 14
- TypeScript
- Tailwind CSS
- CSS Modules para animações customizadas
- Componente AnimateOnScroll para efeitos de entrada

## Responsividade
- Mobile: Cards empilhados verticalmente
- Tablet: Layout em grid flexível
- Desktop: Layout horizontal com espaçamento otimizado

## Acessibilidade
- Títulos descritivos para cada empresa
- Tooltips informativos
- Navegação por teclado
- Links externos com atributos de segurança
