"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Faq } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface FAQProps {
  faqs: Faq[];
}

const defaultFaqs = [
  {
    id: 1,
    question: "What services do you offer?",
    answer:
      "We offer web development, mobile apps, UI/UX design, digital marketing, cloud solutions, and 24/7 support.",
    category: "",
  },
  {
    id: 2,
    question: "How long does a project take?",
    answer:
      "Typically 4-8 weeks depending on the complexity and scope of the project.",
    category: "",
  },
  {
    id: 3,
    question: "Do you offer ongoing support?",
    answer:
      "Yes, we provide 24/7 support and maintenance packages for all our clients.",
    category: "",
  },
  {
    id: 4,
    question: "How do we get started?",
    answer:
      "Simply contact us through the form below and we will schedule a consultation call.",
    category: "",
  },
];

export const FAQ = ({ faqs }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  // PDF 3: Smooth open/close animation
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="section-padding bg-background transition-colors"
    >
      <div className="container-custom max-w-3xl">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services."
        />

        <div className="space-y-3">
          {displayFaqs.map((faq, index) => (
            <Card
              key={`faq-${faq.id}`}
              className={`overflow-hidden animate-fade-in-up [--delay:${index * 100}ms] [animation-delay:var(--delay)]`}
            >
              {" "}
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-muted/50 transition-colors duration-200 min-h-[44px]"
              >
                <span className="font-semibold text-foreground">
                  {faq.question}
                </span>
                
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground pb-2">{faq.answer}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
