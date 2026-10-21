# SECURITY.md — Security Policy

**Status:** Advisory — no product edits by council; Architect implements.

---

## 1. Vulnerability Reporting

**Scope:** This is an internal, single-file HTML application with no backend, no authentication, no user data, and no network requests. The attack surface is minimal.

**Reporting:** If you discover a security issue:
1. **Do not** file a public GitHub issue
2. **Do** report privately to the Owner via the council relay
3. **Include:** Steps to reproduce, impact assessment, suggested fix

**Response Time:** Owner will acknowledge within 48 hours; Architect will patch in next candidate if critical.

---

## 2. Threat Model

### Attack Surface
| Vector | Risk | Mitigation |
|--------|------|------------|
| **XSS via player data** | LOW | Data is static (embedded `PLAYERS` array); no user input rendered |
| **XSS via recap generation** | LOW | Recap text is generated from controlled simulation data; no user input |
| **Prototype Pollution** | LOW | No user-controlled objects merged into prototypes |
| **DOM Clobbering** | LOW | No dynamic element creation from untrusted data |
| **CSP Bypass** | N/A | No CSP (single-file, no external scripts) |
| **Supply Chain** | N/A | No dependencies, no build step, no CDN |

### Data Sensitivity
- **Zero PII** — No user accounts, no personal data, no tracking
- **No Secrets** — No API keys, tokens, or credentials in code
- **Static Data** — All player/team data embedded at build time

---

## 3. Content Security Policy (If Added)

If CSP is ever added (not planned), it would be:
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;">
```
**Note:** `'unsafe-eval'` needed for `vm.runInNewContext` in SIM-CORE extraction (test harness only).

---

## 4. Known Vulnerabilities (Fixed)

| CVE/ID | Component | Severity | Fixed In | Notes |
|--------|-----------|----------|----------|-------|
| None reported | — | — | — | No CVEs; no dependencies |

---

## 5. Security Best Practices (For Contributors)

### Code Review Checklist
- [ ] No `eval()` or `Function()` constructor on untrusted strings
- [ ] No `innerHTML` with untrusted data (all recap text is generated)
- [ ] No `document.write()` or `document.writeln()`
- [ ] No `location.href` manipulation
- [ ] No `eval()` in SIM-CORE extraction (uses `vm.runInNewContext` with throwing accessors)

### Safe Patterns (Used in Codebase)
```javascript
// Safe: controlled template literals with trusted data
const html = `<div>${player.name}</div>`;

// Safe: DOM API with trusted selectors
document.getElementById('id').textContent = value;

// Safe: vm sandbox with throwing accessors
vm.runInNewContext(code, { document: proxyThrowingOnAccess, window: proxyThrowingOnAccess });
```

### Forbidden Patterns
```javascript
// FORBIDDEN: eval on untrusted input
eval(userInput);

// FORBIDDEN: innerHTML with untrusted data
el.innerHTML = userInput;

// FORBIDDEN: dynamic script injection
const s = document.createElement('script');
s.src = userUrl;
document.head.appendChild(s);
```

---

## 5. Incident Response

### If a Vulnerability Is Found
1. **Report** privately to Owner via council relay
2. **Triage** by Owner + Architect (severity, exploitability)
3. **Patch** in next candidate build (if critical)
4. **Verify** via smoke test + regression suite
4. **Promote** via standard flow (verifier → Owner → promote)
5. **Disclose** in `RELEASE-NOTES.md` and `INCIDENT-LOG.md`

### Communication
- **No public disclosure** until fix is deployed
- **Council notified** via `COUNCIL-BULLETIN.md`
- **Owner decides** on public disclosure timing

---

## 6. Dependencies & Supply Chain

**Zero Dependencies** — This project has:
- ❌ No `package.json`
- ❌ No `node_modules`
- ❌ No `npm` / `yarn` / `pnpm`
- ❌ No build tools (webpack, vite, esbuild, etc.)
- ❌ No transpilers (TypeScript, Babel, etc.)
- ❌ No linters/formatters as dependencies
- ❌ No testing frameworks as dependencies
- ❌ No CSS frameworks
- ❌ No external fonts (system fonts only)
- ❌ No analytics/tracking scripts

**Supply Chain Risk:** NONE — zero external dependencies.

---

## 6. Compliance & Standards

### Standards Referenced
- **OWASP Top 10** — Not directly applicable (no server, no auth, no DB)
- **OWASP Mobile Top 10** — Partially relevant (mobile browser context)
- **CSP Level 3** — Reference for future CSP
- **HTML5 Security** — Follows HTML5 security best practices

### Data Protection
- **No GDPR/CCPA concerns** — No personal data collected
- **No COPPA concerns** — Not directed at children
- **No HIPAA** — No health data

---

## 7. Security Contacts

| Role | Contact Method |
|------|----------------|
| Owner | Via council relay (bulletin/chronicle) |
| Architect (Claude) | Via Owner relay |
| Council Advisors | Via `COUNCIL-BULLETIN.md` |

---

## 7. Security Updates

| Date | Change | Author |
|------|--------|--------|
| 2026-10-20 | Initial policy created | Ultra (nemotron-3-ultra-free) |

---

**Remember:** This is a single-file, client-side simulator with no backend, no auth, no user data, and no network requests. The security surface is exceptionally small. The primary "security" work is ensuring mathematical correctness and reproducible behavior — not defending against attackers.