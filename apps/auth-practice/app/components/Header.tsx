import Link from 'next/link';
import SignInButton from './SignInButton';

export default function Header() {
  return (
    <header className="flex flex-col justify-center h-24 bg-stone-100">
      <nav className="container">
        <ul className="flex items-center justify-between gap-8 font-medium tracking-wider text-stone-500">
          <li className="text-sm">
            <Link href="/">Home</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/server">Protected (server)</Link>
          </li>
          <li className="text-sm">
            <Link href="/protected/client">Protected (client)</Link>
          </li>
          <li>
            <SignInButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}
