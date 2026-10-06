import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as Kanban, f as Briefcase, n as Wallet, s as ScanSearch, u as Compass } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CUFwqN2l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function OffsiteMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "2.5",
				y: "2.5",
				width: "27",
				height: "27",
				rx: "7",
				fill: "currentColor",
				className: "text-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M8 19.5c3.2-4.4 5.4-6.6 8-6.6s4.8 2.2 8 6.6",
				fill: "none",
				stroke: "var(--color-primary-foreground)",
				strokeWidth: "1.7",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "14.2",
				r: "1.5",
				fill: "var(--color-primary-foreground)"
			})
		]
	});
}
var PIPELINE_STATUSES = [
	"saved",
	"applied",
	"interview",
	"offer"
];
var STATUS_LABEL = {
	saved: "Saved",
	applied: "Applied",
	interview: "Interview",
	offer: "Offer"
};
function nid(prefix) {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
var useOffsite = create()(persist((set, get) => ({
	items: [],
	income: [],
	planChecks: {},
	addFromJob: (job, status = "saved") => {
		const existing = get().items.find((i) => i.jobId === job.id);
		if (existing) {
			set({ items: get().items.map((i) => i.id === existing.id ? {
				...i,
				status,
				appliedAt: status === "applied" ? i.appliedAt ?? (/* @__PURE__ */ new Date()).toISOString() : i.appliedAt
			} : i) });
			return;
		}
		set({ items: [{
			id: nid("p"),
			jobId: job.id,
			title: job.title,
			company: job.company,
			url: job.url,
			source: job.source,
			salaryLabel: job.salaryLabel,
			status,
			notes: "",
			savedAt: (/* @__PURE__ */ new Date()).toISOString(),
			appliedAt: status === "applied" ? (/* @__PURE__ */ new Date()).toISOString() : void 0
		}, ...get().items] });
	},
	hasJob: (jobId) => get().items.some((i) => i.jobId === jobId),
	setStatus: (id, status) => set({ items: get().items.map((i) => i.id === id ? {
		...i,
		status,
		appliedAt: status === "applied" ? i.appliedAt ?? (/* @__PURE__ */ new Date()).toISOString() : i.appliedAt
	} : i) }),
	setNotes: (id, notes) => set({ items: get().items.map((i) => i.id === id ? {
		...i,
		notes
	} : i) }),
	removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
	addIncome: (entry) => set({ income: [{
		...entry,
		id: nid("i")
	}, ...get().income].slice(0, 80) }),
	removeIncome: (id) => set({ income: get().income.filter((i) => i.id !== id) }),
	togglePlan: (id) => set({ planChecks: {
		...get().planChecks,
		[id]: !get().planChecks[id]
	} })
}), { name: "offsite-ledger" }));
function incomeTotal(entries) {
	return entries.reduce((sum, e) => sum + (Number.isFinite(e.amount) ? e.amount : 0), 0);
}
var NAV = [
	{
		to: "/",
		label: "Start",
		icon: Compass,
		match: "exact"
	},
	{
		to: "/jobs",
		label: "Board",
		icon: Briefcase,
		match: "prefix"
	},
	{
		to: "/gigs",
		label: "Gigs",
		icon: Wallet,
		match: "prefix"
	},
	{
		to: "/pipeline",
		label: "Pipeline",
		icon: Kanban,
		match: "prefix"
	},
	{
		to: "/match",
		label: "Match",
		icon: ScanSearch,
		match: "prefix"
	}
];
function usePath() {
	return useRouterState({ select: (s) => s.location.pathname });
}
function isActive(pathname, to, match) {
	if (match === "exact") return pathname === to;
	return pathname === to || pathname.startsWith(`${to}/`);
}
function AppShell({ children }) {
	const pathname = usePath();
	const savedCount = useOffsite((s) => s.items.length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OffsiteMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-xl font-medium tracking-tight",
							children: "Offsite"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center md:flex",
						children: NAV.map((item) => {
							const active = isActive(pathname, item.to, item.match);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("relative flex h-16 items-center px-3 text-sm font-medium transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
								children: [
									item.label,
									item.to === "/pipeline" && savedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1.5 font-mono text-xs tabular-nums text-pine",
										children: savedCount
									}) : null,
									active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 bottom-0 h-px bg-foreground" }) : null
								]
							}, item.to);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6 md:pb-16 md:pt-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const active = isActive(pathname, item.to, item.match);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium", active ? "text-foreground" : "text-muted-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									strokeWidth: 1.75
								}), item.to === "/pipeline" && savedCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-2 -top-1 size-1.5 rounded-full bg-pine" }) : null]
							}), item.label]
						}) }, item.to);
					})
				})
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			invert: "bg-cream text-pine hover:opacity-90",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted",
			secondary: "bg-secondary text-secondary-foreground hover:bg-muted",
			ghost: "hover:bg-muted text-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-sm",
			lg: "h-12 rounded-lg px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { cn as a, STATUS_LABEL as i, Button as n, incomeTotal as o, PIPELINE_STATUSES as r, useOffsite as s, AppShell as t };
