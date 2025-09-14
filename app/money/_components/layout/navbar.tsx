import Link from "next/link";

export const Navbar = () => (
  <div className="w-full">
    <nav className="contaienr flex items-center justify-between mx-auto p-8">
      <Link href="/" className="font-bond text-3xl">
        Home
      </Link>
      <Link href="/money" className="font-bond text-3xl">
        HomeMoney
      </Link>
    </nav>
  </div>
);
