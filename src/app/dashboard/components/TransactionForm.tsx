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

const TransactionForm = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <form className="max-w-4xl mx-auto">
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
                <Select name="type">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="取引種類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="income-type" value="income">
                      Income
                    </SelectItem>
                    <SelectItem key="expense-type" value="expense">
                      Expense
                    </SelectItem>
                    <SelectItem key="saving-type" value="saving">
                      Saving
                    </SelectItem>
                    <SelectItem key="investment-type" value="investment">
                      Investment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <Select name="category">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="housing-cat" value="housing">
                      Housing
                    </SelectItem>
                    <SelectItem key="transport-cat" value="transport">
                      Transport
                    </SelectItem>
                    <SelectItem key="health-cat" value="health">
                      Health
                    </SelectItem>
                    <SelectItem key="food-cat" value="food">
                      Food
                    </SelectItem>
                    <SelectItem key="education-cat" value="education">
                      Education
                    </SelectItem>
                    <SelectItem key="other-cat" value="other">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  日付
                </Label>
                <Input type="date" id="date" name="date" className="w-full" />
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  金額
                </Label>
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="¥0"
                  min="0"
                  step="1"
                  className="w-full"
                />
              </div>

              {/* Description Textarea - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  説明
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="取引の説明を入力してください"
                  className="resize-none w-full h-32"
                />
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
