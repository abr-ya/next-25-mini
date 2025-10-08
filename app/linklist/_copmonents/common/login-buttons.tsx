import { Button } from "@/components/index";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";

export const LoginButtons = () => (
  <SignedOut>
    <div className="flex gap-4 items-center justify-center">
      <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
        <SignInButton />
      </Button>
      <Button asChild size="lg">
        <SignUpButton />
      </Button>
    </div>
  </SignedOut>
);
