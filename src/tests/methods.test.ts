import { describe, expect, test, beforeEach, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

vi.mock("@/composables/useApi", () => {
  return {
    default: () => ({
      post: vi.fn(async (url: string) => {
        // Mock API behavior
        if (url.includes("pre-register")) {
          return { status: 201, data: { message: "Pre-register success" } };
        }
        if (url.includes("verify-otp")) {
          return { status: 200, data: { message: "OTP verified" } };
        }
        if (url.includes("resend-otp")) {
          return { status: 200, data: { message: "OTP resent" } };
        }
        if (url.includes("register")) {
          return { status: 201, data: { message: "User verified" } };
        }
        return { status: 400, data: { message: "Bad request" } };
      }),
    }),
  };
});

vi.mock("@/composables/useAuth", () => {
  return {
    default: () => ({
      setEmail: vi.fn(),
    }),
  };
});

import useMethods from "@/composables/useMethods";

describe("Auth Methods", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  const { preRegister, verifyOTP, resendOTP, verifyUser } = useMethods();

  test("preRegister() returns expected structure", async () => {
    const result = await preRegister("test@gmail.com");
    expect(result).toHaveProperty("status");
    expect(result.status).toBe(201);
    expect(result).toHaveProperty("message");
  });

  test("verifyOTP() returns expected structure", async () => {
    const result = await verifyOTP({ email: "test@gmail.com", otp: "1234" });
    expect(result.status).toBe(200);
    expect(result).toHaveProperty("message");
  });

  test("resendOTP() returns expected structure", async () => {
    const result = await resendOTP("test@gmail.com");
    expect(result.status).toBe(200);
    expect(result).toHaveProperty("message");
  });

  test("verifyUser() returns expected structure", async () => {
    const result = await verifyUser({
      email: "test@gmail.com",
      password: "123456",
      userType: "talent",
    });
    expect(result.status).toBe(201);
    expect(result).toHaveProperty("message");
  });
});
