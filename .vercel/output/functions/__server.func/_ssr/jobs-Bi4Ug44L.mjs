import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as SlidersHorizontal, o as Search } from "../_libs/lucide-react.mjs";
import { a as cn, n as Button, t as AppShell } from "./button-CUFwqN2l.mjs";
import { a as jobSearchHaystack, c as sourceLabel, n as JOB_SOURCES, t as JOB_CATEGORIES } from "./jobs-DgYMk5sS.mjs";
import { r as Route$2 } from "./router-Cbjxrkhm.mjs";
import { t as Input } from "./input-DndF8tAC.mjs";
import { n as JobSheet } from "./job-sheet-QTYELJoh.mjs";
import { t as JobRow } from "./job-row-D9En3uo_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-Bi4Ug44L.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JobsPage() {
	const data = Route$2.useLoaderData();
	const search = Route$2.useSearch();
	const navigate = useNavigate({ from: "/jobs" });
	const [draft, setDraft] = (0, import_react.useState)(search.q ?? "");
	const filtered = (0, import_react.useMemo)(() => {
		const q = (search.q ?? "").trim().toLowerCase();
		let list = data.jobs;
		if (q) {
			const tokens = q.split(/\s+/).filter(Boolean);
			list = list.filter((job) => {
				const hay = jobSearchHaystack(job);
				return tokens.every((t) => hay.includes(t));
			});
		}
		if (search.category) list = list.filter((j) => j.category === search.category);
		if (search.source && JOB_SOURCES.includes(search.source)) list = list.filter((j) => j.source === search.source);
		if (search.paid) list = list.filter((j) => !!j.salaryLabel);
		return list;
	}, [
		data.jobs,
		search.q,
		search.category,
		search.source,
		search.paid
	]);
	const openJob = data.jobs.find((j) => j.id === search.id) ?? null;
	const patch = (next) => {
		navigate({
			search: (prev) => {
				const merged = {
					...prev,
					...next
				};
				for (const key of Object.keys(merged)) if (!merged[key]) delete merged[key];
				return merged;
			},
			replace: true
		});
	};
	const presentCategories = JOB_CATEGORIES.filter((c) => data.jobs.some((j) => j.category === c));
	const [visible, setVisible] = (0, import_react.useState)(40);
	const shown = filtered.slice(0, visible);
	(0, import_react.useEffect)(() => {
		setVisible(40);
	}, [
		search.q,
		search.category,
		search.source,
		search.paid
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "Live board"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-medium tracking-tight",
					children: "Remote roles"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: "Pulled from Remotive, Remote OK, and Jobicy. Apply on the company site, then mark it in your pipeline."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-xs tabular-nums text-muted-foreground",
				children: [
					filtered.length,
					" shown",
					data.fetchedAt ? ` · updated ${new Date(data.fetchedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})}` : null
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-8 flex flex-col gap-3 sm:flex-row",
			onSubmit: (e) => {
				e.preventDefault();
				patch({
					q: draft.trim() || void 0,
					id: void 0
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (e) => setDraft(e.target.value),
					placeholder: "Search title, company, skill",
					className: "pl-10",
					"aria-label": "Filter roles"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {}), "Filter"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: !search.category,
				onClick: () => patch({
					category: void 0,
					id: void 0
				}),
				children: "All crafts"
			}), presentCategories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: search.category === c,
				onClick: () => patch({
					category: search.category === c ? void 0 : c,
					id: void 0
				}),
				children: c
			}, c))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: [JOB_SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: search.source === s,
				onClick: () => patch({
					source: search.source === s ? void 0 : s,
					id: void 0
				}),
				children: sourceLabel(s)
			}, s)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
				active: !!search.paid,
				onClick: () => patch({
					paid: search.paid ? void 0 : true,
					id: void 0
				}),
				children: "Has pay listed"
			})]
		}),
		data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-warn",
			children: data.error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 divide-y divide-border rounded-xl border border-border bg-card",
			children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "p-8 text-sm text-muted-foreground",
				children: "No roles match that filter. Clear a chip or try a broader skill."
			}) : shown.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobRow, {
				job,
				onOpen: (j) => patch({ id: j.id })
			}, job.id))
		}),
		filtered.length > visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => setVisible((n) => n + 40),
				children: [
					"Show more (",
					filtered.length - visible,
					" left)"
				]
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobSheet, {
			job: openJob,
			onOpenChange: (v) => {
				if (!v) patch({ id: void 0 });
			}
		})
	] });
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-11 rounded-full border px-3.5 text-sm transition-colors", active ? "border-pine bg-pine text-pine-fg" : "border-border bg-card text-muted-foreground hover:text-foreground"),
		children
	});
}
//#endregion
export { JobsPage as component };
