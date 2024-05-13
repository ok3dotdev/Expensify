"use client";

import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { formatDateRange } from "@/lib/utils";
import { useGetPeriod } from "@/hooks/use-get-period";
import { DataCard, DataCardLoading } from "@/components/data-card";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

export const DataGrid = () => {
  const period = useGetPeriod();
  const { data, isLoading } = useGetSummary();

  const dateRangeLabel = formatDateRange(period);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard 
        title="Remaining" 
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank} 
        variant="default"
        dateRange={dateRangeLabel}
      />
      <DataCard 
        title="Income" 
        variant="success"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp} 
        dateRange={dateRangeLabel}
      />
      <DataCard 
        title="Expenses" 
        variant="danger"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown} 
        dateRange={dateRangeLabel}
      />
    </div>
  );
};
