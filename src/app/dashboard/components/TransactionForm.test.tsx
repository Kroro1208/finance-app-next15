import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionForm from "./TransactionForm";

vi.mock("@/components/ui/select", () => ({
  Select: ({ onValueChange }: { onValueChange: (value: string) => void }) => (
    <select onChange={(e) => onValueChange(e.target.value)} />
  ),
  SelectTrigger: () => null,
  SelectValue: () => null,
  SelectContent: () => null,
  SelectItem: () => null,
}));

describe("TransactionForm", () => {
  it("エラーメッセージが表示されること", async () => {
    render(<TransactionForm />);

    await userEvent.click(screen.getByText("登録する"));

    expect(screen.getByText("取引種類は必須です")).toBeInTheDocument();
    expect(screen.getByText("カテゴリーは必須です")).toBeInTheDocument();
    expect(screen.getByText("説明は必須です")).toBeInTheDocument();
  });

  it("キャンセルボタンの確認", () => {
    render(<TransactionForm />);
    expect(screen.getByText("キャンセル")).toHaveAttribute("type", "button");
  });
});
