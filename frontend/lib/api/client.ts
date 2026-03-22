const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    let errorDetails: unknown = null;
    let errorMessage = `Request failed with status ${response.status}`;

    if (contentType.includes("application/json")) {
      errorDetails = await response.json();

      if (
        errorDetails &&
        typeof errorDetails === "object" &&
        "message" in errorDetails &&
        typeof errorDetails.message === "string"
      ) {
        errorMessage = errorDetails.message;
      }
    } else {
      const text = await response.text();
      if (text.trim()) {
        errorMessage = text;
      }
    }

    throw new ApiError(errorMessage, response.status, errorDetails);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}
