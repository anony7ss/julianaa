import assert from "node:assert/strict";
import { test } from "node:test";

const baseUrl = process.env.E2E_BASE_URL ?? "http://localhost:3000";

async function request(path, init) {
  return fetch(`${baseUrl}${path}`, {
    redirect: "manual",
    ...init,
  });
}

test("public pages render", async () => {
  for (const path of ["/", "/buscar", "/arquivo", "/hoje", "/galeria", "/quiz", "/mural"]) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path} should render`);
  }
});

test("admin redirects anonymous users to login", async () => {
  const response = await request("/admin");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/admin/login?next=%2Fadmin");
});

test("admin login renders", async () => {
  const response = await request("/admin/login");
  assert.equal(response.status, 200);
});

test("admin API rejects anonymous mutation", async () => {
  const response = await request("/api/admin/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });
  assert.equal(response.status, 401);
});
