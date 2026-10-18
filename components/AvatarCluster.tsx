import { Star } from "lucide-react";

const avatars = [
  { initials: "RK", gradient: "from-brand-400 to-brand-600" },
  { initials: "SM", gradient: "from-brand-500 to-brand-700" },
  { initials: "AD", gradient: "from-brand-300 to-brand-500" },
  { initials: "VP", gradient: "from-brand-600 to-brand-800" },
];

export default function AvatarCluster() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex -space-x-3">
        {avatars.map((avatar) => (
          <span
            key={avatar.initials}
            className={`grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-gradient-to-br ${avatar.gradient} text-xs font-bold text-white shadow-sm`}
          >
            {avatar.initials}
          </span>
        ))}
      </div>

      <div className="text-sm">
        <span className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" />
          ))}
        </span>
        <p className="mt-0.5 font-medium text-ink">
          Trusted by 50+ businesses
        </p>
      </div>
    </div>
  );
}
