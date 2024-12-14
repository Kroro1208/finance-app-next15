"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface FormData {
  type: string;
  category: string;
  amount: number;
  created_at: string;
  description: string;
}

const TransactionForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: "",
      category: "",
      amount: 0,
      created_at: new Date().toISOString().split("T")[0],
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
                  rules={{ required: "取引種類は必須です" }}
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
                  rules={{ required: "カテゴリーは必須です" }}
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
                  {...register("created_at", { required: "日付は必須です" })}
                  type="date"
                  id="created_at"
                  className="w-full"
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
                    required: "金額は必須です",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "金額は0以上である必要があります",
                    },
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
                  {...register("description", { required: "説明は必須です" })}
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
