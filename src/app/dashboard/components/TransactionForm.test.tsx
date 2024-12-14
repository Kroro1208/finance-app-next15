import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TransactionForm from "./TransactionForm";

describe("TransactionForm", () => {
  const setup = () => {
    const user = userEvent.setup();
    const utils = render(<TransactionForm />);
    return {
      user,
      ...utils,
    };
  };

  it("renders all form elements correctly", () => {
    render(<TransactionForm />);

    expect(screen.getByText("新規取引登録")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("日付")).toBeInTheDocument();
    expect(screen.getByText("金額")).toBeInTheDocument();
    expect(screen.getByText("説明")).toBeInTheDocument();
  });

  it("shows validation errors for empty form submission", async () => {
    const { user } = setup();

    const submitButton = screen.getByRole("button", { name: "登録する" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("取引種類は必須です")).toBeInTheDocument();
      expect(screen.getByText("カテゴリーは必須です")).toBeInTheDocument();
      expect(screen.getByText("説明は必須です")).toBeInTheDocument();
    });
  });

  it("successfully submits form with valid data", async () => {
    const { user } = setup();
    const consoleSpy = vi.spyOn(console, "log");

    // 通常の入力フィールド
    await user.type(screen.getByRole("spinbutton"), "1000");
    await user.type(screen.getByRole("textbox"), "Test transaction");

    // 隠されたselect要素を直接操作
    const typeSelect = document.querySelector(
      'select[aria-hidden="true"]',
    ) as HTMLSelectElement;
    const categorySelect = document.querySelectorAll(
      'select[aria-hidden="true"]',
    )[1] as HTMLSelectElement;

    fireEvent.change(typeSelect, { target: { value: "income" } });
    fireEvent.change(categorySelect, { target: { value: "housing" } });

    // フォーム送信
    await user.click(screen.getByRole("button", { name: "登録する" }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "送信データ:",
        expect.objectContaining({
          type: "income",
          category: "housing",
          amount: 1000,
          description: "Test transaction",
        }),
      );
    });
  });

  it("renders current date as default value for date input", () => {
    render(<TransactionForm />);
    const dateInput = screen.getByLabelText("日付") as HTMLInputElement;
    const today = new Date().toISOString().split("T")[0];
    expect(dateInput.value).toBe(today);
  });

  it("handles cancel button click", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("button", { name: "キャンセル" }));
  });
});