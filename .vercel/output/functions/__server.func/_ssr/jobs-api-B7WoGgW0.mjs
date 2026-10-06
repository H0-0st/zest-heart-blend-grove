import { i as htmlToText, o as normalizeCategory, r as formatSalaryRange } from "./jobs-DgYMk5sS.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-api-B7WoGgW0.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var TTL_MS = 48e4;
var UA = "Mozilla/5.0 (compatible; OffsiteBoard/1.0; +https://grok.com)";
var cache = null;
var inflight = null;
async function fetchJson(url, timeoutMs = 12e3) {
	const res = await fetch(url, {
		headers: {
			Accept: "application/json",
			"User-Agent": UA
		},
		signal: AbortSignal.timeout(timeoutMs)
	});
	if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
	return res.json();
}
function clip(text, n) {
	if (text.length <= n) return text;
	return `${text.slice(0, n).trimEnd()}…`;
}
function asString(v) {
	return typeof v === "string" ? v : v == null ? "" : String(v);
}
function asNum(v) {
	if (typeof v === "number" && Number.isFinite(v)) return v;
	if (typeof v === "string" && v.trim()) {
		const n = Number(v.replace(/[^0-9.]/g, ""));
		return Number.isFinite(n) ? n : null;
	}
	return null;
}
function tagsOf(v) {
	if (Array.isArray(v)) return v.map((t) => asString(t).trim()).filter(Boolean).slice(0, 8);
	if (typeof v === "string" && v.trim()) return v.split(/[,|]/).map((t) => t.trim()).filter(Boolean).slice(0, 8);
	return [];
}
function fromRemotive(raw) {
	const root = raw;
	const jobs = Array.isArray(root?.jobs) ? root.jobs : [];
	const out = [];
	for (const item of jobs) {
		if (!item || typeof item !== "object") continue;
		const j = item;
		const title = asString(j.title).trim();
		const company = asString(j.company_name).trim();
		const url = asString(j.url).trim();
		if (!title || !company || !url) continue;
		const tags = tagsOf(j.tags);
		const category = normalizeCategory(asString(j.category), tags, title);
		const description = clip(htmlToText(asString(j.description)), 1600);
		const salary = asString(j.salary).trim();
		const id = asString(j.id) || `${company}-${title}`;
		out.push({
			id: `remotive:${id}`,
			source: "remotive",
			title,
			company,
			logo: asString(j.company_logo_url || j.company_logo) || null,
			category,
			tags,
			salaryLabel: salary || null,
			salaryMin: asNum(salary),
			location: asString(j.candidate_required_location) || "Remote",
			type: asString(j.job_type).replaceAll("_", " ") || null,
			url,
			excerpt: clip(description, 220),
			description,
			publishedAt: asString(j.publication_date) || (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return out;
}
function fromRemoteok(raw) {
	const list = Array.isArray(raw) ? raw : [];
	const out = [];
	for (const item of list) {
		if (!item || typeof item !== "object") continue;
		const j = item;
		const title = asString(j.position).trim();
		const company = asString(j.company).trim();
		if (!title || !company) continue;
		const url = asString(j.apply_url || j.url).trim();
		if (!url) continue;
		const tags = tagsOf(j.tags);
		const category = normalizeCategory(tags.join(" "), tags, title);
		const description = clip(htmlToText(asString(j.description)), 1600);
		const min = asNum(j.salary_min);
		const max = asNum(j.salary_max);
		const id = asString(j.id) || `${company}-${title}`;
		out.push({
			id: `remoteok:${id}`,
			source: "remoteok",
			title,
			company,
			logo: asString(j.company_logo || j.logo) || null,
			category,
			tags,
			salaryLabel: formatSalaryRange(min, max),
			salaryMin: min,
			location: asString(j.location) || "Worldwide",
			type: null,
			url,
			excerpt: clip(description, 220),
			description,
			publishedAt: asString(j.date) || (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return out;
}
function fromJobicy(raw) {
	const root = raw;
	const jobs = Array.isArray(root?.jobs) ? root.jobs : [];
	const out = [];
	for (const item of jobs) {
		if (!item || typeof item !== "object") continue;
		const j = item;
		const title = asString(j.jobTitle).trim();
		const company = asString(j.companyName).trim();
		const url = asString(j.url).trim();
		if (!title || !company || !url) continue;
		const industry = tagsOf(j.jobIndustry);
		const tags = [...industry, ...tagsOf(j.jobType)].slice(0, 8);
		const category = normalizeCategory(industry.join(" "), tags, title);
		const description = clip(htmlToText(asString(j.jobDescription || j.jobExcerpt)), 1600);
		const min = asNum(j.salaryMin);
		const max = asNum(j.salaryMax);
		const id = asString(j.id) || `${company}-${title}`;
		const types = tagsOf(j.jobType);
		out.push({
			id: `jobicy:${id}`,
			source: "jobicy",
			title,
			company,
			logo: asString(j.companyLogo) || null,
			category,
			tags,
			salaryLabel: formatSalaryRange(min, max, asString(j.salaryCurrency) || "USD", asString(j.salaryPeriod)),
			salaryMin: min,
			location: asString(j.jobGeo) || "Remote",
			type: types[0] || asString(j.jobLevel) || null,
			url,
			excerpt: clip(description || asString(j.jobExcerpt), 220),
			description,
			publishedAt: asString(j.pubDate) || (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return out;
}
function dedupe(jobs) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const job of jobs) {
		const key = `${job.company.toLowerCase().trim()}|${job.title.toLowerCase().trim()}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(job);
	}
	return out;
}
async function loadFresh() {
	const targets = [
		{
			source: "remotive",
			url: "https://remotive.com/api/remote-jobs",
			parse: fromRemotive
		},
		{
			source: "remoteok",
			url: "https://remoteok.com/api",
			parse: fromRemoteok
		},
		{
			source: "jobicy",
			url: "https://jobicy.com/api/v2/remote-jobs?count=100",
			parse: fromJobicy
		}
	];
	const settled = await Promise.allSettled(targets.map(async (t) => ({
		t,
		raw: await fetchJson(t.url)
	})));
	const stats = [];
	const collected = [];
	const errors = [];
	settled.forEach((result, i) => {
		const source = targets[i].source;
		if (result.status === "fulfilled") {
			const jobs = result.value.t.parse(result.value.raw);
			collected.push(...jobs);
			stats.push({
				source,
				count: jobs.length,
				ok: true
			});
		} else {
			stats.push({
				source,
				count: 0,
				ok: false
			});
			errors.push(source);
		}
	});
	const jobs = dedupe(collected).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
	return {
		jobs,
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
		stats,
		error: jobs.length === 0 ? "Live listings could not be reached. Try again in a moment." : errors.length ? `Some sources missed: ${errors.join(", ")}.` : null
	};
}
async function getPayload() {
	if (cache && Date.now() - cache.at < TTL_MS) return cache.payload;
	if (inflight) return inflight;
	inflight = loadFresh().then((payload) => {
		cache = {
			at: Date.now(),
			payload
		};
		return payload;
	}).finally(() => {
		inflight = null;
	});
	return inflight;
}
var listJobs_createServerFn_handler = createServerRpc({
	id: "d07785986d5b0f6acbc0fc0e486627625d03857c3ba365bbcef8e59bfc3c43b9",
	name: "listJobs",
	filename: "src/lib/jobs-api.ts"
}, (opts) => listJobs.__executeServer(opts));
var listJobs = createServerFn({ method: "GET" }).handler(listJobs_createServerFn_handler, async () => {
	const payload = await getPayload();
	return {
		...payload,
		jobs: payload.jobs.map((j) => ({
			...j,
			description: j.description.slice(0, 900)
		}))
	};
});
var matchJobs_createServerFn_handler = createServerRpc({
	id: "05cfc76acd98fec54d1832b7a5b494ce9f4e01bb7b40e8c4735ae7e5446dc683",
	name: "matchJobs",
	filename: "src/lib/jobs-api.ts"
}, (opts) => matchJobs.__executeServer(opts));
var matchJobs = createServerFn({ method: "POST" }).validator((input) => input).handler(matchJobs_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Matching is unavailable right now."
	};
	const profile = data.profile.trim().slice(0, 4e3);
	if (profile.length < 20) return {
		ok: false,
		error: "Add a bit more — skills, tools, and the kind of work you want."
	};
	const payload = await getPayload();
	const wanted = new Set(data.jobIds ?? []);
	const compact = (wanted.size > 0 ? payload.jobs.filter((j) => wanted.has(j.id)) : payload.jobs).slice(0, 45).map((j) => ({
		id: j.id,
		title: j.title,
		company: j.company,
		category: j.category,
		tags: j.tags.slice(0, 6),
		salary: j.salaryLabel,
		location: j.location,
		excerpt: j.excerpt
	}));
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .3,
			max_tokens: 1200,
			messages: [{
				role: "system",
				content: "You match people to remote jobs. Be practical. Only use job ids from the provided list. Return strict JSON."
			}, {
				role: "user",
				content: `Candidate profile:\n${profile}\n\nJobs:\n${JSON.stringify(compact)}\n\nPick up to 8 best matches. JSON shape: {"matches":[{"id":"...","score":0-100,"why":"one sentence","angle":"what to emphasize in the application"}]}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Match failed (${res.status}).`
	};
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	const jsonStart = text.indexOf("{");
	const jsonEnd = text.lastIndexOf("}");
	if (jsonStart < 0 || jsonEnd <= jsonStart) return {
		ok: false,
		error: "Could not read the match result."
	};
	try {
		const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
		const allowed = new Set(compact.map((j) => j.id));
		return {
			ok: true,
			matches: (parsed.matches ?? []).filter((m) => m && allowed.has(m.id)).slice(0, 8).map((m) => ({
				id: m.id,
				score: Math.max(0, Math.min(100, Number(m.score) || 0)),
				why: asString(m.why).slice(0, 280),
				angle: asString(m.angle).slice(0, 280)
			}))
		};
	} catch {
		return {
			ok: false,
			error: "Could not parse the match result."
		};
	}
});
var writeCover_createServerFn_handler = createServerRpc({
	id: "914d3222a45865d3ddf9650d5cf8169a734b78a581c1c040d87c9ca3233b09bd",
	name: "writeCover",
	filename: "src/lib/jobs-api.ts"
}, (opts) => writeCover.__executeServer(opts));
var writeCover = createServerFn({ method: "POST" }).validator((input) => input).handler(writeCover_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Cover letters are unavailable right now."
	};
	const job = (await getPayload()).jobs.find((j) => j.id === data.jobId);
	if (!job) return {
		ok: false,
		error: "That role is no longer on the board."
	};
	const profile = data.profile.trim().slice(0, 4e3);
	if (profile.length < 20) return {
		ok: false,
		error: "Paste a short profile so the letter can be specific."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .5,
			max_tokens: 700,
			messages: [{
				role: "system",
				content: "Write cover letters that sound like a competent adult. No 'I am writing to apply'. No buzzword stacks. 180–220 words. Plain prose."
			}, {
				role: "user",
				content: `Profile:\n${profile}\n\nRole: ${job.title} at ${job.company}\nLocation: ${job.location}\nTags: ${job.tags.join(", ")}\nAbout the role:\n${job.description}`
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `Letter failed (${res.status}).`
	};
	const text = ((await res.json()).choices?.[0]?.message?.content ?? "").trim();
	if (!text) return {
		ok: false,
		error: "Empty letter."
	};
	return {
		ok: true,
		text,
		jobTitle: job.title,
		company: job.company
	};
});
//#endregion
export { listJobs_createServerFn_handler, matchJobs_createServerFn_handler, writeCover_createServerFn_handler };
