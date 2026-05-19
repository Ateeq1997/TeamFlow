"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import data from "@/data/mock-data.json";
import type {
  ActivityLog,
  AuthUser,
  Meeting,
  NotificationItem,
  Project,
  TeamMember,
  ThemeMode,
} from "@/types";
import { uid } from "@/lib/utils";

type AppState = {
  theme: ThemeMode;
  authUser: AuthUser | null;
  authToken: string | null;
  emailNotifications: boolean;
  weeklyReports: boolean;
  members: TeamMember[];
  projects: Project[];
  notifications: NotificationItem[];
  activities: ActivityLog[];
  meetings: Meeting[];
  login: (email: string, name?: string) => void;
  setSession: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
  setPreferences: (patch: { emailNotifications?: boolean; weeklyReports?: boolean }) => void;
  setTheme: (theme: ThemeMode) => void;
  addMember: (member: Omit<TeamMember, "id">) => void;
  updateMember: (id: string, patch: Partial<TeamMember>) => void;
  deleteMember: (id: string) => void;
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, patch: Partial<Project>) => void;
  addNotification: (item: Omit<NotificationItem, "id" | "createdAt" | "read">) => void;
  markNotificationRead: (id: string) => void;
  addActivity: (item: Omit<ActivityLog, "id" | "createdAt">) => void;
  addMeeting: (meeting: Omit<Meeting, "id">) => void;
};

const seedMembers = data.members as TeamMember[];
const seedProjects = data.projects as Project[];
const seedNotifications = data.notifications as NotificationItem[];
const seedActivities = data.activity as ActivityLog[];
const seedMeetings = data.meetings as Meeting[];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "light",
      authUser: null,
      authToken: null,
      emailNotifications: true,
      weeklyReports: false,
      members: seedMembers,
      projects: seedProjects,
      notifications: seedNotifications,
      activities: seedActivities,
      meetings: seedMeetings,
      login: (email, name) =>
        set({
          authUser: {
            name: name || email.split("@")[0] || "User",
            email,
            avatar: (email[0] || "U").toUpperCase(),
          },
          authToken: uid("tk"),
        }),
      setSession: (user, token) => set({ authUser: user, authToken: token }),
      logout: () => set({ authUser: null, authToken: null }),
      updateProfile: (patch) =>
        set((state) => ({
          authUser: state.authUser ? { ...state.authUser, ...patch } : state.authUser,
        })),
      setPreferences: (patch) =>
        set((state) => ({
          emailNotifications: patch.emailNotifications ?? state.emailNotifications,
          weeklyReports: patch.weeklyReports ?? state.weeklyReports,
        })),
      setTheme: (theme) => set({ theme }),
      addMember: (member) =>
        set((state) => ({
          members: [...state.members, { ...member, id: uid("m") }],
        })),
      updateMember: (id, patch) =>
        set((state) => ({
          members: state.members.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),
      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: uid("p") }],
        })),
      updateProject: (id, patch) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      addNotification: (item) =>
        set((state) => ({
          notifications: [
            {
              ...item,
              id: uid("n"),
              createdAt: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      addActivity: (item) =>
        set((state) => ({
          activities: [
            {
              ...item,
              id: uid("a"),
              createdAt: new Date().toISOString(),
            },
            ...state.activities,
          ],
        })),
      addMeeting: (meeting) =>
        set((state) => ({
          meetings: [...state.meetings, { ...meeting, id: uid("mt") }],
        })),
    }),
    {
      name: "teamflow-saas-store",
      partialize: (state) => ({
        theme: state.theme,
        authUser: state.authUser,
        authToken: state.authToken,
        emailNotifications: state.emailNotifications,
        weeklyReports: state.weeklyReports,
        members: state.members,
        projects: state.projects,
        notifications: state.notifications,
        activities: state.activities,
        meetings: state.meetings,
      }),
    },
  ),
);
