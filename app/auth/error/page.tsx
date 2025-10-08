"use client";

import { Container } from "@/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const errorCode = searchParams.get('error_code');
  const errorDescription = searchParams.get('error_description');

  let errorMessage = "An authentication error occurred.";
  let suggestion = "Please try signing in again.";

  if (errorCode === 'otp_expired') {
    errorMessage = "Email Confirmation Link Expired";
    suggestion = "The confirmation link has expired. Please sign up again to receive a new confirmation email.";
  } else if (error === 'access_denied') {
    errorMessage = "Access Denied";
    suggestion = "The confirmation link is invalid or has already been used. If you already confirmed your email, try signing in.";
  }

  return (
    <div className="py-16">
      <Container className="max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
            <CardTitle className="text-2xl">{errorMessage}</CardTitle>
            <CardDescription>
              {suggestion}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/signup">
                Sign Up Again
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signin">
                Try Signing In
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link href="/">
                Go to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
