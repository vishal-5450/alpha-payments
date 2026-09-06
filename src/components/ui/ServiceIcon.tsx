import { Compass, Waypoints, Workflow, type LucideProps } from "lucide-react";

const icons = {
  switch: Waypoints,
  automation: Workflow,
  advisory: Compass,
} as const;

export type ServiceIconName = keyof typeof icons;

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon {...props} />;
}
