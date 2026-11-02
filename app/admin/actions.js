"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatClientSesi } from "@/lib/supabase/server";

export async function login(prevState, formData) {
  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
        ? prevState
        : null;

  if (!data) {
    return { error: "Data form tidak valid." };
  }

  const email = data.get("email")?.toString().trim();
  const password = data.get("password")?.toString();

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatClientSesi();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (
      error.message?.toLowerCase().includes("invalid login credentials") ||
      error.message?.toLowerCase().includes("invalid credentials")
    ) {
      return { error: "Email atau password salah. Silakan coba lagi." };
    }
    return { error: error.message || "Gagal masuk. Silakan coba lagi." };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function keluar() {
  const supabase = await buatClientSesi();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}

