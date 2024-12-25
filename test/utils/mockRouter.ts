import type { useRouter } from "next/navigation";

export const createMockRouter = (
  overrides: Partial<ReturnType<typeof useRouter>> = {}
) => ({
  push: jest.fn(),
  back: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn(),
  ...overrides,
});
