import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as cn, n as Button, s as useOffsite, t as AppShell } from "./button-CUFwqN2l.mjs";
import { a as jobSearchHaystack } from "./jobs-DgYMk5sS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as matchJobs, n as Route$1, o as writeCover } from "./router-Cbjxrkhm.mjs";
import { n as JobSheet } from "./job-sheet-QTYELJoh.mjs";
import { t as Label } from "./label-C5l5ZwA1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/match-Bf03-xVQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-lg border border-input bg-cream px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var PROFILE_KEY = "offsite-profile";
function prefilter(jobs, profile, n = 40) {
	const tokens = profile.toLowerCase().split(/\W+/).filter((t) => t.length > 3);
	const scored = jobs.map((job) => {
		const hay = jobSearchHaystack(job);
		const hits = tokens.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
		return {
			id: job.id,
			hits,
			at: Date.parse(job.publishedAt) || 0
		};
	});
	scored.sort((a, b) => b.hits - a.hits || b.at - a.at);
	return scored.slice(0, n).map((s) => s.id);
}
function MatchPage() {
	const data = Route$1.useLoaderData();
	const addFromJob = useOffsite((s) => s.addFromJob);
	const [profile, setProfile] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [letterBusy, setLetterBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [matches, setMatches] = (0, import_react.useState)([]);
	const [letter, setLetter] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			setProfile(localStorage.getItem(PROFILE_KEY) ?? "");
		} catch {}
	}, []);
	const byId = (0, import_react.useMemo)(() => {
		return new Map(data.jobs.map((j) => [j.id, j]));
	}, [data.jobs]);
	async function runMatch() {
		setBusy(true);
		setError(null);
		setLetter(null);
		try {
			localStorage.setItem(PROFILE_KEY, profile);
		} catch {}
		const ids = prefilter(data.jobs, profile);
		const result = await matchJobs({ data: {
			profile,
			jobIds: ids
		} });
		setBusy(false);
		if (!result.ok) {
			setError(result.error);
			return;
		}
		setMatches(result.matches);
		if (result.matches.length === 0) setError("No strong matches in the current board. Broaden the profile.");
	}
	async function cover(jobId) {
		setLetterBusy(jobId);
		const result = await writeCover({ data: {
			profile,
			jobId
		} });
		setLetterBusy(null);
		if (!result.ok) {
			toast(result.error);
			return;
		}
		setLetter({
			jobId,
			title: result.jobTitle,
			company: result.company,
			text: result.text
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
			children: "Against the live board"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl",
			children: "Match your craft to roles that are actually open."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground",
			children: "Paste skills, tools, and the kind of work you want. Matching uses the listings on the board — not a fantasy catalog."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault();
					runMatch();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "profile",
						children: "Profile"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "profile",
						value: profile,
						onChange: (e) => setProfile(e.target.value),
						placeholder: "Example: Product designer, 6 years. Figma, design systems, B2B SaaS. Want a senior IC role, US-friendly timezone. Portfolio at…",
						className: "min-h-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: busy || profile.trim().length < 20,
						children: busy ? "Matching…" : "Match me"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-warn",
						children: error
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [matches.length === 0 && !letter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground",
				children: "Results land here. Save the ones worth applying to, then generate a letter only when you will actually send it."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-3",
				children: matches.map((m) => {
					const job = byId.get(m.id);
					if (!job) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl font-medium tracking-tight",
									children: job.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs tabular-nums text-pine",
									children: m.score
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-sm text-muted-foreground",
								children: [job.company, job.salaryLabel ? ` · ${job.salaryLabel}` : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed",
								children: m.why
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ["Angle: ", m.angle]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setOpen(job),
										children: "View role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => {
											addFromJob(job, "saved");
											toast("Saved to pipeline");
										},
										children: "Save"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => void cover(job.id),
										disabled: letterBusy === job.id || profile.trim().length < 20,
										children: letterBusy === job.id ? "Writing…" : "Cover letter"
									})
								]
							})
						]
					}, m.id);
				})
			}), letter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl border border-border bg-cream p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-2xl font-medium tracking-tight",
						children: ["Letter for ", letter.title]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: letter.company
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 whitespace-pre-wrap text-sm leading-relaxed",
						children: letter.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4",
						variant: "outline",
						onClick: async () => {
							await navigator.clipboard.writeText(letter.text);
							toast("Copied");
						},
						children: "Copy letter"
					})
				]
			}) : null] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobSheet, {
			job: open,
			onOpenChange: (v) => !v && setOpen(null)
		})
	] });
}
//#endregion
export { MatchPage as component };
