import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const defaultTestimonials = [
  {
    id: 1,
    client_name: "Michael Johnson",
    role: "CEO",
    company: "Filtle",
    quote:
      "Nexora transformed our online presence. Their team delivered beyond our expectations!",
    rating: 5,
  },
  {
    id: 2,
    client_name: "Sarah Williams",
    role: "Marketing Head",
    company: "Shopmax",
    quote:
      "Professional, responsive, and result-driven. Highly recommended for any business.",
    rating: 5,
  },
  {
    id: 3,
    client_name: "David Brown",
    role: "Founder",
    company: "Finova",
    quote:
      "Their attention to detail and innovative solutions helped our SaaS platform grow fast.",
    rating: 5,
  },
];

export const Testimonials = ({ testimonials }: TestimonialsProps) => {
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : defaultTestimonials;

  return (
    <section
      id="testimonials"
      className="section-padding bg-background transition-colors"
    >
      <div className="container-custom">
        <SectionHeader
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by businesses worldwide."
        />

        {/* PDF 3: Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.map((testimonial, index) => (
            <Card
              key={`testimonial-${testimonial.id}`}
              className={`p-8 animate-fade-in-up relative [--delay:${index * 100}ms] [animation-delay:var(--delay)]`}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              <div className="flex mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star
                    key={`star-${testimonial.id}-${i}`}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-foreground/80 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <h4 className="font-bold text-foreground">
                  {testimonial.client_name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
