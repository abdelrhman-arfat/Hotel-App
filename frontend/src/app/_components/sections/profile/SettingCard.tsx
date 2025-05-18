"use client";
import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";
interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  component?: React.ReactNode;
}

const SettingCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  component,
}: SettingCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const compo = useMemo(() => component, [component]);
  const onClick = useCallback(() => {
    setIsOpen((p: boolean) => !p);
  }, []);
  return (
    <div className="flex-col flex gap-2">
      <div className="group rounded-lg border p-4 transition-all hover:bg-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon}
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClick}>
            {buttonText}
          </Button>
        </div>
      </div>

      {compo && isOpen && compo}
    </div>
  );
};

export default SettingCard;
