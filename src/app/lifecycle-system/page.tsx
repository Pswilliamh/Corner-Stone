
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function LifeCycleSystemPage() {
  return (
    <div className="space-y-8 flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl border-primary text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
            <ShoppingCart className="h-8 w-8 text-accent" />
            K.O.H.E. Life Cycle System
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Discover a transformative system designed to guide and enhance your spiritual journey and personal development.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-foreground/90 leading-relaxed">
            The Kingdom Of Heaven Embassy (K.O.H.E.) Life Cycle System offers profound insights and practical steps
            to help you navigate life's challenges and unlock your full potential. This system is built upon foundational
            biblical principles and spiritual wisdom.
          </p>
          <p className="text-foreground/90 leading-relaxed">
            Click the button below to learn more and subscribe.
          </p>
          <div className="mt-6">
            <Button 
              asChild 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-3 px-6 rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <Link href="https://pswilliam.gumroad.com/l/wznrdt" target="_blank" rel="noopener noreferrer">
                Get the K.O.H.E. Life Cycle System
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            You will be redirected to Gumroad to complete your subscription.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
