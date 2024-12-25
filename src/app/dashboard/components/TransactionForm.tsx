"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { purgeTransactionListCache } from "@/lib/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const transactionSchema = z.object({
  type: z
    .string({
      required_error: "取引種類は必須です",
    })
    .refine(
      (val) => ["Income", "Expense", "Saving", "Investment"].includes(val),
      {
        message: "取引種類を選択してください",
      }
    ),
  category: z
    .string({
      required_error: "カテゴリーは必須です",
    })
    .refine(
      (val) =>
        [
          "housing",
          "transport",
          "health",
          "food",
          "education",
          "other",
        ].includes(val),
      {
        message: "カテゴリーを選択してください",
      }
    ),
  amount: z
    .number({
      required_error: "金額は必須です",
      invalid_type_error: "金額は数値で入力してください",
    })
    .min(1, {
      message: "金額は1円以上で入力してください",
    }),
  description: z
    .string({
      required_error: "説明は必須です",
    })
    .min(5, {
      message: "説明は5文字以上で入力してください",
    }),
  created_at: z
    .string({
      required_error: "日付は必須です",
    })
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "有効な日付を入力してください",
    }),
});

// zodスキーマから型を生成
type FormData = z.infer<typeof transactionSchema>;

const TransactionForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "",
      category: "",
      amount: 0,
      created_at: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsPending(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          created_at: `${data.created_at}T00:00:00`,
        }),
      });
      await purgeTransactionListCache();
      router.push("/dashboard");
    } finally {
      setIsPending(false);
    }
    console.log("送信データ:", data);
  };

  return (
    <div className="container mx-auto px-4 py-6 min-w-[320px] lg:min-w-[960px]">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">新規取引登録</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Type Selection */}
              <div className="space-y-2">
                <Label
                  id="type-label"
                  htmlFor="type"
                  className="text-sm font-medium"
                >
                  Type
                </Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        aria-labelledby="type-label"
                        className="w-full"
                      >
                        <SelectValue placeholder="取引種類を選択" />
                      </SelectTrigger>
                      <SelectContent
                        className="overflow-y-auto max-h-[300px] z-[1000]"
                        position="popper"
                        sideOffset={4}
                      >
                        <SelectItem value="Income">Income</SelectItem>
                        <SelectItem value="Expense">Expense</SelectItem>
                        <SelectItem value="Saving">Saving</SelectItem>
                        <SelectItem value="Investment">Investment</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type.message}</p>
                )}
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        aria-labelledby="category-label"
                        className="w-full"
                      >
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="housing">Housing</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="created_at" className="text-sm font-medium">
                  日付
                </Label>
                <Controller
                  name="created_at"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(new Date(field.value), "yyyy-MM-dd")
                          ) : (
                            <span>日付を選択してください</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : ""
                            )
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.created_at && (
                  <p className="text-sm text-red-500">
                    {errors.created_at.message}
                  </p>
                )}
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  金額
                </Label>
                <Input
                  {...register("amount", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  id="amount"
                  placeholder="¥0"
                  min="0"
                  step="1"
                  className="w-full"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Description Textarea - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  説明
                </Label>
                <Textarea
                  {...register("description")}
                  id="description"
                  placeholder="取引の説明を入力してください"
                  className="resize-none w-full h-32"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Submit Button - Full Width */}
              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <Button variant="outline" type="button">
                  キャンセル
                </Button>
                <Button type="submit" disabled={isPending}>
                  登録する
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default TransactionForm;
