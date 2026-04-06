---
title: "Pass-the-Cookie Attack"
severity: "High"
category: "Cloud & Identity Federation"
targets:
  - "Cloud services"
  - "Browsers"
killChains:
  - "cloud-bridge"
roles:
  c-level:
    intro: "Pass-the-Cookie attacks let adversaries hijack authenticated cloud sessions by stealing browser cookies, completely bypassing MFA without ever needing the user's password or second factor."
    whyCare: "This attack undermines the MFA investments many organizations rely on as their primary defense, enabling unauthorized access to SaaS platforms, cloud consoles, and sensitive business data."
  it-admin:
    intro: "Attackers extract session cookies from browsers or memory using infostealers, then replay those cookies from a different machine to inherit the victim's authenticated session."
    whyCare: "Detection: monitor for impossible-travel logins, session reuse from new IP addresses or user agents, and anomalous access patterns in cloud identity provider logs."
  end-user:
    intro: "If malware on your computer steals your browser cookies, an attacker can access your cloud accounts — email, file storage, corporate apps — as if they were you, without needing your password."
    whyCare: "Never save passwords in your browser on shared devices, lock your workstation when away, and report any unexpected session activity or unfamiliar login notifications."
  red-teamer:
    intro: "Cookie extraction from Chrome's cookie database (protected by DPAPI) or via memory dumps of browser processes yields session tokens that bypass MFA for cloud services."
    whyCare: "Tools like SharpChromium, Mimikatz's DPAPI module, and evilginx2 (for real-time cookie capture via phishing proxies) are the primary extraction vectors for cloud session hijacking."
---

A Pass-the-Cookie attack is a session hijacking technique where an attacker steals authenticated session cookies from a user's browser and replays them to gain access to cloud services and web applications. Because the cookie represents an already-completed authentication — including MFA — the attacker inherits the full session without triggering any additional authentication challenges.

## How It Works

1. **Cookie extraction** — the attacker obtains session cookies through one of several methods: deploying an infostealer that reads browser cookie databases, dumping browser process memory, using DPAPI to decrypt Chrome's encrypted cookie store, or intercepting cookies via a phishing proxy like evilginx2
2. **Cookie replay** — the stolen cookies are imported into the attacker's browser (using extensions or tools like Cookie-Editor) or injected programmatically into HTTP requests
3. **Session hijacking** — the target cloud service accepts the cookie as proof of a valid authenticated session, granting the attacker the same access level as the victim
4. **Lateral access** — from the hijacked session, the attacker can access email, cloud storage, admin consoles, and any federated application the victim's SSO token covers
5. **Persistence** — the attacker may register new MFA devices, create OAuth app grants, or generate API tokens to maintain access beyond the cookie's lifetime

## Impact

- Complete bypass of MFA for any service authenticated via the stolen session
- Access to email, cloud storage, admin panels, and federated SaaS applications
- Difficult to distinguish from legitimate user activity in logs
- Potential for privilege escalation if the victim has administrative cloud roles

## Key Mitigations

- **Enforce token binding and conditional access** — tie sessions to device certificates or compliant device status so stolen cookies cannot be replayed from unknown machines
- **Reduce session lifetimes** — shorten cookie TTLs for sensitive applications and require re-authentication for privileged actions
- **Deploy endpoint protection** — detect and block infostealers that target browser cookie stores and DPAPI-protected data
- **Monitor for anomalous sessions** — alert on impossible travel, user-agent changes within active sessions, and concurrent sessions from different locations
- **Implement continuous access evaluation** — use real-time risk signals to revoke sessions when anomalies are detected mid-session
