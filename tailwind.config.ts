import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Be Vietnam Pro', 'sans-serif'],
      },
      fontSize: {
        'body': ['14px', { lineHeight: '1.6' }],
        'heading-sm': ['18px', { lineHeight: '1.4' }],
        'heading-md': ['20px', { lineHeight: '1.3' }],
        'heading-lg': ['24px', { lineHeight: '1.2' }],
      },
      spacing: {
        'card': '24px',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'soft': 'var(--shadow-soft)',
        'glow': 'var(--shadow-glow)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        blue: {
          50: "hsl(var(--blue-50))",
          100: "hsl(var(--blue-100))",
          600: "hsl(var(--blue-600))",
          700: "hsl(var(--blue-700))",
          800: "hsl(var(--blue-800))",
          900: "hsl(var(--blue-900))",
        },
        indigo: {
          50: "hsl(var(--indigo-50))",
          100: "hsl(var(--indigo-100))",
          600: "hsl(var(--indigo-600))",
          900: "hsl(var(--indigo-900))",
        },
        purple: {
          600: "hsl(var(--purple-600))",
        },
        green: {
          50: "hsl(var(--green-50))",
          100: "hsl(var(--green-100))",
          600: "hsl(var(--green-600))",
          700: "hsl(var(--green-700))",
        },
        orange: {
          600: "hsl(var(--orange-600))",
        },
        red: {
          50: "hsl(var(--red-50))",
          100: "hsl(var(--red-100))",
          600: "hsl(var(--red-600))",
          700: "hsl(var(--red-700))",
        },
        yellow: {
          300: "hsl(var(--yellow-300))",
          400: "hsl(var(--yellow-400))",
        },
        pink: {
          600: "hsl(var(--pink-600))",
        },
        amber: {
          50: "hsl(var(--amber-50))",
          100: "hsl(var(--amber-100))",
          500: "hsl(var(--amber-500))",
          800: "hsl(var(--amber-800))",
          900: "hsl(var(--amber-900))",
        },
        teal: {
          50: "hsl(var(--teal-50))",
          100: "hsl(var(--teal-100))",
          600: "hsl(var(--teal-600))",
          700: "hsl(var(--teal-700))",
        },
        cyan: {
          50: "hsl(var(--cyan-50))",
          100: "hsl(var(--cyan-100))",
          600: "hsl(var(--cyan-600))",
          700: "hsl(var(--cyan-700))",
        },
        slate: {
          50: "hsl(var(--slate-50))",
          100: "hsl(var(--slate-100))",
          200: "hsl(var(--slate-200))",
          300: "hsl(var(--slate-300))",
          400: "hsl(var(--slate-400))",
          500: "hsl(var(--slate-500))",
          600: "hsl(var(--slate-600))",
          700: "hsl(var(--slate-700))",
          800: "hsl(var(--slate-800))",
          900: "hsl(var(--slate-900))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
