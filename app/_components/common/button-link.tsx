import Link from "next/link";
import { Button, IButtonProps } from "@/components/ui/button";

interface IButtonLink extends IButtonProps {
  to: string;
  text: string;
}

export const ButtonLink = ({ to, text, ...props }: IButtonLink) => (
  <Button asChild {...props}>
    <Link href={to}>{text}</Link>
  </Button>
);
