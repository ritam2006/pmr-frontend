import SignIn from "./components/Signin";

export default function App() {
  return (
    <main className="flex flex-col md:flex-row gap-12 md:gap-0 items-stretch h-screen">
      <div className="md:w-1/2 bg-accent grid select-none">
        <h1 className="text-white place-self-center text-5xl md:text-6xl lg:text-7xl xl:text-8xl p-4">Risk Master.</h1>
      </div>
      <div className="md:w-1/2 grid">
        <div className="place-self-center flex flex-col items-center gap-12">
          <p className="text-sm md:text-base text-center w-xs lg:w-sm">
            This platform allows you to track investments, view key information about 
            assets, and understand the overall risk of your (mock) portfolio. It’s designed 
            to you make more informed decisions about how to manage your invested money.
          </p>
          <div className="">
            <div className="place-self-center w-xs lg:w-sm">
              <SignIn />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
