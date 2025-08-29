import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-indigo-500 to-white">
            <h1 className="text-8xl font-extrabold text-indigo-700 drop-shadow-2xl">404</h1>
            <p className="mt-4 text-2xl font-semibold">Page not Found</p>
            <p className="mt-4 text-xl font-semibold text-gray-600">maybe it was removed?</p>
            <Link href={"/"} className="mt-6 rounded-2xl bg-indigo-600 px-6 py-3 text-white font-bold shadow-md transition hover:bg-indigo-700 hover:scale-105">Go to Home</Link>
        </div>
    )
}