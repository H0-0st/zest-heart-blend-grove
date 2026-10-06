import { n as LANES, t as GIGS } from "./gigs-BPi4ja_B.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { n as Button, t as AppShell } from "./button-CUFwqN2l.mjs";
import { t as Badge } from "./badge-CDoPiuXS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gigs-BPWphQpQ.js
var import_jsx_runtime = require_jsx_runtime();
function GigsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
			children: "First dollar"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl",
			children: "Platforms that actually pay people."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
			children: "Ranked by how fast money can move, not how loud the ads are. Survey mills and mystery “$500/day” pages are omitted on purpose."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 space-y-14",
			children: LANES.map((lane) => {
				const items = GIGS.filter((g) => g.lane === lane.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-medium tracking-tight",
						children: lane.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: lane.lede
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 md:grid-cols-2",
					children: items.map((gig) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GigCard, { gig }, gig.id))
				})] }, lane.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-14 text-sm text-muted-foreground",
			children: [
				"Ready for salary work?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					className: "font-medium text-pine hover:underline",
					children: "Open the live board"
				}),
				"."
			]
		})
	] });
}
function GigCard({ gig }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col rounded-xl border border-border bg-card p-5 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-medium tracking-tight",
					children: gig.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-mono text-xs tabular-nums text-pine",
					children: [
						gig.pay,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-1.5 text-border",
							children: "·"
						}),
						gig.timeToPay
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [gig.effort, " effort"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: [
					"Best for ",
					gig.bestFor.toLowerCase(),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed",
				children: gig.how
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: gig.catch
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 flex-1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				className: "mt-2 w-full sm:w-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: gig.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: [
						"Open ",
						gig.name,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
					]
				})
			})
		]
	});
}
//#endregion
export { GigsPage as component };
