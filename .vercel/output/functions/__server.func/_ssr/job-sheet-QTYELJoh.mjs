import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as ExternalLink, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as cn, n as Button, s as useOffsite } from "./button-CUFwqN2l.mjs";
import { t as Badge } from "./badge-CDoPiuXS.mjs";
import { c as sourceLabel, s as relativeTime } from "./jobs-DgYMk5sS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/job-sheet-QTYELJoh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CompanyMark({ name, src, size = "md" }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	const dim = size === "sm" ? "size-8 rounded-sm" : "size-11 rounded-md";
	const letter = (name.trim()[0] || "?").toUpperCase();
	if (!src || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex shrink-0 items-center justify-center bg-pine text-pine-fg font-display text-sm font-medium", dim),
		"aria-hidden": "true",
		children: letter
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		className: cn("shrink-0 bg-cream object-contain", dim),
		onError: () => setFailed(true)
	});
}
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-ink/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var SheetContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex flex-col gap-4 bg-card text-card-foreground shadow-soft", "inset-x-0 bottom-0 max-h-dvh rounded-t-xl border border-border p-5", "md:inset-y-0 md:right-0 md:left-auto md:h-full md:max-h-none md:w-full md:max-w-lg md:rounded-none md:rounded-l-xl md:border-y-0 md:border-r-0", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:slide-out-to-bottom md:data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-bottom md:data-[state=open]:slide-in-from-right", "duration-200", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = DialogContent.displayName;
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-2xl font-medium tracking-tight", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function JobSheet({ job, onOpenChange }) {
	const addFromJob = useOffsite((s) => s.addFromJob);
	const saved = useOffsite((s) => job ? s.items.some((i) => i.jobId === job.id) : false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: !!job,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, { children: job ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMark, {
						name: job.company,
						src: job.logo
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-muted-foreground",
							children: job.company
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								sourceLabel(job.source),
								" · ",
								relativeTime(job.publishedAt)
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: job.title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: [
					job.location,
					job.type ? ` · ${job.type}` : "",
					job.salaryLabel ? ` · ${job.salaryLabel}` : ""
				] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "pine",
					children: job.category
				}), job.tags.slice(0, 6).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: t
				}, t))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto pr-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground/90",
					children: job.description || job.excerpt
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 border-t border-border pt-3 sm:flex-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: job.url,
							target: "_blank",
							rel: "noopener noreferrer",
							children: ["Apply", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: saved ? "secondary" : "outline",
						className: "flex-1",
						onClick: () => {
							addFromJob(job, "saved");
							toast("Saved to pipeline");
						},
						children: saved ? "In pipeline" : "Save"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: () => {
							addFromJob(job, "applied");
							toast("Marked applied");
						},
						children: "Mark applied"
					})
				]
			})
		] }) : null })
	});
}
//#endregion
export { JobSheet as n, CompanyMark as t };
