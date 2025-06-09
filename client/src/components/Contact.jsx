import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [result, setResult] = React.useState("");

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "İsim gerekli.";
    if (!form.email.trim()) errs.email = "E-posta gerekli.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      errs.email = "Geçerli bir e-posta girin.";
    if (!form.message.trim()) errs.message = "Mesaj gerekli.";
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "013bcfce-ce02-42d8-9286-1dbe9afc4b35");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="max-w-lg mx-auto my-12 bg-white rounded-xl shadow p-6 md:p-10">
      <h2 className="text-2xl font-bold mb-4 text-center">İletişim</h2>
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded text-center border border-green-200">
          Mesajınız başarıyla gönderildi!
        </div>
      )}
      <form onSubmit={onSubmit} noValidate>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            İsim
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <div id="name-error" className="text-red-500 text-xs mt-1">
              {errors.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            E-posta
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mesaj
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
              errors.message ? "border-red-400" : "border-gray-300"
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <div id="message-error" className="text-red-500 text-xs mt-1">
              {errors.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition active:scale-95"
        >
          Gönder
        </button>
      </form>
    </section>
  );
}
