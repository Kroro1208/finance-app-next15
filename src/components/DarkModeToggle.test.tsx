import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import * as UseDarkModeHook from "@/app/hooks/UseDarkMode";
import { vi } from "vitest";

// モック化されたフックの初期化
const mockUseDarkMode = vi.spyOn(UseDarkModeHook, "default");

describe("DarkModeToggle Component", () => {
  beforeEach(() => {
    // フックのモック化
    mockUseDarkMode.mockImplementation((defaultTheme = "dark") => ({
      theme: defaultTheme,
      toggleTheme: vi.fn(),
      setAndSaveTheme: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the MoonIcon when theme is dark", () => {
    render(<DarkModeToggle defaultMode="dark" />);

    // MoonIcon が表示されていることを確認
    const moonIcon = screen.getByRole("img", { hidden: true });
    expect(moonIcon).toHaveClass("w-4 h-4");
  });

  it("renders the SunIcon when theme is light", () => {
    // フックのモックを変更
    mockUseDarkMode.mockImplementation(() => ({
      theme: "light",
      toggleTheme: vi.fn(),
      setAndSaveTheme: vi.fn(),
    }));

    render(<DarkModeToggle defaultMode="light" />);

    // SunIcon が表示されていることを確認
    const sunIcon = screen.getByRole("img", { hidden: true });
    expect(sunIcon).toHaveClass("w-4 h-4");
  });

  it("calls toggleTheme when the button is clicked", () => {
    const mockToggleTheme = vi.fn();
    mockUseDarkMode.mockImplementation(() => ({
      theme: "dark",
      toggleTheme: mockToggleTheme,
      setAndSaveTheme: vi.fn(),
    }));

    render(<DarkModeToggle defaultMode="dark" />);

    // ボタンをクリック
    const button = screen.getByRole("button");
    fireEvent.click(button);

    // toggleTheme が呼び出されたことを確認
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
