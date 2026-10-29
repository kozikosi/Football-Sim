import type { Metadata, Viewport } from "next";
import "@/engine/engine.css";

export const metadata: Metadata = {
  title: "20-0",
  description: "Play the season. Coach your team to the Super Bowl. Can you go 20-0?",
  openGraph: {
    title: "20-0",
    description: "Draft your team, play a full 17-game season and the playoffs, and chase the Super Bowl.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fcf7f1",
};

// Applies the saved light/dark theme before first paint (copied from the original HTML).
const themeScript = "try{var t=localStorage.getItem('zpb:theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:opsz,wght@6..96,500;6..96,600;6..96,700&family=Cinzel:wght@700;900&family=Cinzel+Decorative:wght@700;900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
