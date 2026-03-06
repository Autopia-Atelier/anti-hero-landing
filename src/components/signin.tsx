"use client";

import { GithubIcon, GoogleIcon } from "@/components/icons";
import { Button } from "./ui/button";
import ModeToggle from "./mode-toggle/mode-toggle";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignIn() {
  const handleSocialSignIn = async (provider: "google" | "github") => {
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
      newUserCallbackURL: "/",
    });

    if (error) {
      toast.error(
        error.message ||
          `Failed to sign in with ${provider === "google" ? "Google" : "GitHub"}`,
      );
    }
  };

  return (
    <div className="h-full w-full border-x">
      <div className="flex h-full">
        <div className="relative flex flex-col items-center justify-center w-full">
          <ModeToggle className="absolute top-4 right-4" />
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold mb-1">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground">
              Continue with your preferred provider
            </p>
          </div>

          <div className="flex flex-col gap-4 w-sm my-5">
            <Button
              variant="outline"
              className="flex-1 cursor-pointer h-10 text-md rounded-none"
              onClick={() => handleSocialSignIn("google")}
            >
              <GoogleIcon />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="flex-1 cursor-pointer h-10 text-md rounded-none"
              onClick={() => handleSocialSignIn("github")}
            >
              <GithubIcon />
              Continue with GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
