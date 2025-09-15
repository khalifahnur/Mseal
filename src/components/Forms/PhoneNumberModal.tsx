"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useUpdatePhone } from "@/hooks/Authhook/authHook";

interface PhoneNumberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PhoneNumberModal({
  open,
  onOpenChange,
}: PhoneNumberModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("+254");
  const { mutate: updatePhone, isPending: isSubmitting } = useUpdatePhone();

  const validatePhoneNumber = (value: string) => {
    const phoneRegex = /^\+2547\d{8}$/;
    return phoneRegex.test(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+254")) {
      value = "+254" + value.replace(/^\+254/, "");
    }

    const digits = value.replace(/^\+254/, "").replace(/[^0-9]/g, "");
    if (digits && !digits.startsWith("7")) {
      value = "+2547" + digits.slice(1);
    } else {
      value = "+254" + digits;
    }
    if (value.length > 13) {
      value = value.slice(0, 13);
    }
    setPhoneNumber(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error(
        "Phone number must be in the format +2547XXXXXXXX (e.g., +254712345678)",
        {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
        }
      );
      return;
    }

    updatePhone(
      { phoneNumber },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent className="sm:max-w-[425px]" 
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Phone Number</DialogTitle>
          <DialogDescription>
            Please provide your Kenyan phone number (e.g., +254712345678) to
            complete your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+254712345678"
                value={phoneNumber}
                onChange={handleInputChange}
                required
                pattern="\+2547[0-9]{8}"
                title="Phone number must be in the format +2547XXXXXXXX (e.g., +254712345678)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || phoneNumber.length < 12}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
