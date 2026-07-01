"use client";
import { useState } from "react";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    msg: string;
  }>({
    type: "",
    msg: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // PDF 3.1: Client side validation
  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push("Name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone is required");
    if (!formData.subject.trim()) errors.push("Subject is required");
    if (!formData.message.trim()) errors.push("Message is required");

    // PDF 3.1: Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Please enter a valid email address");
    }

    // PDF 3.1: Validate phone number format
    const phoneRegex = /^[\+\d\s\-\(\)]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      errors.push("Please enter a valid phone number");
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // PDF 3.1: Client side validation
    const errors = validateForm();
    if (errors.length > 0) {
      setStatus({ type: "error", msg: errors.join(", ") });
      return;
    }

    // PDF 3.1: Show loading spinner
    setLoading(true);
    setStatus({ type: "", msg: "" });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await response.json();

      if (response.ok) {
        // PDF 3.1: Clear success message
        setStatus({
          type: "success",
          msg: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        // PDF 3.1: Clear inline error
        setStatus({
          type: "error",
          msg: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        msg: "Network error. Please check your connection and try again.",
      });
    } finally {
      // PDF 3.1: Re-enable submit button
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className="section-padding bg-muted/50 transition-colors"
    >
      <div className="container-custom">
        <SectionHeader
          badge="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? We'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Info Cards */}
          <div className="space-y-4 animate-slide-in-left">
            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Visit Us</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    123 Tech Street, Karachi, Pakistan
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email Us</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    info@nexora.com
                  </p>
                  <p className="text-muted-foreground text-sm">
                    support@nexora.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Call Us</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    +92 300 1234567
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Mon-Fri: 9AM - 6PM
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form - PDF 3.1 */}
          <Card className="p-6 md:p-8 animate-slide-in-right">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground text-sm font-medium mb-1.5">
                    Your Name *
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted rounded-lg outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-foreground text-sm font-medium mb-1.5">
                    Subject *
                  </label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted rounded-lg outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground text-sm min-h-[44px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-1.5">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted rounded-lg outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground text-sm min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-1.5">
                  Phone Number *
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted rounded-lg outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground text-sm min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-foreground text-sm font-medium mb-1.5">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted rounded-lg outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-foreground text-sm resize-none min-h-[100px]"
                />
              </div>

              {/* PDF 3.1: Clear success/error message */}
              {status.msg && (
                <div
                  className={`p-4 rounded-lg text-sm flex items-start gap-3 ${
                    status.type === "success"
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.msg}</span>
                </div>
              )}

              {/* PDF 3.1: Loading spinner + Re-enable submit button */}
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
