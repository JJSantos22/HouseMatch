import { z } from "zod";
import { apiRequest } from "@/lib/api/client";

const userRoleSchema = z.enum(["student", "landlord"]);

const registerRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
  role: userRoleSchema,
  university: z.string().min(1).optional(),
});

const registerResponseSchema = z
  .object({
    user_id: z.uuid(),
  })
  .transform(({ user_id }) => ({
    userId: user_id,
  }));

const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const loginResponseSchema = z
  .object({
    user_id: z.uuid(),
  })
  .transform(({ user_id }) => ({
    userId: user_id,
  }));

export type UserRole = z.infer<typeof userRoleSchema>;
export type RegisterRequest = z.input<typeof registerRequestSchema>;
export type RegisterResponse = z.output<typeof registerResponseSchema>;
export type LoginRequest = z.input<typeof loginRequestSchema>;
export type LoginResponse = z.output<typeof loginResponseSchema>;

export async function registerUser(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  const request = registerRequestSchema.parse(payload);

  const response = await apiRequest<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: request,
  });

  return registerResponseSchema.parse(response);
}

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const request = loginRequestSchema.parse(payload);

  const response = await apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: request,
  });

  return loginResponseSchema.parse(response);
}
