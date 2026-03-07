"use client";

import { GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle/mode-toggle";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignIn({ onProviderClick }: { onProviderClick?: () => void } = {}) {
  const handleSocialSignIn = async (provider: "google" | "github") => {
    onProviderClick?.();
    const { error } = await signIn.social({
      provider,
      callbackURL: "/docs",
      newUserCallbackURL: "/docs",
    });

    if (error) {
      toast.error(
        error.message ||
        `Failed to sign in with ${provider === "google" ? "Google" : "GitHub"}`,
      );
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex h-full">
        <div className="relative flex flex-col items-center justify-center w-full">
          <ModeToggle className="absolute top-2 right-2 dark:hover:bg-transparent w-auto h-auto" />
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold mb-1">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Continue with your preferred provider
            </p>
          </div>

          <div className="flex flex-col gap-4 w-sm my-5">
            <div className="relative w-full group">
              <Button
                variant="outline"
                className="w-full cursor-pointer h-10 text-md rounded-none relative overflow-hidden border-dashed"
                onClick={() => handleSocialSignIn("google")}
              >
                <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                <GoogleIcon />
                Continue with Google
              </Button>
              <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
              <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
              <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
              <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
            </div>

            <div className="relative w-full group">
              <Button
                variant="outline"
                className="w-full cursor-pointer h-10 text-md rounded-none relative overflow-hidden border-dashed"
                onClick={() => handleSocialSignIn("github")}
              >
                <span className="shine absolute -top-1/2 -left-full h-[200%] w-3/4 skew-x-[-20deg] bg-linear-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                <GithubIcon />
                Continue with GitHub
              </Button>
              <span className="absolute h-2 w-2 border-foreground border-b border-r bottom-0 right-0" />
              <span className="absolute h-2 w-2 border-foreground border-b border-l bottom-0 left-0" />
              <span className="absolute h-2 w-2 border-foreground border-t border-r top-0 right-0" />
              <span className="absolute h-2 w-2 border-foreground border-t border-l top-0 left-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
