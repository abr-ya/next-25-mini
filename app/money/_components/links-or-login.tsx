import { ButtonLink } from "@/app/_components/index";
import { Button } from "@/components/index";
import { SignedIn } from "@clerk/nextjs";
import { SignInButton, SignOutButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { PATH } from "../_constants/path";

export const LinksOrLogin = () => (
  <>
    <SignedIn>
      <div className="flex gap-4 items-center justify-center">
        <ButtonLink to={PATH.dashboard} text="Go To Your Dashboard" size="lg" />
        <Button asChild size="lg" variant="outline" className="mt-1">
          <SignOutButton />
        </Button>
      </div>
    </SignedIn>
    <SignedOut>
      <div className="flex gap-4 items-center justify-center">
        <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-700">
          <SignInButton />
        </Button>
        <Button asChild size="lg">
          <SignUpButton />
        </Button>
      </div>
    </SignedOut>
  </>
);
