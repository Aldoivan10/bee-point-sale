/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js}"]
export const theme = {
    extend: {
        backgroundImage: {
            "key-inactive":
                "repeating-linear-gradient(45deg, var(--fallback-b1, oklch(var(--b1))), var(--fallback-b1, oklch(var(--b1))) 8px, var(--fallback-b2, oklch(var(--b2))) 8px, var(--fallback-b2, oklch(var(--b2))) 14px);",
            "key-pressed":
                "repeating-linear-gradient(45deg, var(--fallback-p, oklch(var(--p) / 0.25)), var(--fallback-p, oklch(var(--p) / 0.25)) 8px, var(--fallback-b2, oklch(var(--b2))) 8px, var(--fallback-b2, oklch(var(--b2))) 14px);",
        },
    },
}
export const plugins = [require("daisyui")]
