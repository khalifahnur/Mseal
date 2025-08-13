"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Cookie, Settings, Shield, BarChart3, Target } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CookieConsentModal({
  isOpen,
  onOpenChange,
}: CookieConsentModalProps) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookieConsent", JSON.stringify(newPreferences));
    onOpenChange(false);
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    setPreferences(newPreferences);
    localStorage.setItem("cookieConsent", JSON.stringify(newPreferences));
    onOpenChange(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    onOpenChange(false);
  };

  const handlePreferenceChange = (
    key: keyof CookiePreferences,
    value: boolean
  ) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  if (!showPreferences) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-md"         
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5" />
              We use cookies
            </DialogTitle>
            <DialogDescription className="text-left">
              We use cookies to ensure secure authentication for your MSeal
              membership, enhance your browsing experience, and analyze our
              traffic. By clicking &apos;Accept All&apos;, you consent to our use of
              cookies.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Essential cookies</span>
              </div>
              <p className="text-xs text-muted-foreground">
                These cookies are necessary for secure authentication and cannot
                be disabled.
              </p>
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-col gap-2">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleRejectAll}
                className="flex-1"
              >
                Reject All
              </Button>
              <Button onClick={handleAcceptAll} className="flex-1">
                Accept All
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={() => setShowPreferences(true)}
              className="w-full"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Customize Preferences
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Learn more in our{" "}
              <a
                href="/privacy-policy"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Privacy Policy
              </a>
              .
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cookie Preferences
          </DialogTitle>
          <DialogDescription>
            Choose which cookies you want to accept. You can change these
            settings at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <Label className="font-medium">Strictly Necessary</Label>
              </div>
              <Switch
                checked={preferences.necessary}
                disabled
                aria-label="Necessary cookies (always enabled)"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              These cookies are essential for secure authentication and core
              functionality of the MSeal membership platform.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-blue-600" />
                <Label htmlFor="functional" className="font-medium">
                  Functional
                </Label>
              </div>
              <Switch
                id="functional"
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("functional", checked)
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              These cookies enable enhanced functionality and personalization,
              such as remembering your preferences and settings.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <Label htmlFor="analytics" className="font-medium">
                  Analytics
                </Label>
              </div>
              <Switch
                id="analytics"
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("analytics", checked)
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              These cookies help us understand how visitors interact with our
              website by collecting and reporting information anonymously.
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-600" />
                <Label htmlFor="marketing" className="font-medium">
                  Marketing
                </Label>
              </div>
              <Switch
                id="marketing"
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  handlePreferenceChange("marketing", checked)
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              These cookies are used to deliver personalized advertisements and
              measure the effectiveness of advertising campaigns.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(false)}
              className="flex-1"
            >
              Back
            </Button>
            <Button onClick={handleSavePreferences} className="flex-1">
              Save Preferences
            </Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              variant="ghost"
              onClick={handleRejectAll}
              className="flex-1"
              size="sm"
            >
              Reject All
            </Button>
            <Button
              variant="ghost"
              onClick={handleAcceptAll}
              className="flex-1"
              size="sm"
            >
              Accept All
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            Learn more in our{" "}
            <a
              href="/privacy-policy"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Privacy Policy
            </a>
            .
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
