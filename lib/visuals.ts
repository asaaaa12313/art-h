export const V = {
  hero: 'var(--v-hero)',
  clinic: 'var(--v-clinic)',
  chair: 'var(--v-chair)',
  doc: 'var(--v-doc)',
  implant: 'var(--v-implant)',
  ortho: 'var(--v-ortho)',
  gen: 'var(--v-gen)',
  wait: 'var(--v-wait)',
  surg: 'var(--v-surg)',
  consult: 'var(--v-consult)',
  equip: 'var(--v-equip)',
  scan: 'var(--v-scan)',
  city: 'var(--v-city)',
  white: 'var(--v-white)',
} as const;

export type VisualKey = keyof typeof V;
