import { ThemeProvider } from "@/app/components/theme-provider";
import "@/app/globals.css";
import { Inter, Raleway } from "next/font/google";
import { Metadata } from "next";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

const raleway = Raleway({
    weight: "400",
    subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "WhereStock - Know What's in Stock and What It Earns",
  description:
    "WhereStock makes inventory and stock management simple. Track inventory, record transactions, monitor sales, and analyze revenue, profit, and ROI — all in one powerful dashboard.",

  keywords: [
    "WhereStock",
    "inventory management",
    "stock management",
    "stock tracking",
    "inventory tracking system",
    "sales tracking",
    "transaction management",
    "revenue analytics",
    "profit tracking",
    "ROI analytics",
    "business inventory management",
  ],

  authors: [{ name: "WhereStock" }],
  applicationName: "WhereStock",

  openGraph: {
    title: "WhereStock - Know What's in Stock and What It Earns",
    description:
      "Manage your stock, track sales, and monitor revenue, profit, and ROI in one simple inventory management dashboard.",
    type: "website",
    siteName: "WhereStock",
  },

  twitter: {
    card: "summary_large_image",
    title: "WhereStock - Inventory & Profit Management",
    description:
      "Know what's in stock and what it earns. Simplify inventory management and track your business performance with WhereStock.",
  },

  robots: {
    index: true,
    follow: true,
  },
};


type RootLayoutProps = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html
                lang="en"
                suppressHydrationWarning
                className={`${raleway.className} antialiased`}
        >
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </>
    );
}
