import { Feature } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import * as LucideIcons from "lucide-react";

interface FeaturesProps {
  features: Feature[];
}

const defaultFeatures = [
  {
    id: 1,
    title: "Fast Performance",
    description:
      "Optimized for speed and efficiency with cutting-edge technology.",
    icon: "Zap",
  },
  {
    id: 2,
    title: "Secure Data",
    description: "Bank-grade security for your information and peace of mind.",
    icon: "ShieldCheck",
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Our experts are always here to help you succeed.",
    icon: "Headphones",
  },
  {
    id: 4,
    title: "Modern Tech",
    description:
      "Built with the latest stable technologies for future scalability.",
    icon: "Rocket",
  },
];

export const Features = ({ features }: FeaturesProps) => {
  const displayFeatures =
    features && features.length > 0 ? features : defaultFeatures;

  const getIcon = (iconName: string) => {
    const IconComponent =
      (LucideIcons as any)[iconName] || LucideIcons.Settings;
    return IconComponent;
  };

  return (
    <section
      id="features"
      className="section-padding bg-background transition-colors"
    >
      <div className="container-custom">
        <SectionHeader
          badge="Why Choose Us"
          title="What Makes Us Different"
          subtitle="We combine innovation, expertise, and dedication to deliver exceptional results."
        />

        {/* PDF 3: At least 4 features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayFeatures.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <Card
                key={`feature-${feature.id}`}
                className={`p-6 text-center animate-fade-in-up [--delay:${index * 100}ms] [animation-delay:var(--delay)]`}
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={32} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
