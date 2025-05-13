import React from "react";

const GridCards = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
};

export default GridCards;
