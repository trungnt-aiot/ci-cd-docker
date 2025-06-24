// import ClientVisitorCounter from "@/components/ClientVisitorCounter";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="pt-16 pl-4 pr-4 pb-4">
        <Navbar/>
        {/* <ClientVisitorCounter /> */}
        {children}
      </body>
    </html>
  );
}
