import Features from "../FeaturesSection/Features";
import MainSearch from "../SearchForm/MainSearch";

export default function Main()
{
    return(
        <>
            <main className="min-h-screen bg-gradient-to-t from-indigo-500 to-white flex items-center justify-center flex-col gap-14">
                <div className="max-w-2xl text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-bold animate-fadeUp">Find your next job in a <span className="text-transparent bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text">Click.</span></h1>
                    <p className="mt-5 text-gray-600 text-base sm:text-lg md:text-xl">Explore opportunities, apply in seconds, and track your application easily.</p>
                </div>
                <MainSearch />
            </main>
            <Features />
        </>
    )
}