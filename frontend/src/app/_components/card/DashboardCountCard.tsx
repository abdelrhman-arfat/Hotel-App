import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const DashboardCountCard = ({ card }: { card: CardProps }) => {
  return (
    <Card className="bg-white hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 rounded-xl shadow-sm hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-300">
          {card.title}
        </CardTitle>
        <div className="text-gray-600 hover:text-primary transform hover:scale-110 transition-all duration-300">
          {card.icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 group">
          {card.value}
          <p className="text-xs text-gray-500 mt-1 group-hover:text-primary transition-colors duration-300">
            {card.value > 0 ? "Active records" : "No records found"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCountCard;
