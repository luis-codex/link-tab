const twTheme = {
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px",
        },
    },
    extend: {
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
                /* accents */
                "1": "hsl(var(--accent-1))",
                "2": "hsl(var(--accent-2))",
                "3": "hsl(var(--accent-3))",
                "4": "hsl(var(--accent-4))",
                "5": "hsl(var(--accent-5))",
                "6": "hsl(var(--accent-6))",
                "7": "hsl(var(--accent-7))",
                "8": "hsl(var(--accent-8))",
            },
            popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
            },
            card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
            },
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
            "border-beam": {
                "100%": {
                    "offset-distance": "100%",
                },
            },
            "squeeze": {
                "0%, 100%": {
                    "transform": "scale(1, 1)"
                },
                "50%": {
                    "transform": "scale(1.1, 0.9)"
                }
            }
            , "rubber-band": {
                "0%": {
                    "transform": "scale(1)"
                },
                "30%": {
                    "transform": "scale(1.25)"
                },
                "40%": {
                    "transform": "scale(0.75)"
                },
                "50%": {
                    "transform": "scale(1.15)"
                },
                "65%": {
                    "transform": "scale(0.95)"
                },
                "75%": {
                    "transform": "scale(1.05)"
                },
                "100%": {
                    "transform": "scale(1)"
                }
            },
            "expand-height-50": {
                "0%": {
                    "height": "0"
                },
                "100%": {
                    "height": "50%"
                }
            },
            "expand-height-100": {
                "0%": {
                    "height": "0"
                },
                "100%": {
                    "height": "100%"
                }
            },
            "fade-in-blur": {
                "0%": {
                    "opacity": "0",
                    "filter": "blur(10px)"
                },
                "100%": {
                    "opacity": "1",
                    "filter": "blur(0)"
                }
            },
        },
        animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            "squeeze": "squeeze 0.6s ease-in-out",
            "rubber-band": "rubber-band 1s ease-in-out",
            "expand-height-50": "expand-height-50 0.3s ease-out forwards",
            "expand-height-100": "expand-height-100 0.3s ease-out forwards",
            "fade-in-blur": "fade-in-blur 0.3s ease-out",

        },
        fontFamily: {
            sans: [ 'Geist Sans' ],
            mono: [ 'Geist Mono' ],
        },
    },
}

export default twTheme