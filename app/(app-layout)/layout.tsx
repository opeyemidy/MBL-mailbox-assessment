import { Providers } from "@/components/Providers";
import { TopBar } from "@/components/TopBar";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <TopBar />
      <main className="main-content">{children}</main>
    </Providers>
  );
}
