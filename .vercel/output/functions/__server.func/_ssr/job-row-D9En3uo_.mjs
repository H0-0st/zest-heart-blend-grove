import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { m as BookmarkCheck, p as Bookmark } from "../_libs/lucide-react.mjs";
import { a as cn, s as useOffsite } from "./button-CUFwqN2l.mjs";
import { c as sourceLabel, s as relativeTime } from "./jobs-DgYMk5sS.mjs";
import { t as CompanyMark } from "./job-sheet-QTYELJoh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/job-row-D9En3uo_.js
var import_jsx_runtime = require_jsx_runtime();
function JobRow({ job, onOpen, compact = false }) {
	const saved = useOffsite((s) => s.items.some((i) => i.jobId === job.id));
	const addFromJob = useOffsite((s) => s.addFromJob);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-transparent px-3 py-3 transition-[background-color,border-color] duration-150", "hover:border-border hover:bg-cream", compact ? "py-2.5" : "py-3.5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => onOpen(job),
			className: "col-span-2 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMark, {
				name: job.company,
				src: job.logo
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "truncate font-display text-base font-medium tracking-tight text-foreground md:text-lg",
							children: job.title
						}), job.salaryLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs tabular-nums text-pine",
							children: job.salaryLabel
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 truncate text-sm text-muted-foreground",
						children: [
							job.company,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5 text-border",
								children: "·"
							}),
							job.category,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5 hidden text-border sm:inline",
								children: "·"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: job.location
							})
						]
					}),
					!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 hidden truncate text-xs text-muted-foreground md:block",
						children: [
							relativeTime(job.publishedAt),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5",
								children: "·"
							}),
							sourceLabel(job.source),
							job.tags[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-1.5",
								children: "·"
							}), job.tags.slice(0, 3).join(" · ")] }) : null
						]
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": saved ? "Saved" : "Save role",
			onClick: (e) => {
				e.stopPropagation();
				addFromJob(job, "saved");
			},
			className: cn("flex size-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", saved && "text-pine"),
			children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookmarkCheck, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-4" })
		})]
	});
}
//#endregion
export { JobRow as t };
