import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryComparisonTable from "@/components/reports/CategoryComparisonTable";
import ReportFilters from "@/components/reports/ReportFilters";
import { getTransactionsByPeriod } from "@/services/reportsService";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    startMonth?: string;
    startYear?: string;
    endMonth?: string;
    endYear?: string;
  }>;
};

export interface ReportData {
  categoryId?: string;
  category: string;
  color: string;
  total: number;
  months: { [key: string]: number };
}

function defaultPeriodUrl() {
  const now = new Date();
  // últimos 3 meses (troque o 2 por 1 para voltar ao padrão de 2 meses)
  const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);

  return `/reports?startMonth=${start.getMonth() + 1}&startYear=${start.getFullYear()}&endMonth=${now.getMonth() + 1}&endYear=${now.getFullYear()}`;
}

export default async function ReportsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const startMonth = Number(sp.startMonth);
  const startYear = Number(sp.startYear);
  const endMonth = Number(sp.endMonth);
  const endYear = Number(sp.endYear);

  const validMonth = (m: number) => Number.isInteger(m) && m >= 1 && m <= 12;
  const validYear = (y: number) =>
    Number.isInteger(y) && y >= 2000 && y <= 2100;
  const diff = (endYear - startYear) * 12 + (endMonth - startMonth);

  if (
    !validMonth(startMonth) ||
    !validMonth(endMonth) ||
    !validYear(startYear) ||
    !validYear(endYear) ||
    diff < 0 ||
    diff > 5
  ) {
    redirect(defaultPeriodUrl());
  }

  const reportData: ReportData[] = await getTransactionsByPeriod(
    startMonth,
    startYear,
    endMonth,
    endYear,
  );

  return (
    <DashboardLayout>
      <ReportFilters />
      <CategoryComparisonTable data={reportData} />
    </DashboardLayout>
  );
}
