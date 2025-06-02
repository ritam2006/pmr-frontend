export default function NotFound() {
  return (
    <main className="h-screen flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-base md:text-lg">Sorry, the page you're looking for does not exist.</p>
      <a href="/" className="text-accent hover:text-hover underline">
        Go back home
      </a>
    </main>
  );
}