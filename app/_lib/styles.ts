// Shared layout + neo-brutalist button styling.
// Shadows use var(--foreground) so the hard offset stays visible in dark mode.

export const container = "mx-auto w-full max-w-[1400px] px-4 sm:px-8";

export const grid12 = "grid grid-cols-12 gap-x-4 sm:gap-x-6";

const press =
    "h-12 px-6 text-base font-bold border-2 border-border " +
    "shadow-[4px_4px_0_0_var(--foreground)] " +
    "transition-[transform,box-shadow,background-color,color] duration-100 " +
    "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--foreground)] " +
    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none";

/** For the default (primary) variant */
export const buttonPrimary = press;

/** For the outline variant */
export const buttonOutline = press + " bg-background text-foreground";

/** Button that sits on a primary-colored background (final call to action) */
export const buttonOnPrimary =
    press +
    " bg-background text-foreground hover:bg-accent hover:text-accent-foreground";
