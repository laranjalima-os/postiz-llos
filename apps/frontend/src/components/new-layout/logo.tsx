'use client';

// Laranja Lima OS branding — símbolo (variante color, funciona em fundo claro e escuro).
// Original Postiz inline SVG substituído por <img> para o asset em /public.
// Asset: public/ll-symbol.svg (fonte: laranjalima-os/brand). Ver BRANDING_CHANGES.md.
export const Logo = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ll-symbol.svg"
      alt="Laranja Lima OS"
      width={60}
      height={60}
      className="mt-[8px] min-w-[60px] min-h-[60px] object-contain"
    />
  );
};
