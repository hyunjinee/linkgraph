import TextField from '../components/TextField';
import GoogleSignInButton from '../components/GoogleSignInButton';
import Button from '../components/Button';

export default function SignInPage() {
  return (
    <section className="flex min-h-full pt-16 overflow-hidden sm:py-28">
      <div className="flex flex-col w-full max-w-2xl px-4 mx-auto sm:px-6">
        <div className="relative mt-12 sm:mt-16">
          <h1 className="text-2xl font-medium tracking-tight text-center text-gray-900">Sign in to your account</h1>
        </div>
        <div className="flex-auto px-4 py-10 mx-4 mt-10 bg-white shadow-2xl sm:rounded-5xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24">
          <form>
            <div className="space-y-2">
              <TextField
                id="email"
                name="email"
                type="email"
                label="Sign in with your email"
                placeholder="hello@me.com"
                autoComplete="email"
                required
              />
            </div>
            <Button type="submit" varient="outline" color="gray" className="w-full mt-3">
              Continue with email
            </Button>
          </form>
          <div className="flex items-center w-full mx-auto my-10 justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
            or
          </div>
          <GoogleSignInButton />
        </div>
      </div>
    </section>
  );
}
