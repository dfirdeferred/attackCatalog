---
title: "The Domain Takeover — Chapter 2: Password Spraying"
chain: "domain-takeover"
chainOrder: 2
role: "red-teamer"
attack: "password-spraying"
choices:
  - label: "Use the IT department credentials to access the jump server"
    next: "kerberoasting"
  - label: "Harvest cached credentials from the twelve compromised workstations"
    next: "kerberoasting"
isDebrief: false
---

Armed with the full user list from your LDAP reconnaissance, you prepare a password spray. You have extracted the domain's password policy: minimum 8 characters, complexity enabled, lockout after 5 attempts with a 30-minute window. You craft a careful spray using seasonal patterns — "Spring2026!", "Company2026#" — and throttle to one attempt per account per hour.

Your spray tool, running through a SOCKS proxy on the compromised workstation, hits gold on twelve accounts. You now have valid credentials for users in finance, HR, and — most importantly — a user in the IT department with access to administrative jump servers.

---

## What Is Password Spraying?

Password spraying tests a small number of likely passwords against many accounts simultaneously, staying under lockout thresholds. Operators craft password candidates using the target organization's password policy, seasonal patterns, and company name variations. The technique is highly effective against environments without MFA, often yielding multiple valid credential pairs from a single spray.
