import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="bg-[#a0b921] hover:bg-[#8aa31d] text-white font-bold py-2 px-4 rounded transition-colors duration-200 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 