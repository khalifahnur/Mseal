import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#000] py-8 text-primary">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/matches">Matches</Link>
              </li>
              <li>
                <Link href="/membership">Membership</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact Information</h3>
            <p>Email: info@murangaseals.com</p>
            <p>Phone: +254 123 456 789</p>
            <p>Address: Kenya</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="mb-2">
              Stay updated with our latest news and offers!
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-2 border rounded"
            />
            <button className="w-full bg-primary text-primary-foreground p-2 rounded">
              Subscribe
            </button>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 Murang&apos;a Seals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
