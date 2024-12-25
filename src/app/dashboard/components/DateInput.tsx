// DateInput.tsxとして新規作成
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { forwardRef } from "react";

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: boolean;
}

const DateInput = forwardRef<HTMLButtonElement, DateInputProps>(
  ({ value, onChange, placeholder = "日付を選択してください", error }, ref) => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(new Date(value), "yyyy年MM月dd日") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) =>
              onChange(date ? format(date, "yyyy-MM-dd") : "")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;
