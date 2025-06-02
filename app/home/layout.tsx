import Navbar from "../components/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <Navbar />
      <section className="p-4">
        {children}
      </section>
    </section>
  );
}
