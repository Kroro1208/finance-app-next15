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
import React from "react";
import { useForm, Controller } from "react-hook-form";

const transactionSchema = z.object({
  type: z
    .string({
      required_error: "取引種類は必須です",
    })
    .refine(
      (val) => ["income", "expense", "saving", "investment"].includes(val),
      {
        message: "取引種類を選択してください",
      },
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
      },
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

  const onSubmit = (data: FormData) => {
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
                <Label htmlFor="type" className="text-sm font-medium">
                  Type
                </Label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="取引種類を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="income">Income</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                        <SelectItem value="saving">Saving</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
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
                      <SelectTrigger className="w-full">
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
                <Input
                  {...register("created_at")}
                  type="date"
                  id="created_at"
                  className="w-full"
                  placeholder="日付を選択してください"
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
                <Button type="submit">登録する</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default TransactionForm;
