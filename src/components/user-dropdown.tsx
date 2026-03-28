"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserDropdown() {
  const { data: session, isPending } = useSession();
  const [imageFailed, setImageFailed] = useState(false);

  if (isPending) {
    return <div className="size-8 rounded-none bg-muted animate-pulse" />;
  }

  const user = session?.user;

  if (!user) {
    return (
      <Button variant="ghost" className="rounded-none" asChild>
        <Link href="/signin">Sign in</Link>
      </Button>
    );
  }

  const displayName = user.name || user.email || "User";
  const initials = displayName
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="size-8 rounded-none border border-border bg-muted flex items-center justify-center overflow-hidden focus:outline-none">
          {user.image && !imageFailed ? (
            <Image
              src={user.image}
              alt={displayName}
              width={32}
              height={32}
              unoptimized
              onError={() => setImageFailed(true)}
              className="size-full object-cover"
            />
          ) : (
            <span className="text-xs font-mono text-muted-foreground">
              {initials}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-none border-border">
        <DropdownMenuLabel className="font-normal">
          <div className="text-sm font-medium">{displayName}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-none"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
