import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
      <Link href="/">
        <p>home</p>
      </Link>

      <ul className="flex gap-5">
        <Link href="/login">
          <p>login</p>
        </Link>
        <Link href="/despesas">
          <p>despesas</p>
        </Link>
      </ul>
    </header>
  );
};
