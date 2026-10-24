"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
};

const Error = ({ error }: ErrorProps) => {
  useEffect(() => {
    // Internal debugging
    console.error("Application error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center space-y-3">
      <h2 className="text-xl font-semibold">
        We couldn’t complete your request
      </h2>

      <p className="text-sm text-gray-500 max-w-md">
        An unexpected issue occurred. Please try again or return to the home
        page.
      </p>

      <Link href="/">
        <Button id="backToHome">
          Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
