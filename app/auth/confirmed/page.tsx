"use client";

import { Container } from "@/components/layout/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EmailConfirmedPage() {
  return (
    <div className="py-16">
      <Container className="max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Email Confirmed!</CardTitle>
            <CardDescription>
              Your account has been successfully verified. You can now sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full">
              <Link href="/signin">
                Sign In to Your Account
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
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
