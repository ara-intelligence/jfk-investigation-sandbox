
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Investigation-specific colors
				evidence: {
					DEFAULT: 'hsl(var(--evidence))',
					foreground: 'hsl(var(--evidence-foreground))'
				},
				classified: {
					DEFAULT: 'hsl(var(--classified))',
					foreground: 'hsl(var(--classified-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in': {
					from: { transform: 'translateY(10px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'zoom-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				floating: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				scanning: {
					'0%': { transform: 'translateY(0)', opacity: '0.5' },
					'50%': { transform: 'translateY(-50%)', opacity: '0.8' },
					'100%': { transform: 'translateY(-100%)', opacity: '0.5' }
				},
				typewriter: {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				flicker: {
					'0%, 100%': { opacity: '0.03' },
					'5%, 95%': { opacity: '0.05' },
					'10%, 90%': { opacity: '0.02' },
					'15%, 85%': { opacity: '0.04' },
					'20%, 80%': { opacity: '0.03' },
					'25%, 75%': { opacity: '0.05' },
					'30%, 70%': { opacity: '0.02' },
					'35%, 65%': { opacity: '0.04' },
					'40%, 60%': { opacity: '0.03' },
					'45%, 55%': { opacity: '0.05' },
					'50%': { opacity: '0.02' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'zoom-in': 'zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
				'floating': 'floating 3s ease-in-out infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'scanning': 'scanning 3s linear infinite',
				'typewriter': 'typewriter 3s steps(40) forwards',
				'blink': 'blink 0.7s infinite',
				'flicker': 'flicker 5s infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'grid-pattern': 'linear-gradient(rgba(0, 255, 127, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 127, 0.05) 1px, transparent 1px)',
				'csi-texture': 'url("data:image/svg+xml,%3Csvg width=\'64\' height=\'64\' viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z\' fill=\'rgba(0,255,127,0.05)\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
				'neon': '0 0 5px theme("colors.primary.DEFAULT"), 0 0 20px rgba(0, 255, 127, 0.2)',
				'evidence': '0 0 5px theme("colors.evidence.DEFAULT"), 0 0 20px rgba(0, 255, 127, 0.2)',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
					},
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
