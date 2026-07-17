import type { Service } from "@/content/services";

const paths: Record<Service["icon"], React.ReactNode> = {
  snack: (
    <path
      d="M4 8h16v11a1 1 0 01-1 1H5a1 1 0 01-1-1V8zM4 8l2-4h12l2 4M9 12v4M15 12v4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  drink: (
    <path
      d="M7 2h10l-1 6H8L7 2zM8 8l1.2 12a1 1 0 001 .9h3.6a1 1 0 001-.9L16 8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  food: (
    <path
      d="M4 3v7a3 3 0 003 3v8M4 3v7M7 3v7M4 10h3M17 3c-2 0-3 2-3 5v14M17 3v18"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  coffee: (
    <path
      d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5V8zM17 9h1.5a2.5 2.5 0 010 5H17M8 3c0 1-1 1-1 2M12 3c0 1-1 1-1 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  market: (
    <path
      d="M3 9l1.5-5h15L21 9M3 9h18M3 9v10a1 1 0 001 1h16a1 1 0 001-1V9M8 13h3M8 17h8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cooler: (
    <path
      d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zM9 3v18M15 8h2M15 12h2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
      {paths[icon]}
    </svg>
  );
}
