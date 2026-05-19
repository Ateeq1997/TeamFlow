export type ThemeMode = "light" | "dark" | "sunset";

export type Role = "Admin" | "Manager" | "Developer" | "Designer";
export type MemberStatus = "online" | "away" | "offline";

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type ProjectStatus = "Planning" | "In Progress" | "Review" | "Completed";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  avatar: string;
  productivity: number;
};

export type TaskItem = {
  id: string;
  title: string;
  assigneeId: string;
  status: "Todo" | "In Progress" | "Done";
  priority: Priority;
  dueDate: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  deadline: string;
  progress: number;
  priority: Priority;
  memberIds: string[];
  tasks: TaskItem[];
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  createdAt: string;
  read: boolean;
};

export type ActivityLog = {
  id: string;
  action: string;
  actor: string;
  createdAt: string;
  category: "team" | "project" | "auth" | "system";
};

export type AuthUser = {
  name: string;
  email: string;
  avatar: string;
};

export type Meeting = {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: string[];
};
