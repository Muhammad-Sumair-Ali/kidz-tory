
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthentication } from "@/hooks/useAuth";

interface LoginDialogProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.6 0 6.6 1.4 8.7 3.6l6.5-6.5C35.4 2.5 30.1 0 24 0 14.6 0 6.8 5.8 3 14.2l7.5 5.8C12.1 14.1 17.5 9.5 24 9.5z"
    />
    <path
      fill="#34A853"
      d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9.1h12.5c-.5 2.8-2.2 5.2-4.6 6.8l7.1 5.5c4.1-3.8 6.5-9.4 6.5-16.7z"
    />
    <path
      fill="#4A90E2"
      d="M10.5 28.4c-1.1-2.5-1.7-5.3-1.7-8.4s.6-5.9 1.7-8.4L3 14.2C1.1 17.9 0 21.8 0 25.9s1.1 8 3 11.7l7.5-5.8z"
    />
    <path
      fill="#FBBC05"
      d="M24 48c6.5 0 12-2.1 16-5.8l-7.5-5.8c-2.2 1.5-5 2.4-8.5 2.4-6.5 0-12.1-4.4-14.1-10.3l-7.5 5.8C6.8 42.2 14.6 48 24 48z"
    />
  </svg>
);

const LoginDialog: React.FC<LoginDialogProps> = ({ setMobileMenuOpen }) => {
  const { handleSocialLogin } = useAuthentication();

  const handleDialogTriggerClick = () => {
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleDialogTriggerClick}
          variant="kids"
          className="text-white font-extrabold text-lg px-6 py-3 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
        >
          🎉 Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Welcome to Kidztory
          </DialogTitle>
          <DialogDescription className="text-center text-sm mt-4 text-muted-foreground">
            Sign in to continue using Kidztory&apos;s AI-powered stories.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-4 pb-6 pt-4">
          <Button
            onClick={() => handleSocialLogin("google")}
            variant="outline"
            className="w-full gap-2 border rounded-md text-sm"
          >
            <GoogleIcon />
            Login with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
