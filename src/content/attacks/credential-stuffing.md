---
title: "Credential Stuffing"
severity: "Medium"
category: "Credential Theft & Password"
targets:
  - "Web applications"
  - "Cloud services"
killChains:
  - "silent-persistence"
roles:
  c-level:
    intro: "Credential stuffing uses billions of previously breached username-password pairs to compromise accounts where employees or customers have reused passwords."
    whyCare: "Business impact: even if your own systems were never breached, your users' credentials from other breaches can be used to walk right in — leading to account takeover, data theft, and fraud."
  it-admin:
    intro: "Attackers automate login attempts using massive databases of breached credentials, targeting your web portals, APIs, and cloud services with residential proxies to evade IP-based blocking."
    whyCare: "Detection: look for spikes in failed authentication rates, logins from unusual geographies, and high-volume requests against authentication endpoints from rotating IP addresses."
  end-user:
    intro: "If you reuse the same password across multiple sites and any one of those sites suffers a data breach, attackers will automatically try that password on every major service."
    whyCare: "Use a unique password for every account. Check haveibeenpwned.com to see if your credentials have appeared in known breaches."
  red-teamer:
    intro: "Credential stuffing tools like Sentry MBA, OpenBullet, and custom Python scripts automate authentication against targets using combo lists from breach compilations."
    whyCare: "Success rates typically range from 0.1-2%, but against large user bases that yields thousands of valid accounts. Pair with residential proxy services to bypass rate limiting and geo-blocking."
---

Credential stuffing is an automated attack where adversaries use large collections of breached username-password pairs to attempt logins on unrelated services. The attack exploits the widespread habit of password reuse — when users employ the same credentials across multiple platforms, a breach at one service compromises their accounts everywhere.

## How It Works

1. **Acquire breach data** — obtain credential databases from underground forums, paste sites, or breach compilation services containing billions of email-password pairs
2. **Prepare combo lists** — clean and deduplicate the data, optionally filtering by domain or email provider to target specific organizations
3. **Configure automation** — set up tools like OpenBullet or custom scripts with CAPTCHA-solving services and residential proxy rotation to mimic legitimate traffic
4. **Launch attacks** — submit automated login requests against target authentication endpoints at scale, typically thousands to millions of attempts per day
5. **Harvest valid sessions** — collect successful login sessions, extract account data, and either exploit the access directly or sell validated credentials on criminal marketplaces

## Impact

- Mass account takeover across customer-facing and enterprise applications
- Financial fraud, gift card theft, and loyalty point abuse on compromised consumer accounts
- Access to corporate email, cloud storage, and SaaS platforms using employee credentials
- Secondary attacks launched from compromised accounts (phishing, spam, further lateral movement)
- Reputational and regulatory consequences from large-scale account compromise

## Mitigations

- **Require MFA** — multi-factor authentication blocks credential stuffing even when passwords are valid
- **Deploy bot detection** — use CAPTCHA, device fingerprinting, and behavioral analysis to distinguish automated logins from humans
- **Implement rate limiting** — throttle authentication attempts per IP, per account, and per session
- **Check breached credentials** — integrate with breach databases (e.g., HaveIBeenPwned API) to reject known-compromised passwords at registration and login
- **Monitor for anomalies** — alert on impossible travel, new device logins, and sudden spikes in failed authentication rates
