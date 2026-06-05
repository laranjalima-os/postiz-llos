import React from 'react';

// Laranja Lima OS branding — wordmark horizontal (variante WHITE: usada no login de fundo
// escuro #0E0E0E). Original Postiz inline SVG substituído por <img> para o asset em /public.
// Asset: public/ll-horizontal-white.svg (fonte: laranjalima-os/brand). Ver BRANDING_CHANGES.md.
export const LogoTextComponent = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ll-horizontal-white.svg"
      alt="Laranja Lima OS"
      height={36}
      className="h-[36px] w-auto"
    />
  );
};
