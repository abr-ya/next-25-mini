import Link from "next/link";

export const Navbar = () => {
  return (
    <div>
      <Link href="/cloud">Home</Link>
      <Link href="/cloud/performance">Performance</Link>
      <Link href="/cloud/reliability">Reliability</Link>
      <Link href="/cloud/scale">Scale</Link>
    </div>
  );
};
