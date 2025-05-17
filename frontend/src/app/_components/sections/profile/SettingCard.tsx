import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useCallback, useState } from "react";

interface SettingCardProps {
  icon: LucideIcon;
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
  const onClick = useCallback(() => {
    setIsOpen((p: boolean) => !p);
  }, []);
  return (
    <div className="group rounded-lg border p-4 transition-all hover:bg-accent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Icon className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      {isOpen && component}
    </div>
  );
};

export default SettingCard;
