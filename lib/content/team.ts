// Set hasPhoto: true for each member after uploading /public/team/<name>.webp. Replace the generic bio with your own text when you want.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleTitle: string;
  bio: string;
  photo: string;
  hasPhoto: boolean;
  shotLabel: string;
  alt: string;
}

export interface TeamContent {
  eyebrow: string;
  heading: string;
  sub: string;
  members: TeamMember[];
  cta: { label: string; href: string };
  note: string;
}

export const team: TeamContent = {
  eyebrow: "THE TEAM",
  heading: "The people behind ORYNTAL",
  sub: "A small, hands-on team that works with you from the first conversation to launch.",
  members: [
    {
      id: "tushar",
      name: "Tushar Srivastav",
      role: "CEO",
      roleTitle: "Chief Executive Officer",
      bio: "Leads ORYNTAL's vision and direction, and makes sure every project is built around the client's business.",
      photo: "/team/tushar.webp",
      hasPhoto: false,
      shotLabel:
        "Add: portrait of Tushar Srivastav (vertical 3:4, 1200x1600, WebP) as /public/team/tushar.webp",
      alt: "Tushar Srivastav, CEO of ORYNTAL",
    },
    {
      id: "dipesh",
      name: "Dipesh Mayla",
      role: "CBO",
      roleTitle: "Chief Business Officer",
      bio: "Looks after business and partnerships, helping clients find the right solution and the right people.",
      photo: "/team/dipesh.webp",
      hasPhoto: false,
      shotLabel:
        "Add: portrait of Dipesh Mayla (vertical 3:4, 1200x1600, WebP) as /public/team/dipesh.webp",
      alt: "Dipesh Mayla, CBO of ORYNTAL",
    },
    {
      id: "parth",
      name: "Parth Srivastav",
      role: "CMO",
      roleTitle: "Chief Marketing Officer",
      bio: "Leads marketing and communication, so clients' stories reach the customers who need them.",
      photo: "/team/parth.webp",
      hasPhoto: false,
      shotLabel:
        "Add: portrait of Parth Srivastav (vertical 3:4, 1200x1600, WebP) as /public/team/parth.webp",
      alt: "Parth Srivastav, CMO of ORYNTAL",
    },
  ],
  cta: { label: "Talk to our team", href: "/contact" },
  note: "More photos and profiles will be added soon.",
};
