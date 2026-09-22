"use client";

import { useState, type FormEvent } from "react";
import type { Visitor } from "@/lib/support-chat/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type PreChatFormProps = {
  onSubmit: (visitor: Visitor, honeypot: string) => void;
};

export default function PreChatForm({ onSubmit }: PreChatFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone) {
      setError("Nama, email, dan nomor telepon wajib diisi.");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setError("Format email tidak valid.");
      return;
    }

    setError("");
    onSubmit({ name: trimmedName, email: trimmedEmail, phone: trimmedPhone }, honeypot);
  }

  return (
    <form className="support-chat-form" onSubmit={handleSubmit} noValidate>
      <p className="support-chat-form-intro">
        Isi data berikut agar tim kami bisa menindaklanjuti percakapan Anda.
      </p>
      <label className="support-chat-field">
        Nama
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          maxLength={100}
          required
        />
      </label>
      <label className="support-chat-field">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          maxLength={200}
          required
        />
      </label>
      <label className="support-chat-field">
        Nomor telepon
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          autoComplete="tel"
          maxLength={30}
          required
        />
      </label>
      <div className="support-chat-honeypot" aria-hidden="true">
        <label>
          Perusahaan
          <input
            type="text"
            name="company"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      {error && (
        <p className="support-chat-form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-primary support-chat-form-submit">
        Mulai percakapan
      </button>
    </form>
  );
}
