"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true); setError("");
    const result = register
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);
    if (result.error) return setError(result.error.message ?? "Unable to sign in");
    router.push(params.get("from") || "/admin/leads");
    router.refresh();
  }

  return <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-zinc-950 text-white">
    <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
      <p className="text-xs uppercase tracking-[0.24em] text-red-400">MindWave Admin</p>
      <h1 className="mt-3 text-3xl font-semibold">{register ? "Create admin account" : "Sign in"}</h1>
      <p className="mt-2 text-sm text-zinc-400">Authorised MindWave operators only.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        {register && <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />}
        <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" autoComplete="email" required />
        <input className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={8} autoComplete={register ? "new-password" : "current-password"} required />
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button className="w-full rounded-lg bg-red-500 px-4 py-3 font-semibold text-white disabled:opacity-50" disabled={loading}>{loading ? "Please wait…" : register ? "Create account" : "Sign in"}</button>
      </form>
      <button className="mt-5 w-full text-sm text-zinc-400 underline" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Already registered? Sign in" : "First time? Create the admin account"}</button>
    </section>
  </main>;
}

export default function LoginPage() {
  return <Suspense fallback={<main className="min-h-screen bg-zinc-950" />}><LoginForm /></Suspense>;
}
