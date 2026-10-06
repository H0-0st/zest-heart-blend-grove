import { i as __toESM } from "../_runtime.mjs";
import { t as GIGS } from "./gigs-BPi4ja_B.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Check, g as ArrowRight, o as Search } from "../_libs/lucide-react.mjs";
import { n as Button, s as useOffsite, t as AppShell } from "./button-CUFwqN2l.mjs";
import { i as Route$4 } from "./router-Cbjxrkhm.mjs";
import { t as Input } from "./input-DndF8tAC.mjs";
import { n as JobSheet } from "./job-sheet-QTYELJoh.mjs";
import { t as JobRow } from "./job-row-D9En3uo_.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bpkb3qjK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WEEK_PLAN = [
	{
		id: "d1",
		day: 1,
		title: "Open two fast-pay accounts",
		detail: "Prolific plus User Interviews (or UserTesting). Finish verification today so studies can land tomorrow.",
		href: "/gigs",
		hrefLabel: "Open platforms"
	},
	{
		id: "d2",
		day: 2,
		title: "Collect the first session",
		detail: "Do one test or study. The point is a payout on the way, not a perfect rate.",
		href: "/gigs",
		hrefLabel: "Pay-this-week list"
	},
	{
		id: "d3",
		day: 3,
		title: "Apply to eight live roles",
		detail: "Filter the board to your craft. Save each one, then apply on the company site. Move the card to Applied.",
		href: "/jobs",
		hrefLabel: "Open the board"
	},
	{
		id: "d4",
		day: 4,
		title: "Ship one freelance offer",
		detail: "A single Fiverr gig or an Upwork profile with three samples. Niche the title to what people search.",
		href: "/gigs",
		hrefLabel: "Freelance platforms"
	},
	{
		id: "d5",
		day: 5,
		title: "Send five tailored pitches",
		detail: "No templates. Name the client’s brief in sentence one. Price the first job to buy a review."
	},
	{
		id: "d6",
		day: 6,
		title: "Follow up yesterday’s applications",
		detail: "Short note, 4–6 sentences. If a role went cold, apply to three more from the board.",
		href: "/pipeline",
		hrefLabel: "Open pipeline"
	},
	{
		id: "d7",
		day: 7,
		title: "Count hours that paid, then double down",
		detail: "Log what actually cleared. Drop the channel that wasted the week. Repeat the one that paid.",
		href: "/pipeline",
		hrefLabel: "Log income"
	}
];
function Home() {
	const data = Route$4.useLoaderData();
	const navigate = useNavigate();
	const hydrated = useHydrated();
	const planChecks = useOffsite((s) => s.planChecks);
	const togglePlan = useOffsite((s) => s.togglePlan);
	const [open, setOpen] = (0, import_react.useState)(null);
	const [hours, setHours] = (0, import_react.useState)(10);
	const featured = data.jobs;
	const done = WEEK_PLAN.filter((p) => planChecks[p.id]).length;
	const low = hours * 8;
	const high = hours * 22;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "Remote income, this week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl",
					children: "Get paid without going into an office."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
					children: "Live remote roles, platforms that pay for tests and gigs, and a pipeline so applications do not die in a tab. Nothing here is a miracle. People who earn do the applications."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-8 flex max-w-xl flex-col gap-3 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						const q = String(new FormData(e.currentTarget).get("q") || "").trim();
						navigate({
							to: "/jobs",
							search: { q: q || void 0 }
						});
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							name: "q",
							placeholder: "Role, skill, or company",
							className: "pl-10",
							"aria-label": "Search remote roles"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "h-11 sm:w-auto",
						children: "Search board"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs tabular-nums text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [data.count, " live roles"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [GIGS.length, " pay platforms"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Saved only on this device" })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "rise-in rise-in-2 mt-14 grid gap-4 md:grid-cols-3",
			children: [
				{
					kicker: "Hours to days",
					title: "Tests and studies",
					body: "Prolific, UserTesting, User Interviews. Lower hourly. Almost no portfolio.",
					to: "/gigs"
				},
				{
					kicker: "This week",
					title: "Freelance a craft",
					body: "One gig, five pitches. Upwork and Fiverr pay after you win, not after you sign up.",
					to: "/gigs"
				},
				{
					kicker: "Highest ceiling",
					title: "Hired remote",
					body: "Full-time and contract from Remotive, Remote OK, and Jobicy. Track them here.",
					to: "/jobs"
				}
			].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: card.to,
				className: "group rounded-xl border border-border bg-card p-5 shadow-soft transition-[transform,border-color] duration-200 hover:border-foreground/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: card.kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-2xl font-medium tracking-tight",
						children: card.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: card.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-pine",
						children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 transition-transform duration-150 group-hover:translate-x-0.5" })]
					})
				]
			}, card.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rise-in rise-in-3 mt-16 overflow-hidden rounded-xl bg-pine px-5 py-8 text-pine-fg sm:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-6 md:flex-row md:items-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.18em] text-pine-fg/70",
						children: "A quiet estimate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 font-display text-3xl font-medium tracking-tight",
						children: [
							"If you give it ",
							hours,
							" hours"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-md text-sm leading-relaxed text-pine-fg/80",
						children: "Tests and a small freelance gig commonly land in this band before fees. Hired roles sit above it. It is a range, not a promise."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-4xl font-medium tabular-nums tracking-tight sm:text-5xl",
					children: [
						"$",
						low.toLocaleString(),
						"–$",
						high.toLocaleString()
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-8 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.16em] text-pine-fg/70",
					children: "Hours this week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 4,
					max: 30,
					value: hours,
					onChange: (e) => setHours(Number(e.target.value)),
					className: "mt-3 w-full accent-cream"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-medium tracking-tight",
					children: "Seven days, then you know"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: hydrated ? `${done} of ${WEEK_PLAN.length} done` : "A week of actual sends"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/gigs",
						children: "Platforms"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 divide-y divide-border rounded-xl border border-border bg-card",
				children: WEEK_PLAN.map((item) => {
					const checked = hydrated && !!planChecks[item.id];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => togglePlan(item.id),
							"aria-pressed": checked,
							className: "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-md border border-border bg-cream",
							children: [checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-pine" }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: ["Toggle day ", item.day]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
									children: ["Day ", item.day]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-medium leading-snug",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: item.detail
								}),
								item.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: item.href,
									className: "mt-2 inline-flex text-sm font-medium text-pine hover:underline",
									children: item.hrefLabel
								}) : null
							]
						})]
					}, item.id);
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "On the board"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jobs",
					className: "text-sm font-medium text-pine hover:underline",
					children: "All roles"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 divide-y divide-border rounded-xl border border-border bg-card",
				children: featured.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-5 text-sm text-muted-foreground",
					children: data.error ?? "Listings are loading."
				}) : featured.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobRow, {
					job,
					onOpen: setOpen,
					compact: true
				}, job.id))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobSheet, {
			job: open,
			onOpenChange: (v) => !v && setOpen(null)
		})
	] });
}
//#endregion
export { Home as component };
