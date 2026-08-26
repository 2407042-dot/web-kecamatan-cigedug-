import type { Config } from "tailwindcss";

/**
 * tailwind.config.ts
 *
 * Hanya berisi: content paths, darkMode, colors, borderRadius, spacing.
 * fontFamily & fontSize dipindahkan ke src/app/globals.css (@theme)
 * karena Tailwind v4 tidak men-support fontWeight di dalam fontSize
 * config via @config.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // ── Colors (Material Design 3 token set) ─────────────────────────────
      colors: {
        "surface":                    "#faf8ff",
        "surface-bright":             "#faf8ff",
        "surface-dim":                "#d2d9f4",
        "surface-variant":            "#dae2fd",
        "surface-container-lowest":   "#ffffff",
        "surface-container-low":      "#f2f3ff",
        "surface-container":          "#eaedff",
        "surface-container-high":     "#e2e7ff",
        "surface-container-highest":  "#dae2fd",
        "surface-tint":               "#395ca5",
        "on-surface":                 "#131b2e",
        "on-surface-variant":         "#434651",
        "inverse-surface":            "#283044",
        "inverse-on-surface":         "#eef0ff",
        "background":                 "#faf8ff",
        "on-background":              "#131b2e",
        "outline":                    "#747782",
        "outline-variant":            "#c4c6d2",
        "primary":                    "#002b6b",
        "primary-container":          "#1a428a",
        "primary-fixed":              "#d9e2ff",
        "primary-fixed-dim":          "#b0c6ff",
        "on-primary":                 "#ffffff",
        "on-primary-container":       "#91b1ff",
        "on-primary-fixed":           "#001944",
        "on-primary-fixed-variant":   "#1c448c",
        "inverse-primary":            "#b0c6ff",
        "secondary":                  "#006c52",
        "secondary-container":        "#8bf3cd",
        "secondary-fixed":            "#8ef6d0",
        "secondary-fixed-dim":        "#71d9b4",
        "on-secondary":               "#ffffff",
        "on-secondary-container":     "#007055",
        "on-secondary-fixed":         "#002117",
        "on-secondary-fixed-variant": "#00513d",
        "tertiary":                   "#3f2c00",
        "tertiary-container":         "#5b4100",
        "tertiary-fixed":             "#ffdea3",
        "tertiary-fixed-dim":         "#fdbc13",
        "on-tertiary":                "#ffffff",
        "on-tertiary-container":      "#e5a900",
        "on-tertiary-fixed":          "#261900",
        "on-tertiary-fixed-variant":  "#5d4200",
        "error":                      "#ba1a1a",
        "error-container":            "#ffdad6",
        "on-error":                   "#ffffff",
        "on-error-container":         "#93000a",
      },
      // ── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        DEFAULT: "0.25rem",
        lg:      "0.5rem",
        xl:      "0.75rem",
        full:    "9999px",
      },
      // ── Spacing Scale ────────────────────────────────────────────────────
      spacing: {
        "stack-sm":       "8px",
        "stack-md":       "16px",
        "stack-lg":       "32px",
        "gutter":         "24px",
        "section-gap":    "80px",
        "margin-mobile":  "16px",
        "margin-desktop": "32px",
        "container-max":  "1280px",
        "unit":           "8px",
      },
    },
  },
  plugins: [],
};

export default config;
