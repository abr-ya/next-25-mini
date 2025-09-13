import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full absolute text-white z-10">
      <nav className="contaienr relative flex flex-wrap items-center justify-between mx-auto p-8">
        <div className="flex gap-6">
          <Link href="/" className="font-bond text-3xl">
            Home
          </Link>
          <Link href="/cloud" className="font-bond text-3xl">
            HomeCloud
          </Link>
        </div>

        <div className="flex gap-4 text-xl">
          <Link href="/cloud/performance">Performance</Link>
          <Link href="/cloud/reliability">Reliability</Link>
          <Link href="/cloud/scale">Scale</Link>
        </div>
      </nav>
    </div>
  );
};
