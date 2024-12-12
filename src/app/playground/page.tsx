import PageHeader from "@/components/PageHeader";
import TransactionItem from "@/components/TransactionItem";
import TransactionSummaryItems from "@/components/TransactionSummaryItems";
import Trend from "@/components/Trend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { NextPage } from "next";

const PlayGround: NextPage = () => {
  return (
    <div className="min-h-screen min-w-[320px] lg:min-w-[960px] flex flex-col">
      <main className="space-y-8 flex-1 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl mt-8">Playground</h1>
        <div>
          <h2 className="mb-4 text-lg font-mono">Page Header</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <PageHeader className="mt-8" />
        </div>
        {/* Trend */}
        <div>
          <h2 className="mb-4 text-lg font-mono">Trend</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Trend type="Income" amount={10000} prevAmount={5000} />
            <Trend type="Expense" amount={1200} prevAmount={1000} />
            <Trend type="Investment" amount={5000} prevAmount={1000} />
            <Trend type="Saving" amount={3000} prevAmount={5000} />
          </div>
        </div>
        {/* Transaction Item */}
        <div>
          <h2 className="mb-4 text-lg font-mono">Transaction Item</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <div className="space-y-4">
            <TransactionItem
              type="Income"
              amount={10000}
              description="給料"
              category="salary"
            />
            <TransactionItem
              type="Expense"
              amount={1200}
              description="外食"
              category="food"
            />
            <TransactionItem
              type="Investment"
              amount={5000}
              description="iDeco"
              category="ivest"
            />
            <TransactionItem
              type="Saving"
              amount={3000}
              description="養育費"
              category="save"
            />
          </div>
        </div>
        {/* Transaction Summary Item */}
        <div>
          <h2 className="mb-4 text-lg font-mono">Transaction Summary Item</h2>
          <hr className="mb-4 border-gray-200 dark:border-gray-800" />
          <div className="space-y-4">
            <TransactionSummaryItems date={"2024-12-08"} amount={10000} />
            <hr className="mb-4 border-gray-200 dark:border-gray-800" />
            <TransactionItem
              type="Income"
              amount={10000}
              description="給料"
              category="salary"
            />
            <TransactionItem
              type="Expense"
              amount={1200}
              description="外食"
              category="food"
            />
            <TransactionItem
              type="Investment"
              amount={5000}
              description="iDeco"
              category="ivest"
            />
            <TransactionItem
              type="Saving"
              amount={3000}
              description="養育費"
              category="save"
            />
          </div>
          {/* 入力欄 */}
          <div className="mt-3">
            <h2 className="mb-4 text-lg font-mono">入力フォーム</h2>
            <hr className="mb-4 border-gray-200 dark:border-gray-800" />
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your name</Label>
                    <Input id="name" placeholder="名前を入力" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">住所</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="都道府県を選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hokkaido">北海道</SelectItem>
                        <SelectItem value="tokyo">東京</SelectItem>
                        <SelectItem value="fukuoka">福岡</SelectItem>
                        <SelectItem value="osaka">大阪</SelectItem>
                        <SelectItem value="okinawa">沖縄</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">入力内容を確認しました</Label>
                  </div>
                </div>

                <Button className="mt-6">詳細を見る</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlayGround;
