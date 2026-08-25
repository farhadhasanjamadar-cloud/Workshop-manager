import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  LayoutDashboard, PhoneCall, FileText, Hammer, Boxes, ShoppingCart,
  Wallet, Users, BarChart3, StickyNote, Plus, X, Search, Trash2,
  Pencil, Menu, Download, AlertTriangle, ArrowRight, Check, ChevronDown,
  BookUser, Landmark, TrendingUp, Phone, MessageCircle, Bell, Settings, Image, FileDown
} from "lucide-react";

/* ---------------------------------------------------------------- */
/* Constants                                                          */
/* ---------------------------------------------------------------- */

const STAGES = ["Confirmed", "Material Ready", "Frame", "Foam", "Stitching", "Upholstery", "QC", "Packing", "Delivered"];
const REQUIREMENTS = ["3+1+1 Sofa", "Corner Sofa", "Sofa with Launcher", "Sofa Refurbishing", "Recliner", "Headboard", "Others"];
const PRIORITIES = ["Low", "Normal", "High", "Urgent"];
const CALL_DETAILS = ["Answered", "Didn't answer", "Busy", "Switch off", "Inactive connection"];
const ENQUIRY_SOURCE = ["Referral", "Walk-in", "Instagram"];
const ENQUIRY_OUTCOME = ["Pending", "Accepted", "Rejected"];
const ENQUIRY_STATUSES = ["Hot", "Warm", "Cold", "Converted", "Lost"];
const QUOTE_STATUSES = ["Draft", "Sent", "Converted", "Expired"];
const MATERIAL_CATEGORIES = ["Foam", "Fabric", "Frame / Wood", "Hardware", "Legs", "Thread", "Other"];
const FIN_CATEGORIES_OUT = ["Material Purchase", "Salary / Wages", "Rent", "Electricity", "Transport", "Maintenance", "Other Expense"];
const FIN_CATEGORIES_IN = ["Sale / Payment Received", "Advance Received", "Other Income"];
const ACCESS_LEVELS = ["Owner", "Manager", "Staff", "View only"];
const NOTE_CATEGORIES = ["Idea", "Problems", "Customer request", "Factory improvement", "General"];
const DEFAULT_LOGO = "data:image/jpeg;base64,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";
const QUOTE_TERMS = [
  "Quote valid for 15 days.",
  "High-quality branded century foam is used for unbeatable comfort and resilience.",
  "Warranty matches your choice.",
  "We stand behind our quality with a full 10-year warranty on the frame.",
  "Fabric shade variations up to 5% may occur from roll to roll due to the natural dye process and manufacturing tolerance.",
  "Payment terms: 75% advance, 25% at the time of delivery.",
  "Orders cancellable before production with a 20% restocking fee.",
  "Post-production cancellations forfeit the full advance.",
  "Any additional work will be chargeable.",
  "Above prices are fixed and are excluding GST.",
];

const NAV = [
  { key: "today", label: "Dashboard", icon: LayoutDashboard },
  { key: "business", label: "Business Dashboard", icon: TrendingUp },
  { key: "enquiries", label: "Enquiries", icon: PhoneCall },
  { key: "quotations", label: "Quotations", icon: FileText },
  { key: "jobs", label: "Production", icon: Hammer },
  { key: "customers", label: "Customers", icon: BookUser },
  { key: "inventory", label: "Inventory", icon: Boxes },
  { key: "purchases", label: "Purchases", icon: ShoppingCart },
  { key: "finance", label: "Finance", icon: Wallet },
  { key: "staff", label: "Staff", icon: Users },
  { key: "accounts", label: "Accounts", icon: Landmark },
  { key: "reports", label: "Reports", icon: BarChart3 },
  { key: "notes", label: "Notes", icon: StickyNote },
  { key: "settings", label: "Business Profile", icon: Settings },
];

const KEYS = ["enquiries", "quotations", "jobs", "materials", "purchases", "finance", "staff", "notes", "customers"];

/* ---------------------------------------------------------------- */
/* Helpers                                                            */
/* ---------------------------------------------------------------- */

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso) => (iso ? new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—");
const fmtINR = (n) => "\u20b9" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
const num = (v) => (v === "" || v === null || v === undefined ? 0 : Number(v));

function sameMonth(iso, ref) {
  if (!iso) return false;
  const d = new Date(iso + "T00:00:00");
  return d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
}
function inPeriod(iso, period) {
  if (!iso) return false;
  if (period === "all") return true;
  const d = new Date(iso + "T00:00:00");
  const now = new Date();
  if (period === "today") return d.toDateString() === now.toDateString();
  if (period === "week") {
    const start = new Date(now); start.setDate(now.getDate() - now.getDay()); start.setHours(0, 0, 0, 0);
    return d >= start;
  }
  if (period === "month") return sameMonth(iso, now);
  if (period === "year") return d.getFullYear() === now.getFullYear();
  return true;
}
function daysBetween(a, b) {
  return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
}
const Q = String.fromCharCode(34);
function toCSV(rows, headers) {
  const esc = (v) => Q + String(v ?? "").split(Q).join(Q + Q) + Q;
  const lines = [headers.map(esc).join(",")];
  rows.forEach((r) => lines.push(headers.map((h) => esc(r[h])).join(",")));
  return lines.join("\n");
}
function downloadCSV(filename, rows, headers) {
  const csv = toCSV(rows, headers);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

/* ---------------------------------------------------------------- */
/* Supabase Auth — direct REST calls, no SDK/CDN dependency           */
/* ---------------------------------------------------------------- */

// Fill these in with your Supabase project's URL and PUBLISHABLE (anon) key —
// find them in Supabase: Project Settings -> API. Never put the service_role/secret key here.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
const SESSION_KEY = "sb_session";

// TEMPORARY DIAGNOSTIC BUILD — exposes raw fetch/HTTP failure detail in the login
// error box instead of a friendly message, so the exact browser-side failure can
// be read off-screen. Revert to friendly messages once the cause is confirmed.
async function supabaseAuthRequest(path, body) {
  let res;
  try {
    res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
      body: JSON.stringify(body),
    });
  } catch (e) {
    throw new Error(`[fetch exception] name=${(e && e.name) || "?"} message=${(e && e.message) || "?"}`);
  }
  let bodyText = "";
  try { bodyText = await res.text(); } catch (e) { bodyText = `(could not read response body: ${e && e.message})`; }
  let json = null;
  try { json = bodyText ? JSON.parse(bodyText) : null; } catch (e) { /* body wasn't JSON — bodyText is shown raw below */ }
  if (!res.ok) {
    const supaMsg = json && (json.error_description || json.msg || json.error || json.message);
    throw new Error(`[HTTP ${res.status} ${res.statusText || ""}] ${supaMsg || bodyText || "(empty body)"}`);
  }
  return json;
}
async function supabaseDbRequest(path, options = {}) {
  const session = await loadStoredSession();

  if (!session?.access_token) {
    throw new Error("Not signed in to Supabase");
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `[DB ${res.status}] ${text || res.statusText}`
    );
  }

  return text ? JSON.parse(text) : null;
}
function normalizeSession(raw) {
  const expiresAt = raw.expires_at || (Math.floor(Date.now() / 1000) + (raw.expires_in || 3600));
  return { access_token: raw.access_token, refresh_token: raw.refresh_token, expires_at: expiresAt, user: raw.user };
}
async function supabaseSignInWithPassword(email, password) {
  return normalizeSession(await supabaseAuthRequest("token?grant_type=password", { email, password }));
}
async function supabaseRefreshSession(refreshToken) {
  return normalizeSession(await supabaseAuthRequest("token?grant_type=refresh_token", { refresh_token: refreshToken }));
}
async function supabaseSignOutRemote(accessToken) {
  try {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${accessToken}` },
    });
  } catch (e) { /* best effort — local session is cleared regardless */ }
}
async function loadStoredSession() { return getKey(SESSION_KEY, null); }
async function saveStoredSession(session) { await setKey(SESSION_KEY, session); }
async function clearStoredSession() {
  try { await window.storage.delete(SESSION_KEY); } catch (e) { /* ignore */ }
}

let jsPDFPromise = null;
function loadJsPDF() {
  if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
  if (jsPDFPromise) return jsPDFPromise;
  jsPDFPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = () => resolve(window.jspdf.jsPDF);
    script.onerror = () => { jsPDFPromise = null; reject(new Error("Could not load PDF library — check your connection.")); };
    document.body.appendChild(script);
  });
  return jsPDFPromise;
}

async function downloadQuotationPDF(quote, profile) {
  const jsPDF = await loadJsPDF();
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  // Header: logo + company name
  if (profile && profile.logo) {
    try {
      const fmt = profile.logo.includes("image/png") ? "PNG" : "JPEG";
      doc.addImage(profile.logo, fmt, margin, y, 56, 56);
    } catch (e) { /* ignore bad image */ }
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(profile && profile.companyName ? profile.companyName : "Quotation", margin + (profile && profile.logo ? 68 : 0), y + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(90);
  let subY = y + 38;
  if (profile && profile.address) { doc.text(profile.address, margin + (profile.logo ? 68 : 0), subY); subY += 12; }
  if (profile && profile.phone) { doc.text(`Phone: ${profile.phone}`, margin + (profile.logo ? 68 : 0), subY); subY += 12; }
  if (profile && profile.gst) { doc.text(`GSTIN: ${profile.gst}`, margin + (profile.logo ? 68 : 0), subY); }

  y += 78;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 26;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20);
  doc.text("Quotation", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${fmtDate(quote.date)}`, pageW - margin, y, { align: "right" });
  y += 26;

  const rupees = (n) => "Rs. " + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  const rows = [
    ["Customer name", quote.customerName || "-"],
    ["Phone number", quote.phone || "-"],
    ["Requirement", quote.requirement || "-"],
    ["Size", quote.size || "-"],
    ["Fabric", quote.fabric || "-"],
    ["Price quoted", quote.price ? rupees(quote.price) : "-"],
  ];
  doc.setFontSize(10.5);
  rows.forEach(([label, val]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60);
    doc.text(label, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20);
    doc.text(String(val), margin + 150, y);
    y += 20;
  });

  if (quote.detailsItems) {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60);
    doc.text("Details / items", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20);
    const lines = doc.splitTextToSize(quote.detailsItems, pageW - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 6;
  }

  y += 16;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text("Terms & Conditions", margin, y);
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(70);
  QUOTE_TERMS.forEach((t) => {
    const lines = doc.splitTextToSize(`•  ${t}`, pageW - margin * 2);
    if (y > 780) { doc.addPage(); y = margin; }
    doc.text(lines, margin, y);
    y += lines.length * 13 + 4;
  });

  const filename = `Quotation-${(quote.customerName || "customer").replace(/\s+/g, "_")}-${quote.date || todayISO()}.pdf`;
  doc.save(filename);
}

function withTimeout(promise, ms, fallback) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}
async function getKey(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
}
async function setKey(key, value) {
  try {
    const json = JSON.stringify(value);

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(key, json);
      } catch (storageError) {
        console.warn("Local storage unavailable:", storageError);
      }
    }

    // Local storage is only a backup.
    // Do not block Supabase/cloud saving if it fails.
    return true;
  } catch (e) {
    console.error("Storage preparation failed:", e);

    // Still allow the cloud/database save to continue.
    return true;
  }
}
/* ---------------------------------------------------------------- */
/* Small UI primitives                                                */
/* ---------------------------------------------------------------- */

function Field({ label, required, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}{required && <span className="req">*</span>}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}
function Input(props) { return <input className="ctrl" {...props} />; }
function TextArea(props) { return <textarea className="ctrl" rows={3} {...props} />; }
function Select({ options, placeholder, ...props }) {
  return (
    <div className="select-wrap">
      <select className="ctrl" {...props}>
        <option value="">{placeholder || "Select"}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={15} className="select-caret" />
    </div>
  );
}
function Badge({ tone = "default", children }) { return <span className={`badge badge-${tone}`}>{children}</span>; }

function StatCard({ label, value, tone, sub }) {
  return (
    <div className="stat-card">
      <div className={`stat-value tone-${tone || "text"}`}>{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}
function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="empty">
      <Icon size={26} strokeWidth={1.4} />
      <p className="empty-title">{title}</p>
      {hint && <p className="empty-hint">{hint}</p>}
    </div>
  );
}
function SectionHead({ title, action }) {
  return (
    <div className="section-head">
      <h3>{title}</h3>
      {action}
      <div className="stitch" />
    </div>
  );
}

/* Drawer / modal shell sliding from right */
function Drawer({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose}><X size={19} /></button>
        </div>
        <div className="drawer-body">{children}</div>
        {footer && <div className="drawer-footer">{footer}</div>}
      </div>
    </div>
  );
}
function ConfirmDialog({ open, label, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="drawer-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <AlertTriangle size={22} color="var(--bad)" />
        <p>Delete <strong>{label}</strong>? This can't be undone.</p>
        <div className="confirm-actions">
          <button className="btn ghost" onClick={onCancel}>Cancel</button>
          <button className="btn danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
function Toast({ message }) {
  if (!message) return null;
  return <div className="toast"><Check size={15} /> {message}</div>;
}

/* ---------------------------------------------------------------- */
/* Forms                                                              */
/* ---------------------------------------------------------------- */

function useForm(initial) {
  const [v, setV] = useState(initial);
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e && e.target ? e.target.value : e }));
  return [v, set, setV];
}

// Name fields: letters, spaces and common name punctuation only — no digits.
function nameFilter(value) { return value.replace(/[0-9]/g, ""); }
// Phone fields: digits only, capped at 10.
function phoneFilter(value) { return value.replace(/\D/g, "").slice(0, 10); }
function NameField({ value, onChange, ...props }) {
  return <Input value={value} onChange={(e) => onChange({ target: { value: nameFilter(e.target.value) } })} {...props} />;
}
function PhoneField({ value, onChange, ...props }) {
  return <Input value={value} onChange={(e) => onChange({ target: { value: phoneFilter(e.target.value) } })} inputMode="numeric" maxLength={10} {...props} />;
}

function FormEnquiry({ data, customers, onSave, onCancel }) {
  const [v, set, setV] = useForm(data || { date: todayISO(), customerName: "", phone: "", location: "", callDetails: "", customerType: "", requirement: "", requirementOther: "", customerBudget: "", amountQuoted: "", status: "Warm", outcome: "Pending", nextFollowUp: "", nextAction: "", remarks: "" });
  const fillFromCustomer = () => {
    const m = (customers || []).find((c) => c.name.trim().toLowerCase() === v.customerName.trim().toLowerCase());
    if (m) setV((s) => ({ ...s, phone: s.phone || m.phone, location: s.location || m.address }));
  };
  const phoneValid = v.phone.length === 10;
  const reqValid = v.requirement !== "Others" || v.requirementOther.trim();
  const canSave = v.customerName.trim() && phoneValid && reqValid;
  function handleSave() {
    if (!canSave) return;
    const requirement = v.requirement === "Others" && v.requirementOther.trim() ? v.requirementOther.trim() : v.requirement;
    onSave({ ...v, requirement });
  }
  return (
    <>
      <Field label="Date"><Input type="date" value={v.date} onChange={set("date")} /></Field>
      <Field label="Customer name" required hint="Start typing to find an existing customer">
        <NameField value={v.customerName} onChange={set("customerName")} onBlur={fillFromCustomer} list="cust-names-e" placeholder="Full name" />
        <datalist id="cust-names-e">{(customers || []).map((c) => <option key={c.id} value={c.name} />)}</datalist>
      </Field>
      <Field label="Phone number" required hint="Exactly 10 digits">
        <PhoneField value={v.phone} onChange={set("phone")} placeholder="10-digit mobile" />
      </Field>
      <Field label="Location"><Input value={v.location} onChange={set("location")} placeholder="Area / city" /></Field>
      <Field label="Call details"><Select value={v.callDetails} onChange={set("callDetails")} options={CALL_DETAILS} /></Field>
      <Field label="Customer type"><Select value={v.customerType} onChange={set("customerType")} options={ENQUIRY_SOURCE} /></Field>
      <Field label="Requirement"><Select value={v.requirement} onChange={set("requirement")} options={REQUIREMENTS} /></Field>
      {v.requirement === "Others" && (
        <Field label="Please specify requirement" required><Input value={v.requirementOther} onChange={set("requirementOther")} placeholder="Type the requirement" /></Field>
      )}
      <div className="two-col">
        <Field label="Customer budget"><Input type="number" value={v.customerBudget} onChange={set("customerBudget")} placeholder="₹" /></Field>
        <Field label="Amount quoted"><Input type="number" value={v.amountQuoted} onChange={set("amountQuoted")} placeholder="₹" /></Field>
      </div>
      <Field label="Enquiry status"><Select value={v.status} onChange={set("status")} options={ENQUIRY_STATUSES} /></Field>
      <Field label="Enquiry outcome" hint="Accepted enquiries can be turned into a quotation with one tap"><Select value={v.outcome} onChange={set("outcome")} options={ENQUIRY_OUTCOME} /></Field>
      <Field label="Next follow-up date"><Input type="date" value={v.nextFollowUp} onChange={set("nextFollowUp")} /></Field>
      <Field label="Next action"><Input value={v.nextAction} onChange={set("nextAction")} placeholder="e.g. Send fabric samples" /></Field>
      <Field label="Remarks"><TextArea value={v.remarks} onChange={set("remarks")} /></Field>
      <FormActions onCancel={onCancel} onSave={handleSave} disabled={!canSave} />
    </>
  );
}

function FormQuotation({ data, customers, onSave, onCancel }) {
  const [v, set, setV] = useForm(data || { date: todayISO(), customerName: "", phone: "", location: "", customerType: "", requirement: "", requirementOther: "", size: "", fabric: "", detailsItems: "", price: "", validUntil: "", notes: "", status: "Draft" });
  const fillFromCustomer = () => {
    const m = (customers || []).find((c) => c.name.trim().toLowerCase() === v.customerName.trim().toLowerCase());
    if (m) setV((s) => ({ ...s, phone: s.phone || m.phone, location: s.location || m.address }));
  };
  const phoneValid = v.phone.length === 10;
  const reqValid = v.requirement !== "Others" || v.requirementOther.trim();
  const canSave = v.customerName.trim() && phoneValid && reqValid;
  function handleSave() {
    if (!canSave) return;
    const requirement = v.requirement === "Others" && v.requirementOther.trim() ? v.requirementOther.trim() : v.requirement;
    onSave({ ...v, requirement });
  }
  return (
    <>
      <Field label="Date"><Input type="date" value={v.date} onChange={set("date")} /></Field>
      <Field label="Customer name" required hint="Start typing to find an existing customer">
        <NameField value={v.customerName} onChange={set("customerName")} onBlur={fillFromCustomer} list="cust-names-q" />
        <datalist id="cust-names-q">{(customers || []).map((c) => <option key={c.id} value={c.name} />)}</datalist>
      </Field>
      <Field label="Phone number" required hint="Exactly 10 digits"><PhoneField value={v.phone} onChange={set("phone")} /></Field>
      <Field label="Location"><Input value={v.location} onChange={set("location")} /></Field>
      <Field label="Customer type"><Select value={v.customerType} onChange={set("customerType")} options={ENQUIRY_SOURCE} /></Field>
      <Field label="Requirement"><Select value={v.requirement} onChange={set("requirement")} options={REQUIREMENTS} /></Field>
      {v.requirement === "Others" && (
        <Field label="Please specify requirement" required><Input value={v.requirementOther} onChange={set("requirementOther")} placeholder="Type the requirement" /></Field>
      )}
      <Field label="Size"><Input value={v.size} onChange={set("size")} placeholder="e.g. 84x36x34 in" /></Field>
      <Field label="Fabric"><Input value={v.fabric} onChange={set("fabric")} /></Field>
      <Field label="Details / items"><TextArea value={v.detailsItems} onChange={set("detailsItems")} /></Field>
      <div className="two-col">
        <Field label="Price / quoted amount"><Input type="number" value={v.price} onChange={set("price")} /></Field>
        <Field label="Valid until"><Input type="date" value={v.validUntil} onChange={set("validUntil")} /></Field>
      </div>
      <Field label="Status"><Select value={v.status} onChange={set("status")} options={QUOTE_STATUSES} /></Field>
      <Field label="Notes"><TextArea value={v.notes} onChange={set("notes")} /></Field>
      <FormActions onCancel={onCancel} onSave={handleSave} disabled={!canSave} />
    </>
  );
}

function FormJob({ data, staff, customers, onSave, onCancel }) {
  const [v, set, setV] = useForm(data || { date: todayISO(), customerName: "", phone: "", address: "", requirement: "", requirementOther: "", measurements: "", fabricType: "", foamType: "", frameSpec: "", quantity: 1, priority: "Normal", dueDate: "", assignedStaff: "", quotedAmount: "", advanceReceived: "", stage: "Confirmed", deliveredAt: "", completedAt: "", specialInstructions: "" });
  const balance = num(v.quotedAmount) - num(v.advanceReceived);
  const fillFromCustomer = () => {
    const m = (customers || []).find((c) => c.name.trim().toLowerCase() === v.customerName.trim().toLowerCase());
    if (m) setV((s) => ({ ...s, phone: s.phone || m.phone, address: s.address || m.address }));
  };
  const phoneValid = v.phone.length === 10;
  const reqValid = v.requirement !== "Others" || v.requirementOther.trim();
  const canSave = v.customerName.trim() && phoneValid && v.requirement && reqValid;
  function handleSave() {
    if (!canSave) return;
    const requirement = v.requirement === "Others" && v.requirementOther.trim() ? v.requirementOther.trim() : v.requirement;
    onSave({ ...v, requirement });
  }
  return (
    <>
      <Field label="Order date"><Input type="date" value={v.date} onChange={set("date")} /></Field>
      <Field label="Customer name" required hint="Start typing to find an existing customer">
        <NameField value={v.customerName} onChange={set("customerName")} onBlur={fillFromCustomer} list="cust-names-j" />
        <datalist id="cust-names-j">{(customers || []).map((c) => <option key={c.id} value={c.name} />)}</datalist>
      </Field>
      <Field label="Phone number" required hint="Exactly 10 digits"><PhoneField value={v.phone} onChange={set("phone")} /></Field>
      <Field label="Site / address"><Input value={v.address} onChange={set("address")} /></Field>
      <Field label="Requirement" required><Select value={v.requirement} onChange={set("requirement")} options={REQUIREMENTS} /></Field>
      {v.requirement === "Others" && (
        <Field label="Please specify requirement" required><Input value={v.requirementOther} onChange={set("requirementOther")} placeholder="Type the requirement" /></Field>
      )}
      <Field label="Measurements"><Input value={v.measurements} onChange={set("measurements")} placeholder="e.g. 84x36x34 in" /></Field>
      <div className="two-col">
        <Field label="Fabric type"><Input value={v.fabricType} onChange={set("fabricType")} /></Field>
        <Field label="Foam type"><Input value={v.foamType} onChange={set("foamType")} /></Field>
      </div>
      <Field label="Frame spec" hint="belt / spring, plywood, legs..."><Input value={v.frameSpec} onChange={set("frameSpec")} /></Field>
      <div className="two-col">
        <Field label="Quantity"><Input type="number" min="1" value={v.quantity} onChange={set("quantity")} /></Field>
        <Field label="Priority"><Select value={v.priority} onChange={set("priority")} options={PRIORITIES} /></Field>
      </div>
      <div className="two-col">
        <Field label="Due date"><Input type="date" value={v.dueDate} onChange={set("dueDate")} /></Field>
        <Field label="Assign staff"><Select value={v.assignedStaff} onChange={set("assignedStaff")} options={staff.filter(s => s.active !== false).map(s => s.name)} /></Field>
      </div>
      <Field label="Production stage">
        <Select value={v.stage} onChange={set("stage")} options={STAGES} />
      </Field>
      <div className="two-col">
        <Field label="Quoted amount"><Input type="number" value={v.quotedAmount} onChange={set("quotedAmount")} /></Field>
        <Field label="Advance received"><Input type="number" value={v.advanceReceived} onChange={set("advanceReceived")} /></Field>
      </div>
      <div className="balance-line">Balance due: <strong>{fmtINR(balance > 0 ? balance : 0)}</strong></div>
      <Field label="Special instructions"><TextArea value={v.specialInstructions} onChange={set("specialInstructions")} /></Field>
      <FormActions onCancel={onCancel} onSave={handleSave} disabled={!canSave} />
    </>
  );
}

function FormCustomer({ data, onSave, onCancel }) {
  const [v, set] = useForm(data || { name: "", phone: "", address: "", notes: "" });
  const canSave = v.name.trim() && v.phone.length === 10;
  return (
    <>
      <Field label="Name" required><NameField value={v.name} onChange={set("name")} /></Field>
      <Field label="Phone number" required hint="Exactly 10 digits"><PhoneField value={v.phone} onChange={set("phone")} placeholder="10-digit mobile" /></Field>
      <Field label="Address"><TextArea value={v.address} onChange={set("address")} /></Field>
      <Field label="Notes"><TextArea value={v.notes} onChange={set("notes")} /></Field>
      <FormActions onCancel={onCancel} onSave={() => canSave && onSave(v)} disabled={!canSave} />
    </>
  );
}

function FormMaterial({ data, onSave, onCancel }) {
  const [v, set] = useForm(data || { name: "", category: "", stock: 0, reorderLevel: 0, supplier: "", price: "" });
  return (
    <>
      <Field label="Material name" required><Input value={v.name} onChange={set("name")} /></Field>
      <Field label="Category"><Select value={v.category} onChange={set("category")} options={MATERIAL_CATEGORIES} /></Field>
      <div className="two-col">
        <Field label="Stock on hand"><Input type="number" value={v.stock} onChange={set("stock")} /></Field>
        <Field label="Reorder level"><Input type="number" value={v.reorderLevel} onChange={set("reorderLevel")} /></Field>
      </div>
      <Field label="Supplier"><Input value={v.supplier} onChange={set("supplier")} /></Field>
      <Field label="Price per unit"><Input type="number" value={v.price} onChange={set("price")} /></Field>
      <FormActions onCancel={onCancel} onSave={() => v.name && onSave(v)} disabled={!v.name} />
    </>
  );
}

function FormPurchase({ data, materials, onSave, onCancel }) {
  const [v, set] = useForm(data || { date: todayISO(), item: "", quantity: "", totalBill: "", amountPaid: "", party: "", notes: "", linkStock: true });
  return (
    <>
      <Field label="Date"><Input type="date" value={v.date} onChange={set("date")} /></Field>
      <Field label="Purchase item" required hint="Matches an existing material by name, or creates a new one">
        <Input list="material-names" value={v.item} onChange={set("item")} placeholder="e.g. 40D foam" />
        <datalist id="material-names">{materials.map((m) => <option key={m.id} value={m.name} />)}</datalist>
      </Field>
      <div className="two-col">
        <Field label="Quantity" required><Input type="number" value={v.quantity} onChange={set("quantity")} /></Field>
        <Field label="Total bill amount"><Input type="number" value={v.totalBill} onChange={set("totalBill")} /></Field>
      </div>
      <Field label="Amount paid"><Input type="number" value={v.amountPaid} onChange={set("amountPaid")} /></Field>
      <Field label="Party / supplier" required><Input value={v.party} onChange={set("party")} /></Field>
      <Field label="Notes"><TextArea value={v.notes} onChange={set("notes")} /></Field>
      <label className="checkline">
        <input type="checkbox" checked={v.linkStock} onChange={(e) => set("linkStock")(e.target.checked)} />
        Add quantity to inventory stock automatically
      </label>
      <FormActions onCancel={onCancel} onSave={() => v.item && v.party && v.quantity && onSave(v)} disabled={!v.item || !v.party || !v.quantity} />
    </>
  );
}

function FormFinance({ data, onSave, onCancel }) {
  const [v, set] = useForm(data || { type: "out", date: todayISO(), category: "", amount: "", party: "", notes: "" });
  const cats = v.type === "in" ? FIN_CATEGORIES_IN : FIN_CATEGORIES_OUT;
  return (
    <>
      <div className="toggle-row">
        <button type="button" className={`toggle ${v.type === "in" ? "toggle-in active" : ""}`} onClick={() => set("type")("in")}>Money In</button>
        <button type="button" className={`toggle ${v.type === "out" ? "toggle-out active" : ""}`} onClick={() => set("type")("out")}>Money Out</button>
      </div>
      <Field label="Date"><Input type="date" value={v.date} onChange={set("date")} /></Field>
      <Field label="Category"><Select value={v.category} onChange={set("category")} options={cats} /></Field>
      <Field label="Amount" required><Input type="number" value={v.amount} onChange={set("amount")} /></Field>
      <Field label="Party" hint="Who paid / was paid"><Input value={v.party} onChange={set("party")} /></Field>
      <Field label="Notes"><TextArea value={v.notes} onChange={set("notes")} /></Field>
      <FormActions onCancel={onCancel} onSave={() => v.amount && onSave(v)} disabled={!v.amount} />
    </>
  );
}

function FormStaff({ data, onSave, onCancel }) {
  const [v, set] = useForm(data || { name: "", role: "", phone: "", email: "", accessLevel: "", active: true });
  const phoneValid = !v.phone || v.phone.length === 10;
  const canSave = v.name.trim() && v.role.trim() && phoneValid;
  return (
    <>
      <Field label="Name" required><NameField value={v.name} onChange={set("name")} /></Field>
      <Field label="Job role" required hint="e.g. Cutter, Stitcher, Supervisor"><Input value={v.role} onChange={set("role")} /></Field>
      <Field label="Phone" hint="Exactly 10 digits, if provided"><PhoneField value={v.phone} onChange={set("phone")} /></Field>
      <Field label="Gmail (app sign-in)" hint="Add this to let them into the app. Leave blank to keep them out."><Input value={v.email} onChange={set("email")} placeholder="name@gmail.com" /></Field>
      <Field label="App access level"><Select value={v.accessLevel} onChange={set("accessLevel")} options={ACCESS_LEVELS} /></Field>
      <label className="checkline"><input type="checkbox" checked={v.active} onChange={(e) => set("active")(e.target.checked)} /> Active</label>
      <FormActions onCancel={onCancel} onSave={() => canSave && onSave(v)} disabled={!canSave} />
    </>
  );
}

function FormNote({ data, onSave, onCancel }) {
  const [v, set] = useForm(data || { title: "General", content: "", pinned: false });
  return (
    <>
      <Field label="Category"><Select value={v.title} onChange={set("title")} options={NOTE_CATEGORIES} placeholder="General" /></Field>
      <Field label="Note"><TextArea rows={8} value={v.content} onChange={set("content")} /></Field>
      <label className="checkline"><input type="checkbox" checked={v.pinned} onChange={(e) => set("pinned")(e.target.checked)} /> Pin to top</label>
      <FormActions onCancel={onCancel} onSave={() => v.content && onSave(v)} disabled={!v.content} />
    </>
  );
}

function FormActions({ onCancel, onSave, disabled }) {
  return (
    <div className="form-actions">
      <button type="button" className="btn ghost" onClick={onCancel}>Cancel</button>
      <button type="button" className="btn primary" disabled={disabled} onClick={onSave}>Save</button>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Dashboard                                                    */
/* ---------------------------------------------------------------- */

function jobNumber(jobs, id) {
  const sorted = [...jobs].sort((a, b) => (a.createdAt || a.date || "").localeCompare(b.createdAt || b.date || ""));
  const idx = sorted.findIndex((j) => j.id === id);
  return `JC-${String(idx + 1).padStart(3, "0")}`;
}

function TodayDashboard({ jobs, enquiries, quotations, finance, materials }) {
  const today = todayISO();
  const newEnquiries = enquiries.filter((e) => e.date === today).length;
  const quotationsPending = quotations.filter((q) => q.status !== "Converted" && q.status !== "Expired").length;
  const ordersReceived = jobs.filter((j) => j.date === today).length;
  const sofasInProduction = jobs.filter((j) => j.stage !== "Delivered").reduce((s, j) => s + num(j.quantity || 1), 0);
  const sofasCompletedToday = jobs.filter((j) => j.completedAt === today).reduce((s, j) => s + num(j.quantity || 1), 0);
  const sofasDeliveredToday = jobs.filter((j) => j.deliveredAt === today).reduce((s, j) => s + num(j.quantity || 1), 0);
  const pendingCollection = jobs.filter((j) => j.stage !== "Delivered").reduce((s, j) => {
    const bal = num(j.quotedAmount) - num(j.advanceReceived);
    return s + (bal > 0 ? bal : 0);
  }, 0);
  const paymentsToday = finance.filter((f) => f.type === "in" && f.date === today).reduce((s, f) => s + num(f.amount), 0);
  const expensesToday = finance.filter((f) => f.type === "out" && f.date === today).reduce((s, f) => s + num(f.amount), 0);

  const lowStock = materials.filter((m) => num(m.stock) <= num(m.reorderLevel));
  const overdueJobs = jobs.filter((j) => j.stage !== "Delivered" && j.dueDate && j.dueDate < today);
  const followUpsDue = enquiries.filter((e) => e.nextFollowUp && e.nextFollowUp <= today && e.status !== "Converted" && e.status !== "Lost");
  const expiringQuotes = quotations.filter((q) => q.validUntil && q.validUntil <= today && q.status !== "Converted" && q.status !== "Expired");
  const unpaidDelivered = jobs.filter((j) => j.stage === "Delivered" && (num(j.quotedAmount) - num(j.advanceReceived)) > 0);

  const alerts = [
    ...lowStock.map((m) => ({ tone: "bad", text: `${m.name} is low on stock (${m.stock} left)`, page: "inventory" })),
    ...overdueJobs.map((j) => ({ tone: "bad", text: `${j.customerName}'s order is overdue (due ${fmtDate(j.dueDate)})`, page: "jobs" })),
    ...followUpsDue.map((e) => ({ tone: "warn", text: `Follow up with ${e.customerName} — due ${fmtDate(e.nextFollowUp)}`, page: "enquiries" })),
    ...expiringQuotes.map((q) => ({ tone: "warn", text: `Quotation for ${q.customerName} has expired — follow up or revise`, page: "quotations" })),
    ...unpaidDelivered.map((j) => ({ tone: "warn", text: `${j.customerName} was delivered but still owes ${fmtINR(num(j.quotedAmount) - num(j.advanceReceived))}`, page: "accounts" })),
  ];

  return (
    <>
      <div className="today-heading">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "2-digit", month: "long" })}</div>

      <SectionHead title={`Alerts${alerts.length ? ` (${alerts.length})` : ""}`} />
      <div className="list-card alerts-card">
        {alerts.length === 0 && <div className="list-row"><span className="row-sub">All clear — nothing needs your attention right now.</span></div>}
        {alerts.map((a, i) => (
          <div className="alert-row" key={i}>
            <Bell size={14} className={`tone-${a.tone}`} />
            <span>{a.text}</span>
          </div>
        ))}
      </div>

      <div className="stat-grid">
        <StatCard label="New enquiries" value={newEnquiries} tone="info" />
        <StatCard label="Quotations pending" value={quotationsPending} tone="warn" />
        <StatCard label="Orders received" value={ordersReceived} tone="accent" />
        <StatCard label="Sofas in production" value={sofasInProduction} />
        <StatCard label="Sofas completed today" value={sofasCompletedToday} tone="good" />
        <StatCard label="Sofas delivered today" value={sofasDeliveredToday} tone="good" />
        <StatCard label="Pending collection" value={fmtINR(pendingCollection)} tone="warn" />
        <StatCard label="Payments received today" value={fmtINR(paymentsToday)} tone="good" />
        <StatCard label="Factory expenses today" value={fmtINR(expensesToday)} tone="bad" />
      </div>
    </>
  );
}

function stageTone(stage) {
  if (stage === "Delivered") return "good";
  if (stage === "Confirmed") return "info";
  if (stage === "QC" || stage === "Packing") return "accent";
  return "warn";
}
function priorityTone(p) {
  if (p === "Urgent") return "bad";
  if (p === "High") return "warn";
  if (p === "Low") return "faint";
  return "info";
}
function statusTone(s) {
  if (s === "Hot") return "bad";
  if (s === "Warm") return "warn";
  if (s === "Converted") return "good";
  if (s === "Lost") return "faint";
  return "info";
}

function BusinessDashboard({ jobs, finance, materials, staff, quotations }) {
  const now = new Date();
  const monthJobs = jobs.filter((j) => sameMonth(j.date, now));
  const revenue = finance.filter((f) => f.type === "in" && sameMonth(f.date, now)).reduce((s, f) => s + num(f.amount), 0);
  const expenses = finance.filter((f) => f.type === "out" && sameMonth(f.date, now)).reduce((s, f) => s + num(f.amount), 0);
  const profit = revenue - expenses;
  const outstanding = jobs.filter((j) => j.stage !== "Delivered").reduce((s, j) => {
    const bal = num(j.quotedAmount) - num(j.advanceReceived);
    return s + (bal > 0 ? bal : 0);
  }, 0);
  const stockValue = materials.reduce((s, m) => s + num(m.stock) * num(m.price), 0);
  const delivered = jobs.filter((j) => j.stage === "Delivered" && j.deliveredAt && sameMonth(j.deliveredAt, now));
  const avgDays = delivered.length ? (delivered.reduce((s, j) => s + Math.max(daysBetween(j.date, j.deliveredAt), 0), 0) / delivered.length) : 0;
  const daysElapsed = now.getDate();
  const dailyOutput = daysElapsed ? delivered.length / daysElapsed : 0;

  const activeStaff = staff.filter((s) => s.active !== false);
  const lowStock = materials.filter((m) => num(m.stock) <= num(m.reorderLevel));

  return (
    <>
      <div className="today-heading">This month at a glance</div>
      <div className="stat-grid">
        <StatCard label="Orders this month" value={monthJobs.length} />
        <StatCard label="Revenue (month)" value={fmtINR(revenue)} tone="good" />
        <StatCard label="Profit (month)" value={fmtINR(profit)} tone={profit >= 0 ? "good" : "bad"} />
        <StatCard label="Outstanding payments" value={fmtINR(outstanding)} tone="warn" />
        <StatCard label="Material stock value" value={fmtINR(stockValue)} tone="accent" />
        <StatCard label="Avg. production time" value={`${avgDays.toFixed(1)} days`} />
        <StatCard label="Daily output" value={`${dailyOutput.toFixed(1)} sofas/day`} />
        <StatCard label="Low stock materials" value={lowStock.length} tone={lowStock.length ? "bad" : "good"} />
      </div>

      <SectionHead title="Worker productivity — delivered this month" />
      <div className="list-card">
        {activeStaff.length === 0 && <EmptyState icon={Users} title="No staff added yet" hint="Add your team from the Staff page." />}
        {activeStaff.map((s) => {
          const del = jobs.filter((j) => j.assignedStaff === s.name && j.stage === "Delivered" && sameMonth(j.deliveredAt, now)).length;
          const act = jobs.filter((j) => j.assignedStaff === s.name && j.stage !== "Delivered").length;
          return (
            <div className="list-row" key={s.id}>
              <span className="row-title">{s.name}</span>
              <span className="row-meta">{del} delivered · {act} active</span>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Enquiries                                                    */
/* ---------------------------------------------------------------- */

function Enquiries({ items, onAdd, onEdit, onDelete, onCreateQuotation }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((e) => (e.customerName + e.phone + e.location).toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return (
    <>
      <SearchBar value={q} onChange={setQ} placeholder="Search enquiries" />
      {sorted.length === 0 && <EmptyState icon={PhoneCall} title="No enquiries yet" hint="Log a call or walk-in to start tracking a lead." />}
      <div className="card-list">
        {sorted.map((e) => (
          <div className="record-card" key={e.id} onClick={() => onEdit(e)}>
            <div className="record-top">
              <span className="record-title">{e.customerName}</span>
              <Badge tone={statusTone(e.status)}>{e.status}</Badge>
            </div>
            <ContactLine phone={e.phone} />
            {e.location && <div className="record-sub">{e.location}</div>}
            <div className="record-sub">{e.requirement || "—"} {e.amountQuoted ? `· Quoted ${fmtINR(e.amountQuoted)}` : ""}</div>
            <div className="record-sub">
              {e.customerType && <Badge tone="faint">{e.customerType}</Badge>}
              {e.outcome && e.outcome !== "Pending" && <Badge tone={e.outcome === "Accepted" ? "good" : "bad"}>{e.outcome}</Badge>}
            </div>
            {e.nextFollowUp && <div className="record-foot">Follow up {fmtDate(e.nextFollowUp)}</div>}
            {e.outcome === "Accepted" && (
              <div className="record-actions">
                <button className="chip-btn" onClick={(ev) => { ev.stopPropagation(); onCreateQuotation(e); }}>
                  Create quotation <ArrowRight size={13} />
                </button>
              </div>
            )}
            <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(e.id, e.customerName); }}><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Quotations                                                   */
/* ---------------------------------------------------------------- */

function Quotations({ items, profile, onAdd, onEdit, onDelete, onConvert }) {
  const [q, setQ] = useState("");
  const [preview, setPreview] = useState(null); // quote object
  const filtered = items.filter((e) => (e.customerName + e.phone).toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return (
    <>
      <SearchBar value={q} onChange={setQ} placeholder="Search quotations" />
      {sorted.length === 0 && <EmptyState icon={FileText} title="No quotations yet" hint="Create one for a customer's sofa requirement." />}
      <div className="card-list">
        {sorted.map((e) => (
          <div className="record-card" key={e.id} onClick={() => onEdit(e)}>
            <div className="record-top">
              <span className="record-title">{e.customerName}</span>
              <Badge tone={e.status === "Converted" ? "good" : e.status === "Expired" ? "faint" : "info"}>{e.status}</Badge>
            </div>
            <div className="record-sub">{e.requirement || "—"} {e.size ? `· ${e.size}` : ""}</div>
            <div className="record-sub">{e.price ? fmtINR(e.price) : "No price set"}</div>
            <div className="record-actions">
              <button className="chip-btn" onClick={(ev) => { ev.stopPropagation(); setPreview(e); }}>
                <FileDown size={13} /> View quotation / PDF
              </button>
              {e.status !== "Converted" && (
                <button className="chip-btn" onClick={(ev) => { ev.stopPropagation(); onConvert(e); }}>
                  Convert to job <ArrowRight size={13} />
                </button>
              )}
            </div>
            <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(e.id, e.customerName); }}><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
      {preview && <QuotationPreview quote={preview} profile={profile} onClose={() => setPreview(null)} />}
    </>
  );
}

function QuotationPreview({ quote, profile, onClose }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function handleDownload() {
    setBusy(true); setErr("");
    try { await downloadQuotationPDF(quote, profile); } catch (e) { setErr(e.message || "Could not generate the PDF — check your connection and try again."); }
    setBusy(false);
  }
  return (
    <div className="pdf-overlay">
      <div className="pdf-topbar">
        <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        <span className="pdf-title">Quotation — {quote.customerName}</span>
        <button className="btn primary pdf-download-btn" onClick={handleDownload} disabled={busy}>
          <Download size={15} /> {busy ? "Preparing…" : "Download PDF"}
        </button>
      </div>
      <div className="pdf-doc-scroll">
        {err && <div className="pdf-error">{err}</div>}
        <div className="pdf-sheet">
          <div className="pdf-sheet-head">
            {profile && profile.logo && <img src={profile.logo} alt="Logo" className="pdf-sheet-logo" />}
            <div>
              <div className="pdf-sheet-company">{(profile && profile.companyName) || "Your Company"}</div>
              {profile && profile.address && <div className="pdf-sheet-meta">{profile.address}</div>}
              {profile && profile.phone && <div className="pdf-sheet-meta">Phone: {profile.phone}</div>}
              {profile && profile.gst && <div className="pdf-sheet-meta">GSTIN: {profile.gst}</div>}
            </div>
          </div>
          <div className="pdf-sheet-divider" />
          <div className="pdf-sheet-titlerow">
            <span className="pdf-sheet-title">Quotation</span>
            <span className="pdf-sheet-meta">Date: {fmtDate(quote.date)}</span>
          </div>
          <table className="pdf-sheet-table">
            <tbody>
              <tr><td>Customer name</td><td>{quote.customerName || "-"}</td></tr>
              <tr><td>Phone number</td><td>{quote.phone || "-"}</td></tr>
              <tr><td>Requirement</td><td>{quote.requirement || "-"}</td></tr>
              <tr><td>Size</td><td>{quote.size || "-"}</td></tr>
              <tr><td>Fabric</td><td>{quote.fabric || "-"}</td></tr>
              <tr><td>Price quoted</td><td>{quote.price ? fmtINR(quote.price) : "-"}</td></tr>
            </tbody>
          </table>
          {quote.detailsItems && (
            <div className="pdf-sheet-block">
              <div className="pdf-sheet-label">Details / items</div>
              <div className="pdf-sheet-text">{quote.detailsItems}</div>
            </div>
          )}
          <div className="pdf-sheet-divider" />
          <div className="pdf-sheet-label">Terms &amp; Conditions</div>
          <ul className="pdf-sheet-terms">
            {QUOTE_TERMS.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Jobs / production                                            */
/* ---------------------------------------------------------------- */

function Jobs({ items, onAdd, onEdit, onDelete, onAdvance }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Active");
  const filtered = items.filter((j) => (j.customerName + j.phone).toLowerCase().includes(q.toLowerCase()))
    .filter((j) => filter === "All" ? true : filter === "Active" ? j.stage !== "Delivered" : j.stage === "Delivered");
  const sorted = [...filtered].sort((a, b) => (a.dueDate || "9999").localeCompare(b.dueDate || "9999"));
  return (
    <>
      <SearchBar value={q} onChange={setQ} placeholder="Search jobs" />
      <div className="pill-row">
        {["Active", "Delivered", "All"].map((f) => (
          <button key={f} className={`pill ${filter === f ? "pill-active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      {sorted.length === 0 && <EmptyState icon={Hammer} title="No jobs found" hint="Convert a quotation or start a new job." />}
      <div className="card-list">
        {sorted.map((j) => {
          const bal = num(j.quotedAmount) - num(j.advanceReceived);
          const nextStage = STAGES[STAGES.indexOf(j.stage) + 1];
          return (
            <div className="record-card" key={j.id} onClick={() => onEdit(j)}>
              <div className="record-top">
                <span className="record-title">{j.customerName}</span>
                <Badge tone={stageTone(j.stage)}>{j.stage}</Badge>
              </div>
              <div className="record-sub">{jobNumber(items, j.id)} · {j.requirement} · Qty {j.quantity || 1} {j.assignedStaff ? `· ${j.assignedStaff}` : ""}</div>
              <div className="record-sub">
                <Badge tone={priorityTone(j.priority)}>{j.priority || "Normal"}</Badge>
                {j.dueDate && <span> · Due {fmtDate(j.dueDate)}</span>}
                {bal > 0 && <span className="tone-warn"> · Balance {fmtINR(bal)}</span>}
              </div>
              <div className="record-actions">
                {nextStage && (
                  <button className="chip-btn" onClick={(ev) => { ev.stopPropagation(); onAdvance(j, nextStage); }}>
                    Move to {nextStage} <ArrowRight size={13} />
                  </button>
                )}
              </div>
              <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(j.id, j.customerName); }}><Trash2 size={15} /></button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Inventory                                                    */
/* ---------------------------------------------------------------- */

function Inventory({ items, onAdd, onEdit, onDelete }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((m) => (m.name + (m.category || "")).toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      <SearchBar value={q} onChange={setQ} placeholder="Search material or category" />
      {sorted.length === 0 && <EmptyState icon={Boxes} title="No materials yet" hint="Add raw materials to track stock." />}
      <div className="table-card">
        {sorted.map((m) => {
          const low = num(m.stock) <= num(m.reorderLevel);
          return (
            <div className={`table-row ${low ? "table-row-alert" : ""}`} key={m.id} onClick={() => onEdit(m)}>
              <div>
                <div className="row-title">{m.name}</div>
                {m.category && <div className="row-sub">{m.category}</div>}
              </div>
              <div className="row-right">
                <div className={low ? "tone-bad" : ""}><strong>{m.stock}</strong> {low ? "LOW STOCK" : "in stock"}</div>
                {m.price ? <div className="row-sub">{fmtINR(m.price)} / unit</div> : null}
              </div>
              <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(m.id, m.name); }}><Trash2 size={15} /></button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Purchases                                                    */
/* ---------------------------------------------------------------- */

function Purchases({ items, onAdd, onEdit, onDelete }) {
  const [tab, setTab] = useState("Purchases");
  const [q, setQ] = useState("");
  const filtered = items.filter((p) => (p.item + p.party).toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const suppliers = useMemo(() => {
    const map = {};
    items.forEach((p) => {
      const key = (p.party || "Unknown").trim();
      if (!map[key]) map[key] = { name: key, purchased: 0, paid: 0, txns: [] };
      map[key].purchased += num(p.totalBill);
      map[key].paid += num(p.amountPaid);
      map[key].txns.push(p);
    });
    return Object.values(map).map((s) => ({ ...s, balance: s.purchased - s.paid, txns: s.txns.sort((a, b) => (b.date || "").localeCompare(a.date || "")) }))
      .sort((a, b) => b.balance - a.balance || a.name.localeCompare(b.name));
  }, [items]);

  return (
    <>
      <div className="pill-row">
        {["Purchases", "Suppliers"].map((t) => (
          <button key={t} className={`pill ${tab === t ? "pill-active" : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === "Purchases" && (
        <>
          <SearchBar value={q} onChange={setQ} placeholder="Search item or party" />
          {sorted.length === 0 && <EmptyState icon={ShoppingCart} title="No purchases logged yet" hint="Purchases update inventory stock automatically." />}
          <div className="card-list">
            {sorted.map((p) => (
              <div className="record-card" key={p.id} onClick={() => onEdit(p)}>
                <div className="record-top">
                  <span className="record-title">{p.item}</span>
                  <span className="row-sub">{fmtDate(p.date)}</span>
                </div>
                <div className="record-sub">Qty {p.quantity} · {p.party}</div>
                <div className="record-sub">Bill {fmtINR(p.totalBill)} · Paid {fmtINR(p.amountPaid)}</div>
                <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(p.id, p.item); }}><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "Suppliers" && (
        <>
          {suppliers.length === 0 && <EmptyState icon={BookUser} title="No suppliers yet" hint="Suppliers appear here automatically from your purchases." />}
          <div className="card-list">
            {suppliers.map((s) => (
              <div className={`record-card ${s.balance > 0 ? "record-card-alert" : ""}`} key={s.name}>
                <div className="record-top">
                  <span className="record-title">{s.name}</span>
                  {s.balance > 0 ? <Badge tone="bad">Due {fmtINR(s.balance)}</Badge> : <Badge tone="good">Settled</Badge>}
                </div>
                <div className="record-sub">Purchased {fmtINR(s.purchased)} · Paid {fmtINR(s.paid)}</div>
                <div className="record-sub">{s.txns.length} transaction{s.txns.length > 1 ? "s" : ""}</div>
                <div className="supplier-txns">
                  {s.txns.slice(0, 5).map((t) => (
                    <div className="supplier-txn-row" key={t.id}>
                      <span>{fmtDate(t.date)} · {t.item} (x{t.quantity})</span>
                      <span>{fmtINR(t.totalBill)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Finance                                                      */
/* ---------------------------------------------------------------- */

function Finance({ items, onAdd, onEdit, onDelete }) {
  const [period, setPeriod] = useState("month");
  const filtered = items.filter((f) => inPeriod(f.date, period));
  const moneyIn = filtered.filter((f) => f.type === "in").reduce((s, f) => s + num(f.amount), 0);
  const moneyOut = filtered.filter((f) => f.type === "out").reduce((s, f) => s + num(f.amount), 0);
  const sorted = [...filtered].sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return (
    <>
      <PeriodTabs period={period} setPeriod={setPeriod} />
      <div className="list-card">
        <div className="list-row"><span className="row-title">Money In</span><span className="tone-good"><strong>{fmtINR(moneyIn)}</strong></span></div>
        <div className="list-row"><span className="row-title">Money Out</span><span className="tone-bad"><strong>{fmtINR(moneyOut)}</strong></span></div>
        <div className="list-row"><span className="row-title">Net</span><span><strong>{fmtINR(moneyIn - moneyOut)}</strong></span></div>
      </div>
      {sorted.length === 0 && <EmptyState icon={Wallet} title="No entries for this period" />}
      <div className="card-list">
        {sorted.map((f) => (
          <div className="record-card" key={f.id} onClick={() => onEdit(f)}>
            <div className="record-top">
              <span className="record-title">{f.category || (f.type === "in" ? "Income" : "Expense")}</span>
              <span className={f.type === "in" ? "tone-good" : "tone-bad"}><strong>{f.type === "in" ? "+" : "−"}{fmtINR(f.amount)}</strong></span>
            </div>
            <div className="record-sub">{fmtDate(f.date)} {f.party ? `· ${f.party}` : ""}</div>
            <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(f.id, f.category || "entry"); }}><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Staff                                                        */
/* ---------------------------------------------------------------- */

function Staff({ items, jobs, onAdd, onEdit, onDelete }) {
  return (
    <div className="card-list">
      {items.length === 0 && <EmptyState icon={Users} title="No staff added yet" />}
      {items.map((s) => {
        const active = jobs.filter((j) => j.assignedStaff === s.name && j.stage !== "Delivered").length;
        return (
          <div className="record-card" key={s.id} onClick={() => onEdit(s)}>
            <div className="record-top">
              <span className="record-title">{s.name}</span>
              <span className="tone-accent"><strong>{active}</strong> <span className="row-sub">active jobs</span></span>
            </div>
            <div className="record-sub">{s.role} {s.phone ? `· ${s.phone}` : ""}</div>
            {s.active === false && <Badge tone="bad">Inactive</Badge>}
            <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(s.id, s.name); }}><Trash2 size={15} /></button>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Business Profile (settings, used on quotation PDFs)          */
/* ---------------------------------------------------------------- */

/* ---------------------------------------------------------------- */
/* Launch screen                                                      */
/* ---------------------------------------------------------------- */

function LaunchScreen({ logo }) {
  return (
    <div className="app">
      <div className="launch-screen">
        <div className="launch-card">
          {logo ? <img src="/IMG_0278.jpeg" alt="CYE Woodcrafts" className="launch-logo" /> : <div className="launch-mark">CYE</div>}
          <div className="launch-name">CYE WOODCRAFTS</div>
          <div className="launch-tagline">Upholstery workshop management</div>
          <div className="launch-spinner" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Staff sign-in gate                                                 */
/* ---------------------------------------------------------------- */

function LoginGate({ staff, onSuccess, companyName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit() {
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) { setError("Enter both your email and password."); return; }
    setBusy(true); setError("");
    try {
      const session = await supabaseSignInWithPassword(cleanEmail, password);
      await saveStoredSession(session);
      const match = staff.find((s) => s.email.trim().toLowerCase() === session.user.email.trim().toLowerCase());
      onSuccess(match || { name: session.user.email, role: "Staff", email: session.user.email });
    } catch (e) {
      // TEMPORARY DIAGNOSTIC: show the raw error verbatim instead of a friendly message.
      setError(`DIAGNOSTIC — ${(e && e.message) || String(e)}`);
    }
    setBusy(false);
  }

  return (
    <div className="app">
      <div className="gate-screen">
        <div className="gate-card">
          <div className="gate-mark">{(companyName || "CYE").slice(0, 3).toUpperCase()}</div>
          <h2>Staff sign-in</h2>
          <p>Access is limited to staff registered by the owner. Enter your email and password to continue.</p>
          <input
            className="ctrl gate-input" type="email" value={email} inputMode="email" autoCapitalize="none"
            onChange={(e) => setEmail(e.target.value)} placeholder="name@gmail.com"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <input
            className="ctrl gate-input" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          {error && <div className="gate-error">{error}</div>}
          <button className="btn primary gate-btn" onClick={handleSubmit} disabled={busy}>{busy ? "Signing in…" : "Continue"}</button>
        </div>
      </div>
    </div>
  );
}

function BusinessProfile({ profile, onSave }) {
  const [v, set, setV] = useForm(profile || { companyName: "", phone: "", address: "", gst: "", logo: "" });
  const fileRef = useRef(null);

  function handleLogo(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setV((s) => ({ ...s, logo: reader.result }));
    reader.readAsDataURL(file);
  }

  return (
    <>
      <p className="settings-hint">This appears on your quotation PDFs — set it up once.</p>
      <Field label="Company name"><Input value={v.companyName} onChange={set("companyName")} placeholder="e.g. CYE Woodcrafts" /></Field>
      <Field label="Phone"><Input value={v.phone} onChange={set("phone")} /></Field>
      <Field label="Address"><TextArea value={v.address} onChange={set("address")} /></Field>
      <Field label="GST number (optional)"><Input value={v.gst} onChange={set("gst")} /></Field>
      <Field label="Company logo">
        {v.logo && <img src={v.logo} alt="Logo" className="logo-preview" />}
        <div className="logo-actions">
          <button type="button" className="btn ghost" onClick={() => fileRef.current && fileRef.current.click()}>
            <Image size={15} /> {v.logo ? "Change logo" : "Upload logo"}
          </button>
          {v.logo && <button type="button" className="btn ghost" onClick={() => setV((s) => ({ ...s, logo: "" }))}>Remove</button>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogo} />
      </Field>
      <div className="form-actions">
        <button type="button" className="btn primary" onClick={() => onSave(v)}>Save Profile</button>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Customers                                                    */
/* ---------------------------------------------------------------- */

function Customers({ items, jobs, onEdit, onDelete }) {
  const [q, setQ] = useState("");
  const filtered = items.filter((c) => (c.name + c.phone + (c.address || "")).toLowerCase().includes(q.toLowerCase()));
  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  const balanceOf = (c) => jobs.filter((j) => j.phone === c.phone).reduce((s, j) => {
    const bal = num(j.quotedAmount) - num(j.advanceReceived);
    return s + (bal > 0 ? bal : 0);
  }, 0);
  function exportCustomers() {
    downloadCSV("customers.csv", sorted.map((c) => ({
      Name: c.name, Phone: c.phone, Address: c.address || "", Orders: jobs.filter((j) => j.phone === c.phone).length, "Balance Due": balanceOf(c),
    })), ["Name", "Phone", "Address", "Orders", "Balance Due"]);
  }
  return (
    <>
      <SearchBar value={q} onChange={setQ} placeholder="Search customers" />
      <div className="pill-row">
        <button className="chip-btn" onClick={exportCustomers}><Download size={13} /> Export CSV</button>
      </div>
      {sorted.length === 0 && <EmptyState icon={BookUser} title="No customers yet" hint="Customers are added automatically from enquiries, quotations and jobs — or add one manually." />}
      <div className="card-list">
        {sorted.map((c) => {
          const orders = jobs.filter((j) => j.phone === c.phone).length;
          const balance = balanceOf(c);
          return (
            <div className={`record-card ${balance > 0 ? "record-card-alert" : ""}`} key={c.id} onClick={() => onEdit(c)}>
              <div className="record-top">
                <span className="record-title">{c.name}</span>
                {orders > 0 && <Badge tone="accent">{orders} order{orders > 1 ? "s" : ""}</Badge>}
              </div>
              <ContactLine phone={c.phone} />
              {c.address && <div className="record-sub">{c.address}</div>}
              {balance > 0 && <div className="record-sub tone-bad"><strong>Balance due: {fmtINR(balance)}</strong></div>}
              <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(c.id, c.name); }}><Trash2 size={15} /></button>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Accounts                                                     */
/* ---------------------------------------------------------------- */

function Accounts({ jobs, materials, purchases }) {
  const totalReceivable = jobs.filter((j) => j.stage !== "Delivered").reduce((s, j) => {
    const bal = num(j.quotedAmount) - num(j.advanceReceived);
    return s + (bal > 0 ? bal : 0);
  }, 0);
  const stockValue = materials.reduce((s, m) => s + num(m.stock) * num(m.price), 0);
  const totalPurchases = purchases.reduce((s, p) => s + num(p.totalBill), 0);
  const balanceJobs = jobs.filter((j) => j.stage !== "Delivered" && (num(j.quotedAmount) - num(j.advanceReceived)) > 0);
  const sortedPurchases = [...purchases].sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  return (
    <>
      <div className="list-card">
        <Row label="Total balance to be received" value={fmtINR(totalReceivable)} tone="warn" bold />
        <Row label="Total stock value" value={fmtINR(stockValue)} tone="accent" bold />
        <Row label="Total purchases" value={fmtINR(totalPurchases)} bold />
      </div>

      <SectionHead title="Balance payments to be received" />
      <div className="table-card">
        {balanceJobs.length === 0 && <div className="list-row"><span className="row-sub">No outstanding balances.</span></div>}
        {balanceJobs.map((j) => (
          <div className="table-row" key={j.id}>
            <div>
              <div className="row-title">{j.customerName}</div>
              <div className="row-sub">{jobNumber(jobs, j.id)}</div>
            </div>
            <div className="row-right tone-warn"><strong>{fmtINR(num(j.quotedAmount) - num(j.advanceReceived))}</strong></div>
          </div>
        ))}
      </div>

      <SectionHead title="Stock in hand" />
      <div className="table-card">
        {materials.length === 0 && <div className="list-row"><span className="row-sub">No materials yet.</span></div>}
        {materials.map((m) => (
          <div className="table-row" key={m.id}>
            <div>
              <div className="row-title">{m.name}</div>
              <div className="row-sub">{m.stock} in stock {m.price ? `· ${fmtINR(m.price)}/unit` : ""}</div>
            </div>
            <div className="row-right"><strong>{fmtINR(num(m.stock) * num(m.price))}</strong></div>
          </div>
        ))}
      </div>

      <SectionHead title="Purchases" />
      <div className="table-card">
        {sortedPurchases.length === 0 && <div className="list-row"><span className="row-sub">No purchases logged.</span></div>}
        {sortedPurchases.map((p) => (
          <div className="table-row" key={p.id}>
            <div>
              <div className="row-title">{p.item}</div>
              <div className="row-sub">{fmtDate(p.date)} · {p.party}</div>
            </div>
            <div className="row-right"><strong>{fmtINR(p.totalBill)}</strong></div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Notes                                                        */
/* ---------------------------------------------------------------- */

function Notes({ items, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? items : items.filter((n) => (n.title || "General") === filter);
  const sorted = [...filtered].sort((a, b) => (b.pinned - a.pinned) || (b.updatedAt || "").localeCompare(a.updatedAt || ""));
  return (
    <>
      <div className="pill-row">
        {["All", ...NOTE_CATEGORIES].map((f) => (
          <button key={f} className={`pill ${filter === f ? "pill-active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card-list">
        {sorted.length === 0 && <EmptyState icon={StickyNote} title="No notes yet" hint="Jot down reminders, ideas, or to-dos." />}
        {sorted.map((n) => (
          <div className="record-card note-card" key={n.id} onClick={() => onEdit(n)}>
            <div className="record-top">
              <span className="record-title">{n.pinned ? "\u2605 " : ""}{n.title || "Note"}</span>
            </div>
            <div className="note-content">{n.content}</div>
            <button className="del-btn" onClick={(ev) => { ev.stopPropagation(); onDelete(n.id, n.title || "note"); }}><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Page: Reports (includes accounts)                                  */
/* ---------------------------------------------------------------- */

function Reports({ jobs, finance, materials, purchases, staff }) {
  const [period, setPeriod] = useState("month");
  const inRange = (iso) => inPeriod(iso, period);

  const finP = finance.filter((f) => inRange(f.date));
  const revenue = finP.filter((f) => f.type === "in").reduce((s, f) => s + num(f.amount), 0);
  const expenses = finP.filter((f) => f.type === "out").reduce((s, f) => s + num(f.amount), 0);
  const jobsP = jobs.filter((j) => inRange(j.date));
  const salesValue = jobsP.reduce((s, j) => s + num(j.quotedAmount), 0);

  const delivered = jobs.filter((j) => j.stage === "Delivered" && j.deliveredAt);
  const deliveredP = delivered.filter((j) => inRange(j.deliveredAt));
  const onTime = deliveredP.filter((j) => !j.dueDate || j.deliveredAt <= j.dueDate).length;

  const expenseByCat = {};
  finP.filter((f) => f.type === "out").forEach((f) => { const c = f.category || "Other"; expenseByCat[c] = (expenseByCat[c] || 0) + num(f.amount); });

  const purchP = purchases.filter((p) => inRange(p.date));
  const itemTotals = {};
  purchP.forEach((p) => { itemTotals[p.item] = (itemTotals[p.item] || 0) + num(p.quantity); });
  const topItems = Object.entries(itemTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const reqTotals = {};
  jobsP.forEach((j) => { reqTotals[j.requirement] = (reqTotals[j.requirement] || 0) + 1; });
  const topReq = Object.entries(reqTotals).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const lowStock = materials.filter((m) => num(m.stock) <= num(m.reorderLevel));

  return (
    <>
      <PeriodTabs period={period} setPeriod={setPeriod} />

      <SectionHead title="Sales & profit" />
      <div className="list-card">
        <Row label="Orders" value={jobsP.length} />
        <Row label="Sales value (quoted)" value={fmtINR(salesValue)} />
        <Row label="Revenue collected" value={fmtINR(revenue)} tone="good" />
        <Row label="Expenses" value={fmtINR(expenses)} tone="bad" />
        <Row label="Profit" value={fmtINR(revenue - expenses)} tone={revenue - expenses >= 0 ? "good" : "bad"} bold />
      </div>

      <SectionHead title="Delivery performance" />
      <div className="list-card">
        <Row label="Delivered in period" value={deliveredP.length} />
        <Row label="On-time deliveries" value={deliveredP.length ? `${onTime} of ${deliveredP.length}` : "—"} />
      </div>

      <div className="hint-line">Looking for stock value, receivables or purchase history? Head to the Accounts page — it's kept in sync automatically.</div>

      <SectionHead title="Requested work types" />
      <div className="list-card">
        {topReq.length === 0 && <div className="list-row"><span className="row-sub">No orders yet.</span></div>}
        {topReq.map(([k, v]) => <Row key={k} label={k} value={v} />)}
      </div>

      <SectionHead title="Material usage — top purchased" />
      <div className="list-card">
        {topItems.length === 0 && <div className="list-row"><span className="row-sub">No purchases yet.</span></div>}
        {topItems.map(([k, v]) => <Row key={k} label={k} value={`${v} issued`} />)}
      </div>

      <SectionHead title="Expense breakdown" />
      <div className="list-card">
        {Object.keys(expenseByCat).length === 0 && <div className="list-row"><span className="row-sub">No expenses logged.</span></div>}
        {Object.entries(expenseByCat).map(([k, v]) => <Row key={k} label={k} value={fmtINR(v)} tone="bad" />)}
      </div>

      <SectionHead title="Low stock materials"
        action={<button className="chip-btn" onClick={() => downloadCSV("low-stock.csv", lowStock.map(m => ({ Material: m.name, Stock: m.stock, Reorder: m.reorderLevel })), ["Material", "Stock", "Reorder"])}><Download size={13} /> Export CSV</button>} />
      <div className="list-card">
        {lowStock.length === 0 && <div className="list-row"><span className="row-sub">Nothing below reorder level.</span></div>}
        {lowStock.map((m) => <Row key={m.id} label={m.name} value={`${m.stock} / ${m.reorderLevel}`} tone="bad" />)}
      </div>

      <SectionHead title="Staff workload"
        action={<button className="chip-btn" onClick={() => downloadCSV("all-orders.csv", jobs.map(j => ({ Customer: j.customerName, Phone: j.phone, Requirement: j.requirement, Stage: j.stage, Due: j.dueDate, Quoted: j.quotedAmount, Advance: j.advanceReceived })), ["Customer", "Phone", "Requirement", "Stage", "Due", "Quoted", "Advance"])}><Download size={13} /> Export orders</button>} />
      <div className="list-card">
        {staff.map((s) => <Row key={s.id} label={s.name} value={`${jobs.filter(j => j.assignedStaff === s.name && j.stage !== "Delivered").length} active`} />)}
      </div>
    </>
  );
}
function Row({ label, value, tone, bold }) {
  return <div className="list-row"><span className="row-title">{label}</span><span className={tone ? `tone-${tone}` : ""}>{bold ? <strong>{value}</strong> : value}</span></div>;
}

/* ---------------------------------------------------------------- */
/* Shared: search bar, period tabs                                    */
/* ---------------------------------------------------------------- */

function ContactLine({ phone }) {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, "");
  return (
    <div className="contact-line" onClick={(e) => e.stopPropagation()}>
      <span className="row-sub">{phone}</span>
      <a className="contact-icon" href={`tel:${digits}`} title="Call"><Phone size={13} /></a>
      <a className="contact-icon wa" href={`https://wa.me/${digits.length === 10 ? "91" + digits : digits}`} target="_blank" rel="noreferrer" title="WhatsApp"><MessageCircle size={13} /></a>
    </div>
  );
}
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <Search size={15} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
function PeriodTabs({ period, setPeriod }) {
  return (
    <div className="pill-row">
      {[["today", "Today"], ["week", "Week"], ["month", "Month"], ["year", "Year"], ["all", "All"]].map(([k, l]) => (
        <button key={k} className={`pill ${period === k ? "pill-active" : ""}`} onClick={() => setPeriod(k)}>{l}</button>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* App shell                                                          */
/* ---------------------------------------------------------------- */

const PAGE_TITLES = {
  today: "Dashboard", business: "Business Dashboard", enquiries: "Enquiries", quotations: "Quotations", jobs: "Production",
  customers: "Customers", inventory: "Inventory", purchases: "Purchases", finance: "Finance", staff: "Staff",
  accounts: "Accounts", reports: "Reports", notes: "Notes"
};
const PAGE_ADD_LABEL = {
  enquiries: "New Enquiry", quotations: "New Quotation", jobs: "New Job", customers: "New Customer", inventory: "New Material",
  purchases: "New Purchase", finance: "New Entry", staff: "New Staff", notes: "New Note"
};

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) { console.error("Workshop Manager crashed:", error, info); }
  render() {
    if (this.state.error) {
      return (
        <div className="crash-screen">
          <AlertTriangle size={28} color="var(--bad)" />
          <h3>Something went wrong</h3>
          <p>The app hit an unexpected error and couldn't continue. Your saved data is untouched.</p>
          <pre className="crash-detail">{String(this.state.error && this.state.error.message || this.state.error)}</pre>
          <button className="btn primary" onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <ErrorBoundary>
        <AppInner />
      </ErrorBoundary>
    </>
  );
}

function AppInner() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("today");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modal, setModal] = useState(null); // { type, data }
  const [confirm, setConfirm] = useState(null); // { type, id, label }
  const [toast, setToast] = useState("");
  const [sessionUser, setSessionUser] = useState(null); // registered staff record once signed in
  const [gateRequired, setGateRequired] = useState(true); // decided once when the app loads, not re-checked live

  const [data, setData] = useState({ enquiries: [], quotations: [], jobs: [], materials: [], purchases: [], finance: [], staff: [], notes: [], customers: [] });
  const [profile, setProfile] = useState({ companyName: "CYE Woodcrafts", phone: "", address: "", gst: "", logo: DEFAULT_LOGO });

  useEffect(() => { document.title = "CYE Woodcrafts"; }, []);

  useEffect(() => {
    (async () => {
      const start = Date.now();
      const p = await getKey("profile", null);
      if (p) setProfile((prev) => ({ ...prev, ...p, logo: p.logo || prev.logo }));
      const entries = await Promise.all(KEYS.map((k) => getKey(k, [])));
      const obj = {};
      KEYS.forEach((k, i) => { obj[k] = entries[i]; });
      setData(obj);
      setGateRequired(true);

      // If already signed in to Supabase from a previous visit, skip the gate automatically.
      if (supabaseConfigured) {
        try {
          let session = await loadStoredSession();
          if (session && session.expires_at && session.expires_at * 1000 < Date.now() + 60000) {
            // expired, or expiring within a minute — refresh before trusting it
            try {
              session = await supabaseRefreshSession(session.refresh_token);
              await saveStoredSession(session);
            } catch (e) {
              session = null;
              await clearStoredSession();
            }
          }
          if (session && session.user) {
            const match = obj.staff.find((s) => s.email && s.email.trim().toLowerCase() === session.user.email.trim().toLowerCase());
            setSessionUser(match || { name: session.user.email, role: "Staff", email: session.user.email });
          }
        } catch (e) { /* not signed in, or login service unreachable — gate will handle it */ }
      }
    }    

    
      const wait = Math.max(0, 750 - (Date.now() - start));
      setTimeout(() => setLoading(false), wait);
    })();
  }, []);

  const showToast = (m) => { if (String(m).includes("Couldn't sync")) return; setToast(m);

  async function handleSignOut() {
    if (supabaseConfigured) {
      try {
        const session = await loadStoredSession();
        if (session && session.access_token) await supabaseSignOutRemote(session.access_token);
      } catch (e) { /* ignore */ }
      await clearStoredSession();
    }
    setSessionUser(null);
  }

  const persist = useCallback((key, value) => {
  setData((d) => ({ ...d, [key]: value }));

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Local storage save failed:", e);
  }
}, []);

  function saveProfile(p) {
    setProfile(p);
    setKey("profile", p);
    showToast("Business profile saved");
  }

  function upsert(key, record) {
    const list = data[key];
    const exists = list.some((r) => r.id === record.id);
    const next = exists ? list.map((r) => (r.id === record.id ? record : r)) : [{ ...record, id: uid(), createdAt: record.createdAt || new Date().toISOString() }, ...list];
    persist(key, next);
    showToast("Saved");
  }
  function remove(key, id) {
    persist(key, data[key].filter((r) => r.id !== id));
    showToast("Deleted");
  }

  function openAdd(type) { setModal({ type, data: null }); }
  function openEdit(type, record) { setModal({ type, data: record }); }
  function closeModal() { setModal(null); }

  function askDelete(key, id, label) { setConfirm({ key, id, label }); }
  function doDelete() { if (confirm) { remove(confirm.key, confirm.id); setConfirm(null); } }

  function upsertCustomerRecord(name, phone, address) {
    if (!phone) return;
    const clean = String(phone).replace(/\s+/g, "");
    const list = data.customers;
    const idx = list.findIndex((c) => String(c.phone || "").replace(/\s+/g, "") === clean);
    const next = idx >= 0
      ? list.map((c, i) => (i === idx ? { ...c, name: name || c.name, address: address || c.address } : c))
      : [{ id: uid(), name: name || "Unnamed", phone, address: address || "", notes: "" }, ...list];
    persist("customers", next);
  }

  function stampJobStage(prev, v) {
    const packIdx = STAGES.indexOf("Packing");
    const newIdx = STAGES.indexOf(v.stage);
    return {
      completedAt: newIdx >= packIdx ? (prev.completedAt || todayISO()) : "",
      deliveredAt: v.stage === "Delivered" ? (prev.deliveredAt || todayISO()) : "",
    };
  }

  async function saveEnquiry(v) {
  const enquiry = modal.data ? { ...modal.data, ...v } : v;

  // Save locally as before
  upsert("enquiries", enquiry);
  upsertCustomerRecord(v.customerName, v.phone, v.location);

  // Sync customer to Supabase
  try {
    await supabaseDbRequest("customers?on_conflict=phone", {
      method: "POST",
      headers: {
        "Prefer": "resolution=merge-duplicates"
      },
      body: JSON.stringify({
        name: v.customerName || "Unnamed",
        phone: String(v.phone || "").replace(/\s+/g, ""),
        address: v.location || null
      })
    });
  } catch (e) {
    console.error("Customer Supabase sync failed", e);
setToast("DATABASE ERROR: " + (e?.message || String(e)));
setTimeout(() => setToast(""), 15000);
  }
    // Sync enquiry to Supabase
    try {
        await supabaseDbRequest("enquiries", {
            method: "POST",
            headers: {
                "Prefer": "return=minimal"
            },
            body: JSON.stringify({
                enquiry_date: enquiry.enquiryDate || todayISO(),
                location: enquiry.location || null,
                call_details: enquiry.callDetails || null,
                customer_type: enquiry.customerType || null,
                requirement: enquiry.requirement || null,
                customer_budget: enquiry.customerBudget || null,
                amount_quoted: enquiry.amountQuoted || null,
                enquiry_status: enquiry.enquiryStatus || null,
                enquiry_outcome: enquiry.enquiryOutcome || "pending",
                next_followup_date: enquiry.nextFollowupDate || null,
                next_action: enquiry.nextAction || null,
                remarks: enquiry.remarks || null
            })
        });
    } catch (e) {
        console.error("Enquiry Supabase sync failed:", e);
        setToast("DATABASE ERROR: " + (e?.message || "Could not sync enquiry"));
        setTimeout(() => setToast(""), 15000);
    }
  closeModal();
}
  function createQuotationFromEnquiry(e) {
    setModal({
      type: "quotations",
      data: {
        date: todayISO(), customerName: e.customerName, phone: e.phone, location: e.location,
        customerType: e.customerType || "", requirement: e.requirement, requirementOther: "", size: "", fabric: "",
        detailsItems: e.remarks || "", price: e.amountQuoted || "",
        validUntil: "", notes: e.customerBudget ? `Customer budget: ${fmtINR(e.customerBudget)}` : "",
        status: "Draft", _fromEnquiryId: e.id,
      },
    });
  }
  function saveQuotation(v) {
    const { _fromEnquiryId, ...clean } = v;
    upsert("quotations", modal.data && modal.data.id ? { ...modal.data, ...clean } : clean);
    upsertCustomerRecord(clean.customerName, clean.phone, clean.location);
    if (_fromEnquiryId) persist("enquiries", data.enquiries.map((e) => e.id === _fromEnquiryId ? { ...e, status: "Converted" } : e));
    closeModal();
  }
  function saveJob(v) {
    const prev = modal.data || {};
    const patch = stampJobStage(prev, v);
    upsert("jobs", modal.data ? { ...modal.data, ...v, ...patch } : { ...v, ...patch });
    upsertCustomerRecord(v.customerName, v.phone, v.address);
    closeModal();
  }
  function saveStaffRec(v) { upsert("staff", modal.data ? { ...modal.data, ...v } : v); closeModal(); }
  function saveNote(v) { upsert("notes", modal.data ? { ...modal.data, ...v, updatedAt: new Date().toISOString() } : { ...v, updatedAt: new Date().toISOString() }); closeModal(); }
  function saveCustomer(v) { upsert("customers", modal.data ? { ...modal.data, ...v } : v); closeModal(); }

  function saveMaterial(v) { upsert("materials", modal.data ? { ...modal.data, ...v } : v); closeModal(); }

  function savePurchase(v) {
    const record = modal.data ? { ...modal.data, ...v } : { ...v, id: uid() };
    let materials = data.materials;
    let finance = data.finance;
    if (v.linkStock) {
      const idx = materials.findIndex((m) => m.name.trim().toLowerCase() === v.item.trim().toLowerCase());
      if (idx >= 0) {
        materials = materials.map((m, i) => i === idx ? { ...m, stock: num(m.stock) + num(v.quantity), price: v.totalBill && v.quantity ? Math.round(num(v.totalBill) / num(v.quantity)) : m.price } : m);
      } else {
        materials = [{ id: uid(), name: v.item, category: "", stock: num(v.quantity), reorderLevel: 0, supplier: v.party, price: v.totalBill && v.quantity ? Math.round(num(v.totalBill) / num(v.quantity)) : "" }, ...materials];
      }
    }
    if (num(v.amountPaid) > 0 && !modal.data) {
      finance = [{ id: uid(), type: "out", date: v.date, category: "Material Purchase", amount: v.amountPaid, party: v.party, notes: `Purchase: ${v.item} x ${v.quantity}` }, ...finance];
    }
    const purchases = modal.data ? data.purchases.map((p) => p.id === record.id ? record : p) : [record, ...data.purchases];
    persist("materials", materials);
    persist("finance", finance);
    persist("purchases", purchases);
    showToast("Purchase saved");
    closeModal();
  }

  function saveFinance(v) { upsert("finance", modal.data ? { ...modal.data, ...v } : v); closeModal(); }

  function convertQuoteToJob(q) {
    const job = {
      id: uid(), date: todayISO(), customerName: q.customerName, phone: q.phone, address: q.location,
      requirement: q.requirement, measurements: q.size, fabricType: q.fabric, foamType: "", frameSpec: "",
      quantity: 1, priority: "Normal", dueDate: "", assignedStaff: "", quotedAmount: q.price, advanceReceived: "",
      stage: "Confirmed", deliveredAt: "", completedAt: "", specialInstructions: q.notes
    };
    persist("jobs", [job, ...data.jobs]);
    persist("quotations", data.quotations.map((x) => x.id === q.id ? { ...x, status: "Converted" } : x));
    showToast("Converted to job");
  }
  function advanceStage(job, stage) {
    const patch = stampJobStage(job, { stage });
    persist("jobs", data.jobs.map((j) => j.id === job.id ? { ...j, stage, ...patch } : j));
    showToast(`Moved to ${stage}`);
  }

  if (loading) return <LaunchScreen logo={profile.logo} />;

  const registeredEmails = data.staff.filter((s) => s.email && s.email.trim());
  if (gateRequired && !sessionUser) {
    return <LoginGate staff={registeredEmails} onSuccess={setSessionUser} companyName={profile.companyName} />;
  }

  const addAction = PAGE_ADD_LABEL[page] ? (
    <button className="btn primary add-btn" onClick={() => openAdd(page)}>
      <Plus size={16} /> {PAGE_ADD_LABEL[page]}
    </button>
  ) : null;

  return (
    <div className="app">
      <header className="topbar">
        <button className="icon-btn" onClick={() => setDrawerOpen(true)}><Menu size={20} /></button>
        <div className="topbar-title">
          <span className="brand-mark">CYE</span>
          <span>{PAGE_TITLES[page]}</span>
        </div>
        <div className="topbar-spacer" />
      </header>

      {drawerOpen && <div className="nav-overlay" onClick={() => setDrawerOpen(false)} />}
      <nav className={`side-nav ${drawerOpen ? "open" : ""}`}>
        <div className="side-brand">
          {profile.logo ? <img src={profile.logo} alt="Logo" className="side-brand-logo" /> : <div className="side-brand-mark">CYE</div>}
          <div>
            <div className="side-brand-name">{profile.companyName || "CYE Woodcrafts"}</div>
            <div className="side-brand-sub">Upholstery workshop</div>
          </div>
        </div>
        <div className="stitch nav-stitch" />
        <div className="side-links">
          {NAV.map((n) => {
            const Icon = n.icon;
            return (
              <button key={n.key} className={`side-link ${page === n.key ? "active" : ""}`} onClick={() => { setPage(n.key); setDrawerOpen(false); }}>
                <Icon size={17} strokeWidth={1.7} />
                <span>{n.label}</span>
              </button>
            );
          })}
        </div>
        {sessionUser && (
          <div className="side-user">
            <div className="stitch nav-stitch" />
            <div className="side-user-info">
              <div className="side-user-name">{sessionUser.name}</div>
              <div className="side-user-role">{sessionUser.role}{sessionUser.email ? ` · ${sessionUser.email}` : ""}</div>
            </div>
            <button className="side-link" onClick={() => { handleSignOut(); setDrawerOpen(false); }}>
              <X size={17} strokeWidth={1.7} />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </nav>

      <main className="main">
        <div className="page-toolbar">{addAction}</div>
        <div className="content">
          {page === "today" && <TodayDashboard jobs={data.jobs} enquiries={data.enquiries} quotations={data.quotations} finance={data.finance} materials={data.materials} />}
          {page === "business" && <BusinessDashboard jobs={data.jobs} finance={data.finance} materials={data.materials} staff={data.staff} quotations={data.quotations} />}
          {page === "enquiries" && <Enquiries items={data.enquiries} onEdit={(r) => openEdit("enquiries", r)} onDelete={(id, l) => askDelete("enquiries", id, l)} onCreateQuotation={createQuotationFromEnquiry} />}
          {page === "quotations" && <Quotations items={data.quotations} profile={profile} onEdit={(r) => openEdit("quotations", r)} onDelete={(id, l) => askDelete("quotations", id, l)} onConvert={convertQuoteToJob} />}
          {page === "jobs" && <Jobs items={data.jobs} onEdit={(r) => openEdit("jobs", r)} onDelete={(id, l) => askDelete("jobs", id, l)} onAdvance={advanceStage} />}
          {page === "customers" && <Customers items={data.customers} jobs={data.jobs} onEdit={(r) => openEdit("customers", r)} onDelete={(id, l) => askDelete("customers", id, l)} />}
          {page === "inventory" && <Inventory items={data.materials} onEdit={(r) => openEdit("inventory", r)} onDelete={(id, l) => askDelete("materials", id, l)} />}
          {page === "purchases" && <Purchases items={data.purchases} onEdit={(r) => openEdit("purchases", r)} onDelete={(id, l) => askDelete("purchases", id, l)} />}
          {page === "finance" && <Finance items={data.finance} onEdit={(r) => openEdit("finance", r)} onDelete={(id, l) => askDelete("finance", id, l)} />}
          {page === "staff" && <Staff items={data.staff} jobs={data.jobs} onEdit={(r) => openEdit("staff", r)} onDelete={(id, l) => askDelete("staff", id, l)} />}
          {page === "accounts" && <Accounts jobs={data.jobs} materials={data.materials} purchases={data.purchases} />}
          {page === "reports" && <Reports jobs={data.jobs} finance={data.finance} materials={data.materials} purchases={data.purchases} staff={data.staff} />}
          {page === "notes" && <Notes items={data.notes} onEdit={(r) => openEdit("notes", r)} onDelete={(id, l) => askDelete("notes", id, l)} />}
          {page === "settings" && <BusinessProfile profile={profile} onSave={saveProfile} />}
        </div>
      </main>

      <Drawer open={!!modal} onClose={closeModal} title={modalTitle(modal, page)}>
        {modal && modal.type === "enquiries" && <FormEnquiry data={modal.data} customers={data.customers} onSave={saveEnquiry} onCancel={closeModal} />}
        {modal && modal.type === "quotations" && <FormQuotation data={modal.data} customers={data.customers} onSave={saveQuotation} onCancel={closeModal} />}
        {modal && modal.type === "jobs" && <FormJob data={modal.data} staff={data.staff} customers={data.customers} onSave={saveJob} onCancel={closeModal} />}
        {modal && modal.type === "customers" && <FormCustomer data={modal.data} onSave={saveCustomer} onCancel={closeModal} />}
        {modal && modal.type === "inventory" && <FormMaterial data={modal.data} onSave={saveMaterial} onCancel={closeModal} />}
        {modal && modal.type === "purchases" && <FormPurchase data={modal.data} materials={data.materials} onSave={savePurchase} onCancel={closeModal} />}
        {modal && modal.type === "finance" && <FormFinance data={modal.data} onSave={saveFinance} onCancel={closeModal} />}
        {modal && modal.type === "staff" && <FormStaff data={modal.data} onSave={saveStaffRec} onCancel={closeModal} />}
        {modal && modal.type === "notes" && <FormNote data={modal.data} onSave={saveNote} onCancel={closeModal} />}
      </Drawer>

      <ConfirmDialog open={!!confirm} label={confirm?.label} onCancel={() => setConfirm(null)} onConfirm={doDelete} />
      <Toast message={toast} />
    </div>
  );
}

function modalTitle(modal, page) {
  if (!modal) return "";
  const isEdit = !!(modal.data && modal.data.id);
  const map = { enquiries: "Enquiry", quotations: "Quotation", jobs: "Job", customers: "Customer", inventory: "Material", purchases: "Purchase", finance: "Entry", staff: "Staff", notes: "Note" };
  return `${isEdit ? "Edit" : "New"} ${map[modal.type] || ""}`;
}

/* ---------------------------------------------------------------- */
/* Styles — warm workshop ledger theme                                */
/* ---------------------------------------------------------------- */

const CSS = `
:root{
  --bg:#17140F;
  --surface:#211C16;
  --surface-2:#2A2319;
  --border:#3A3226;
  --text:#F3EADA;
  --text-dim:#B4A48E;
  --text-faint:#7C7061;
  --accent:#C6923F;
  --accent-dim:#8C6A31;
  --rust:#A6462F;
  --good:#77965F;
  --bad:#BC5039;
  --warn:#D2A146;
  --info:#7C93A8;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
*{box-sizing:border-box;}
.app{background:var(--bg);color:var(--text);min-height:100vh;position:relative;}
.app.boot{display:flex;align-items:center;justify-content:center;}
.boot-mark{color:var(--text-dim);font-family:Georgia, serif;letter-spacing:.02em;}
.launch-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;}
.launch-card{display:flex;flex-direction:column;align-items:center;gap:6px;}
.launch-mark{width:68px;height:68px;border-radius:16px;background:var(--accent);color:#20180C;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;margin-bottom:14px;}
.launch-logo{width:68px;height:68px;object-fit:contain;border-radius:16px;margin-bottom:14px;}
.launch-name{font-family:Georgia,serif;font-size:19px;letter-spacing:.06em;color:var(--text);}
.launch-tagline{font-size:12px;color:var(--text-faint);margin-bottom:22px;}
.launch-spinner{width:22px;height:22px;border-radius:50%;border:2.5px solid var(--border);border-top-color:var(--accent);animation:launch-spin .8s linear infinite;}
@keyframes launch-spin{to{transform:rotate(360deg);}}
.side-brand-logo{width:38px;height:38px;object-fit:contain;border-radius:9px;}
.crash-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center;background:var(--bg);color:var(--text);}
.crash-screen h3{margin:0;font-family:Georgia,serif;}
.crash-screen p{margin:0;color:var(--text-dim);font-size:13.5px;max-width:320px;}
.crash-detail{max-width:320px;overflow-x:auto;background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:10px;font-size:11px;color:var(--text-faint);}
.gate-screen{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;}
.gate-card{width:100%;max-width:340px;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px 24px;text-align:center;}
.gate-mark{width:44px;height:44px;border-radius:11px;background:var(--accent);color:#20180C;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;margin:0 auto 16px;}
.gate-card h2{margin:0 0 8px;font-family:Georgia,serif;font-size:19px;}
.gate-card p{margin:0 0 18px;color:var(--text-dim);font-size:13px;line-height:1.5;}
.gate-input{text-align:center;margin-bottom:10px;}
.gate-error{color:var(--bad);font-size:12px;margin-bottom:12px;line-height:1.4;}
.gate-btn{width:100%;}
.side-user{padding:4px 10px 0;}
.side-user-info{padding:6px 12px 8px;}
.side-user-name{font-size:13.5px;color:var(--text);font-weight:600;}
.side-user-role{font-size:11.5px;color:var(--text-faint);margin-top:1px;}
.pdf-overlay{position:fixed;inset:0;background:#0c0a08;z-index:70;display:flex;flex-direction:column;}
.pdf-topbar{display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--surface);border-bottom:1px solid var(--border);}
.pdf-title{flex:1;font-size:13px;color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pdf-download-btn{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;font-size:13px;}
.pdf-download-btn:disabled{opacity:.5;}
.pdf-doc-scroll{flex:1;overflow-y:auto;padding:18px 14px 40px;}
.pdf-error{max-width:640px;margin:0 auto 12px;background:rgba(188,80,57,.15);border:1px solid var(--bad);color:#ffb3a3;border-radius:8px;padding:10px 12px;font-size:12.5px;}
.pdf-sheet{max-width:640px;margin:0 auto;background:#fdfaf5;color:#231d14;border-radius:6px;padding:30px 26px;box-shadow:0 8px 30px rgba(0,0,0,.35);font-family:Georgia,serif;}
.pdf-sheet-head{display:flex;align-items:flex-start;gap:14px;}
.pdf-sheet-logo{width:52px;height:52px;object-fit:contain;border-radius:6px;}
.pdf-sheet-company{font-size:18px;font-weight:700;}
.pdf-sheet-meta{font-size:11px;color:#5a5142;font-family:system-ui,sans-serif;margin-top:2px;}
.pdf-sheet-divider{height:1px;background:#d8cfbd;margin:16px 0;}
.pdf-sheet-titlerow{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px;}
.pdf-sheet-title{font-size:15px;font-weight:700;}
.pdf-sheet-table{width:100%;border-collapse:collapse;font-family:system-ui,sans-serif;font-size:13px;}
.pdf-sheet-table td{padding:6px 0;border-bottom:1px dashed #e2d9c8;}
.pdf-sheet-table td:first-child{color:#6b6150;width:42%;font-weight:600;}
.pdf-sheet-block{margin-top:14px;font-family:system-ui,sans-serif;}
.pdf-sheet-label{font-weight:700;font-size:12.5px;margin-bottom:6px;}
.pdf-sheet-text{font-size:12.5px;color:#3a3222;white-space:pre-wrap;}
.pdf-sheet-terms{margin:0;padding-left:18px;font-family:system-ui,sans-serif;font-size:11.5px;color:#4a4234;line-height:1.6;}

.topbar{
  position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;
  background:var(--surface);border-bottom:1px solid var(--border);
  padding:14px 14px;
}
.topbar-title{display:flex;align-items:center;gap:10px;font-family:Georgia,"Iowan Old Style",serif;font-size:19px;letter-spacing:.01em;}
.brand-mark{
  display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:6px;
  background:var(--accent);color:#20180C;font-size:11px;font-weight:800;font-family:system-ui;
}
.topbar-spacer{flex:1;}
.icon-btn{background:transparent;border:1px solid transparent;color:var(--text);border-radius:8px;padding:6px;display:flex;cursor:pointer;}
.icon-btn:hover{background:var(--surface-2);}

.nav-overlay{position:fixed;inset:0;background:rgba(10,8,5,.55);z-index:29;}
.side-nav{
  position:fixed;top:0;left:0;bottom:0;width:260px;background:var(--surface);
  border-right:1px solid var(--border);transform:translateX(-100%);transition:transform .22s ease;
  z-index:30;display:flex;flex-direction:column;padding:18px 0 18px;
}
.side-nav.open{transform:translateX(0);}
.side-brand{display:flex;align-items:center;gap:12px;padding:4px 18px 14px;}
.side-brand-mark{width:38px;height:38px;border-radius:9px;background:var(--accent);color:#20180C;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;}
.side-brand-name{font-family:Georgia,serif;font-size:16px;}
.side-brand-sub{font-size:11.5px;color:var(--text-faint);}
.nav-stitch{margin:0 18px 10px;}
.side-links{display:flex;flex-direction:column;gap:2px;padding:4px 10px;overflow-y:auto;}
.side-link{
  display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:0 20px 20px 0;
  background:transparent;border:none;color:var(--text-dim);font-size:14.5px;text-align:left;cursor:pointer;position:relative;
}
.side-link:hover{background:var(--surface-2);color:var(--text);}
.side-link.active{background:var(--surface-2);color:var(--accent);}
.side-link.active::before{content:"";position:absolute;left:0;top:8px;bottom:8px;width:3px;border-radius:2px;background:var(--accent);}

.main{padding:14px 14px 60px;max-width:760px;margin:0 auto;}
.page-toolbar{display:flex;justify-content:flex-end;margin-bottom:10px;}
.content{display:flex;flex-direction:column;gap:6px;}

.stitch{height:1px;background-image:repeating-linear-gradient(to right, var(--border) 0 6px, transparent 6px 12px);}

.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 14px;}
.stat-value{font-family:"SF Mono", ui-monospace, Menlo, monospace;font-size:22px;font-weight:600;font-variant-numeric:tabular-nums;}
.stat-label{color:var(--text-dim);font-size:12.5px;margin-top:4px;}
.stat-sub{color:var(--text-faint);font-size:11px;margin-top:2px;}
.tone-text{color:var(--text);}
.tone-good{color:var(--good);}
.tone-bad{color:var(--bad);}
.tone-warn{color:var(--warn);}
.tone-accent{color:var(--accent);}
.tone-info{color:var(--info);}
.tone-faint{color:var(--text-faint);}

.section-head{margin:22px 0 8px;}
.section-head h3{font-family:Georgia,serif;font-weight:600;font-size:15px;letter-spacing:.02em;color:var(--text);margin:0 0 8px;display:flex;justify-content:space-between;align-items:center;gap:8px;}

.list-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:6px;}
.list-row{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid var(--border);font-size:14px;}
.list-row:last-child{border-bottom:none;}
.row-title{color:var(--text);}
.row-sub{color:var(--text-faint);font-size:12.5px;}
.row-meta{color:var(--text-dim);font-size:12.5px;display:flex;align-items:center;gap:6px;}

.table-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:14px;}
.table-row{display:flex;justify-content:space-between;align-items:center;padding:13px 14px;border-bottom:1px solid var(--border);cursor:pointer;position:relative;}
.table-row:last-child{border-bottom:none;}
.table-row:hover{background:var(--surface-2);}
.table-row-alert{border-left:3px solid var(--bad);}
.record-card-alert{border-color:var(--bad);background:rgba(188,80,57,.07);}
.supplier-txns{margin-top:8px;border-top:1px dashed var(--border);padding-top:8px;display:flex;flex-direction:column;gap:5px;}
.supplier-txn-row{display:flex;justify-content:space-between;font-size:12px;color:var(--text-faint);}
.row-right{text-align:right;}

.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:36px 20px;color:var(--text-faint);text-align:center;}
.empty-title{color:var(--text-dim);font-size:14px;margin:0;}
.empty-hint{font-size:12.5px;margin:0;max-width:240px;}

.search-bar{display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px 12px;color:var(--text-faint);margin-bottom:12px;}
.search-bar input{flex:1;background:transparent;border:none;color:var(--text);font-size:14px;outline:none;}

.pill-row{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;}
.pill{background:var(--surface);border:1px solid var(--border);color:var(--text-dim);border-radius:999px;padding:6px 13px;font-size:12.5px;cursor:pointer;}
.pill-active{background:var(--accent);border-color:var(--accent);color:#20180C;font-weight:600;}

.card-list{display:flex;flex-direction:column;gap:9px;}
.record-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:13px 14px;position:relative;cursor:pointer;}
.record-card:hover{border-color:var(--accent-dim);}
.record-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:3px;}
.record-title{font-size:14.5px;font-weight:600;color:var(--text);}
.record-sub{font-size:12.5px;color:var(--text-dim);margin-top:2px;}
.record-foot{font-size:11.5px;color:var(--accent);margin-top:6px;}
.record-actions{margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;}
.del-btn{position:absolute;top:12px;right:12px;background:transparent;border:none;color:var(--text-faint);cursor:pointer;padding:4px;opacity:.7;}
.del-btn:hover{color:var(--bad);opacity:1;}
.chip-btn{display:inline-flex;align-items:center;gap:5px;background:var(--surface-2);border:1px solid var(--border);color:var(--accent);border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;}
.chip-btn:hover{border-color:var(--accent);}
.note-card .note-content{white-space:pre-wrap;font-size:13px;color:var(--text-dim);margin-top:4px;max-height:130px;overflow:hidden;}

.today-heading{font-family:Georgia,serif;color:var(--text-dim);font-size:14px;margin-bottom:10px;}
.alerts-card{margin-bottom:4px;}
.alert-row{display:flex;align-items:flex-start;gap:9px;padding:11px 14px;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-dim);}
.alert-row:last-child{border-bottom:none;}
.alert-row svg{flex-shrink:0;margin-top:2px;}
.settings-hint{color:var(--text-faint);font-size:12.5px;margin:0 0 14px;}
.logo-preview{max-width:120px;max-height:120px;border-radius:10px;border:1px solid var(--border);display:block;margin-bottom:8px;}
.logo-actions{display:flex;gap:8px;}
.chip-btn:disabled{opacity:.5;cursor:default;}
.hint-line{font-size:12.5px;color:var(--text-faint);background:var(--surface);border:1px dashed var(--border);border-radius:10px;padding:11px 12px;margin:14px 0 4px;}
.contact-line{display:flex;align-items:center;gap:8px;margin-top:2px;}
.contact-icon{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;background:var(--surface-2);color:var(--good);border:1px solid var(--border);}
.contact-icon.wa{color:#5FAE71;}
.contact-icon:hover{border-color:var(--accent-dim);}

.badge{display:inline-flex;align-items:center;padding:2px 9px;border-radius:999px;font-size:11px;font-weight:600;letter-spacing:.01em;}
.badge-good{background:rgba(119,150,95,.18);color:var(--good);}
.badge-bad{background:rgba(188,80,57,.18);color:var(--bad);}
.badge-warn{background:rgba(210,161,70,.18);color:var(--warn);}
.badge-info{background:rgba(124,147,168,.18);color:var(--info);}
.badge-accent{background:rgba(198,146,63,.18);color:var(--accent);}
.badge-faint{background:rgba(124,112,97,.18);color:var(--text-faint);}
.badge-default{background:var(--surface-2);color:var(--text-dim);}

.drawer-overlay{position:fixed;inset:0;background:rgba(10,8,5,.6);z-index:40;display:flex;justify-content:flex-end;}
.drawer{width:min(420px,100%);background:var(--surface);height:100%;display:flex;flex-direction:column;border-left:1px solid var(--border);}
.drawer-head{display:flex;justify-content:space-between;align-items:center;padding:16px 16px;border-bottom:1px solid var(--border);}
.drawer-head h3{margin:0;font-family:Georgia,serif;font-size:17px;}
.drawer-body{padding:16px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:14px;}
.drawer-footer{padding:14px 16px;border-top:1px solid var(--border);}

.field{display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:var(--text-dim);}
.field-label{display:flex;gap:2px;}
.req{color:var(--rust);}
.field-hint{color:var(--text-faint);font-size:11px;}
.ctrl{background:var(--surface-2);border:1px solid var(--border);border-radius:9px;padding:10px 11px;color:var(--text);font-size:14px;width:100%;outline:none;font-family:inherit;}
.ctrl:focus{border-color:var(--accent);}
textarea.ctrl{resize:vertical;}
.select-wrap{position:relative;}
.select-wrap select{appearance:none;padding-right:30px;}
.select-caret{position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--text-faint);pointer-events:none;}
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.checkline{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--text-dim);}
.balance-line{font-size:13.5px;color:var(--text-dim);background:var(--surface-2);border-radius:9px;padding:9px 11px;}

.toggle-row{display:flex;gap:8px;}
.toggle{flex:1;padding:11px;border-radius:9px;border:1px solid var(--border);background:var(--surface-2);color:var(--text-dim);font-weight:600;cursor:pointer;}
.toggle-in.active{background:var(--good);border-color:var(--good);color:#0F1A0C;}
.toggle-out.active{background:var(--bad);border-color:var(--bad);color:#210B07;}

.form-actions{display:flex;justify-content:flex-end;gap:10px;padding-top:6px;}
.btn{border-radius:9px;padding:10px 16px;font-size:14px;font-weight:600;cursor:pointer;border:1px solid transparent;}
.btn.primary{background:var(--accent);color:#20180C;}
.btn.primary:disabled{opacity:.45;cursor:not-allowed;}
.btn.ghost{background:transparent;border-color:var(--border);color:var(--text-dim);}
.btn.danger{background:var(--bad);color:#fff;}
.add-btn{display:inline-flex;align-items:center;gap:6px;font-size:13px;padding:9px 14px;}

.confirm-box{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;max-width:320px;margin:auto;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;}
.confirm-box p{color:var(--text-dim);font-size:14px;margin:0;}
.confirm-actions{display:flex;gap:10px;margin-top:6px;}

.toast{
  position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:var(--surface-2);
  border:1px solid var(--accent-dim);color:var(--text);padding:9px 16px;border-radius:999px;font-size:13px;
  display:flex;align-items:center;gap:6px;z-index:60;box-shadow:0 6px 20px rgba(0,0,0,.4);
}

@media(min-width:860px){
  .side-nav{transform:translateX(0);position:sticky;height:100vh;}
  .nav-overlay{display:none;}
  .icon-btn{display:none;}
  .app{display:flex;}
  .main{flex:1;max-width:820px;}
}
`;
