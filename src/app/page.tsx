"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import SummaryCards from "@/components/SummaryCards";
import FinanceChart from "@/components/FinanceChart";
import RecentTransactions from "@/components/RecentTransactions";
import Birthdays from "@/components/Birthdays";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecentMembers from "@/components/RecentMembers";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarCollapsed") === "true";
    setSidebarCollapsed(stored);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      localStorage.setItem("sidebarCollapsed", String(!prev));
      return !prev;
    });
  };

  return (
    <div className="text-gray-800 font-sans bg-[#f5f7fa] min-h-screen">
      <Sidebar sidebarCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content transition-all duration-300 ${sidebarCollapsed ? "ml-20" : "ml-64"}`}>
        <Topbar />
        <main className="p-6">
          <SummaryCards />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <FinanceChart />
            <RecentTransactions />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Birthdays />
            <UpcomingEvents />
          </div>
          <RecentMembers />
        </main>
      </div>
    </div>
  );
}