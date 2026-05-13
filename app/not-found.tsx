import Image from "next/image";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center bg-black text-white p-8">
            <h1 className="text-5xl font-bold mb-4">🚀 Lost in Space</h1>
            <p className="text-lg mb-8">
                The page you're looking for dosen't exists, but I can make it if you want.
            </p>
            <Image
                src="https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif"
                alt="Lost in space"
                width={320}
                height={240}
                className="mb-6"
            />
            <a
                href="/"
                className="px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
                Take Me Home 🌍
            </a>
        </main>
    );
}
