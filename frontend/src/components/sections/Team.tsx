import Image from "next/image";
import { TeamMember } from "@/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";

// Custom inline SVG replacements for Lucide brand icons matching exact sizing/stroke

const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Facebook = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H9v7h3v12h5v-12h3l1-3h-4V7a2 2 0 0 1 2-2h3z" />
  </svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://w3.org"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="16.5" y1="7.5" x2="7.5" y2="16.5" />
  </svg>
);

interface TeamProps {
  members: TeamMember[];
}

const defaultMembers = [
  {
    id: 1,
    name: "James Carter",
    role: "CEO & Founder",
    photo: "https://i.pravatar.cc/150?u=james",
    bio: "",
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    role: "Creative Director",
    photo: "https://i.pravatar.cc/150?u=sophia",
    bio: "",
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    id: 3,
    name: "Daniel Wilson",
    role: "Lead Developer",
    photo: "https://i.pravatar.cc/150?u=daniel",
    bio: "",
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
  {
    id: 4,
    name: "Olivia Taylor",
    role: "Marketing Lead",
    photo: "https://i.pravatar.cc/150?u=olivia",
    bio: "",
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#",
  },
];

export const Team = ({ members }: TeamProps) => {
  const displayMembers =
    members && members.length > 0 ? members : defaultMembers;

  return (
    <section
      id="team"
      className="section-padding bg-muted/50 transition-colors"
    >
      <div className="container-custom">
        <SectionHeader
          badge="Team"
          title="Meet Our Team"
          subtitle="The talented people behind our success."
        />

        {/* Responsive grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayMembers.map((member, index) => (
            <Card
              key={`team-${member.id}`}
              className={`p-6 text-center animate-fade-in-up [--delay:${index * 100}ms] [animation-delay:var(--delay)]`}
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-all duration-300">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                  quality={90}
                />
              </div>
              <h4 className="text-base sm:text-lg font-bold mt-4 text-foreground">
                {member.name}
              </h4>
              <p className="text-sm text-primary">{member.role}</p>

              {/* Social links for each member */}
              <div className="flex justify-center gap-2 mt-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {/* <a
                  href="#"
                  className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Github className="w-4 h-4" />
                </a> */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
