import { redirect } from "next/navigation";

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  redirect(`/dashboard?month=${currentMonth}&year=${currentYear}`);
}
