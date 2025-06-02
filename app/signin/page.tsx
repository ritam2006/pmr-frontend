import SignIn from "../components/Signin";

export default function SignUpPage() {
  return (
    <main className="flex flex-col gap-12 items-stretch h-screen">
      <div className="bg-accent grid select-none">
        <h1 className="place-self-center text-white text-5xl md:text-6xl lg:text-7xl p-4">Risk Master.</h1>
      </div>
      <div className="grid">
        <div className="place-self-center w-xs sm:w-sm">
          <SignIn />
        </div>
      </div>
    </main>
  );
}