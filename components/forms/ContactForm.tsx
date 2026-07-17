"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-light focus:border-navy-900/40 focus:outline-none focus:ring-2 focus:ring-accent-400/40";

const labelClass = "mb-2 block text-sm font-semibold text-navy-950";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  function toggleService(name: string) {
    setSelectedServices((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name]
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      location: formData.get("location"),
      employees: formData.get("employees"),
      currentProvider: formData.get("currentProvider"),
      services: selectedServices,
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
      setSelectedServices([]);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-hairline bg-white p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-400/15 text-accent-700">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12l5 5L20 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-navy-950">
          Thanks — we&rsquo;ll be in touch shortly
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          A member of our team will reach out to schedule your free site assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-hairline bg-white p-8 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name
          </label>
          <input id="name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" name="company" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="location" className={labelClass}>
            Location (city)
          </label>
          <input id="location" name="location" type="text" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="employees" className={labelClass}>
            Number of employees
          </label>
          <input id="employees" name="employees" type="text" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="currentProvider" className={labelClass}>
            Current vending provider (if any)
          </label>
          <input id="currentProvider" name="currentProvider" type="text" className={inputClass} />
        </div>
      </div>

      <div className="mt-6">
        <span className={labelClass}>Interested services</span>
        <div className="flex flex-wrap gap-2">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.name);
            return (
              <button
                type="button"
                key={service.slug}
                onClick={() => toggleService(service.name)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isSelected
                    ? "border-navy-900 bg-navy-900 text-cream"
                    : "border-hairline bg-white text-navy-900/70 hover:border-navy-900/30"
                )}
              >
                {service.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputClass}
          placeholder="Tell us about your break room, shift patterns, or current equipment."
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Something went wrong sending your request. Please call us directly at 905-332-3925.
        </p>
      )}

      <Button type="submit" variant="primary" className="mt-8 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Request a Free Site Assessment"}
      </Button>
    </form>
  );
}
