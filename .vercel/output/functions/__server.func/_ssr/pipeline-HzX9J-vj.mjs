import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Trash2, l as ExternalLink } from "../_libs/lucide-react.mjs";
import { a as cn, i as STATUS_LABEL, n as Button, o as incomeTotal, r as PIPELINE_STATUSES, s as useOffsite, t as AppShell } from "./button-CUFwqN2l.mjs";
import { t as Input } from "./input-DndF8tAC.mjs";
import { t as Label } from "./label-C5l5ZwA1.mjs";
import { t as useHydrated } from "./use-hydrated-DmhOHHTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-HzX9J-vj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PipelinePage() {
	const hydrated = useHydrated();
	const items = useOffsite((s) => s.items);
	const income = useOffsite((s) => s.income);
	const setStatus = useOffsite((s) => s.setStatus);
	const setNotes = useOffsite((s) => s.setNotes);
	const removeItem = useOffsite((s) => s.removeItem);
	const addIncome = useOffsite((s) => s.addIncome);
	const removeIncome = useOffsite((s) => s.removeIncome);
	const [mobileStatus, setMobileStatus] = (0, import_react.useState)("saved");
	const total = incomeTotal(income);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-4xl font-medium tracking-tight",
		children: "Pipeline"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-3 text-sm text-muted-foreground",
		children: "Loading your board…"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "This device"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl font-medium tracking-tight",
					children: "Pipeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted-foreground",
					children: "Saved roles stay in this browser. Apply, then move the card. Log what actually cleared so next week is not a guess."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-mono text-sm tabular-nums text-pine",
				children: [
					"$",
					total.toLocaleString(),
					" logged"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 md:hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-2",
				children: PIPELINE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMobileStatus(s),
					className: cn("h-9 shrink-0 rounded-full border px-3 text-sm", mobileStatus === s ? "border-pine bg-pine text-pine-fg" : "border-border bg-card text-muted-foreground"),
					children: [STATUS_LABEL[s], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1.5 font-mono text-xs tabular-nums",
						children: items.filter((i) => i.status === s).length
					})]
				}, s))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
				status: mobileStatus,
				items: items.filter((i) => i.status === mobileStatus),
				setStatus,
				setNotes,
				removeItem
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 hidden gap-3 md:grid md:grid-cols-4",
			children: PIPELINE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
				status: s,
				items: items.filter((i) => i.status === s),
				setStatus,
				setNotes,
				removeItem
			}, s))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-medium tracking-tight",
					children: "Income log"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Tests, gigs, invoices. If it hit the account, write it down."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IncomeForm, { onAdd: (entry) => addIncome(entry) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border rounded-xl border border-border bg-card",
					children: income.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "p-5 text-sm text-muted-foreground",
						children: "Nothing logged yet. First session counts."
					}) : income.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: row.source
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [row.date, row.note ? ` · ${row.note}` : ""]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm tabular-nums text-pine",
								children: ["$", row.amount.toLocaleString()]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
								onClick: () => removeIncome(row.id),
								"aria-label": "Remove entry",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})]
					}, row.id))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: "Why this exists"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: "Remote income dies in open tabs. Save the role, apply, follow up, log the money. That loop is the whole product."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-5 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jobs",
							children: "Find another role"
						})
					})
				]
			})]
		})
	] });
}
function Column({ status, items, setStatus, setNotes, removeItem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-card p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-baseline justify-between px-1 pb-3 pt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium",
				children: STATUS_LABEL[status]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tabular-nums text-muted-foreground",
				children: items.length
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-1 py-6 text-sm text-muted-foreground",
				children: "Empty."
			}) : items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-lg border border-border bg-cream p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-medium leading-snug",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: [item.company, item.salaryLabel ? ` · ${item.salaryLabel}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-2 block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "sr-only",
							children: ["Move ", item.title]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: item.status,
							onChange: (e) => setStatus(item.id, e.target.value),
							className: "h-10 w-full rounded-md border border-input bg-card px-2 text-sm",
							children: PIPELINE_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: STATUS_LABEL[s]
							}, s))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: item.notes,
						onChange: (e) => setNotes(item.id, e.target.value),
						placeholder: "Note, recruiter, date",
						className: "mt-2 min-h-16 w-full rounded-md border border-input bg-card px-2 py-2 text-sm"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: item.url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex h-11 items-center gap-1 text-sm font-medium text-pine hover:underline",
							children: ["Open listing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => removeItem(item.id),
							className: "flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground",
							"aria-label": "Remove",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					})
				]
			}, item.id))
		})]
	});
}
function IncomeForm({ onAdd }) {
	const [source, setSource] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [note, setNote] = (0, import_react.useState)("");
	const canSubmit = (0, import_react.useMemo)(() => {
		const n = Number(amount);
		return source.trim().length > 0 && Number.isFinite(n) && n > 0;
	}, [source, amount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-5 grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2",
		onSubmit: (e) => {
			e.preventDefault();
			const n = Number(amount);
			if (!canSubmit) return;
			onAdd({
				date,
				source: source.trim(),
				amount: n,
				note: note.trim()
			});
			setSource("");
			setAmount("");
			setNote("");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "inc-source",
					children: "Source"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "inc-source",
					className: "mt-1.5",
					value: source,
					onChange: (e) => setSource(e.target.value),
					placeholder: "Prolific, Fiverr, salary"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "inc-amount",
				children: "Amount (USD)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "inc-amount",
				className: "mt-1.5",
				inputMode: "decimal",
				value: amount,
				onChange: (e) => setAmount(e.target.value),
				placeholder: "42"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "inc-date",
				children: "Date"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "inc-date",
				className: "mt-1.5",
				type: "date",
				value: date,
				onChange: (e) => setDate(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "inc-note",
				children: "Note"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "inc-note",
				className: "mt-1.5",
				value: note,
				onChange: (e) => setNote(e.target.value),
				placeholder: "Optional"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "sm:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !canSubmit,
					children: "Log payout"
				})
			})
		]
	});
}
//#endregion
export { PipelinePage as component };
