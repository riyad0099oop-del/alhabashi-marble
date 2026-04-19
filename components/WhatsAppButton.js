"use client";

import { useLocale } from "next-intl";

export default function WhatsAppButton() {
  const locale = useLocale();
  const tooltip = locale === 'ar' ? 'تواصل معنا' : 'Contact Us';

  return (
    <a
      href="https://wa.me/967777079288"
      className="wa-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={tooltip}
      data-tooltip={tooltip}
    >
      <i className="fab fa-whatsapp" style={{ fontSize: '2rem', color: 'white' }}></i>
    </a>
  );
}
