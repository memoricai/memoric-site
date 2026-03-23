import { create } from "zustand";

const SETTINGS_URL = import.meta.env.VITE_MEMORIC_SETTINGS_API_URL;
const TEAM_MEMBER_URL = import.meta.env.VITE_MEMORIC_TEAM_MEMBER_API_URL;
const API_TOKEN = import.meta.env.VITE_COURSE_API_TOKEN;

const useSettingsStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────
  settings: null,       // raw data from API
  team: [],             // resolved team members
  loading: false,
  error: null,
  fetched: false,       // guard against duplicate fetches

  // ── Derived helpers (read from state) ──────────────────────────────────
  get showTestimonials() {
    return get().settings?.show_testimonials_on_site === 1;
  },

  // ── Action ─────────────────────────────────────────────────────────────
  fetchSettings: async () => {
    // Only fetch once per session
    if (get().fetched || get().loading) return;

    set({ loading: true, error: null });

    try {
      const res = await fetch(SETTINGS_URL, {
        headers: {
          Authorization: `token ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error(`Settings API error: ${res.status}`);
      const json = await res.json();
      const data = json?.data ?? {};

      // Resolve team members in parallel
      const teamLinks = data?.our_team ?? [];
      let resolvedTeam = [];

      if (teamLinks.length > 0) {
        const requests = teamLinks.map((t) =>
          fetch(`${TEAM_MEMBER_URL}/${t.team_member}`, {
            headers: {
              Authorization: `token ${API_TOKEN}`,
              "Content-Type": "application/json",
            },
          }).then((r) => r.json())
        );
        const responses = await Promise.all(requests);
        resolvedTeam = responses.map((r) => r.data);
      }

      set({ settings: data, team: resolvedTeam, fetched: true, loading: false });
    } catch (err) {
      console.error("Settings fetch error:", err);
      set({ error: err.message, loading: false, fetched: true });
    }
  },
}));

export default useSettingsStore;