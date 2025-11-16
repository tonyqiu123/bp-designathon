/**
 * Color constants for the application
 * These colors match Tailwind's default color palette
 */
export const COLORS = {
  BLUE_BG: '#0056D6', // Blue background color from frontend
  ACCENT: '#FFD700', // Yellow accent color (accent in tailwind config)
  
  // Tailwind gray scale
  GRAY_50: '#f9fafb',
  GRAY_200: '#e5e7eb',
  GRAY_400: '#9ca3af',
  GRAY_600: '#4b5563',
  GRAY_900: '#111827',
  
  // Tailwind spacing (1 unit = 4px)
  SPACING_1: 4, // p-1, m-1, etc.
  SPACING_2: 8, // pt-2, pb-2, etc.
  SPACING_4: 16, // h-4, w-4, etc.
  SPACING_16: 64, // h-16, w-16, etc.
} as const;

