import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Smart Bharat - AI Powered Civic Companion",
  description: "Your Intelligent Government Companion helping you discover schemes, services, and report issues.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta 
          httpEquiv="Content-Security-Policy" 
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https:; connect-src 'self' https://generativelanguage.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com;" 
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
