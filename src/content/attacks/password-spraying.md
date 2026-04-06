---
title: "Password Spraying Attack"
severity: "Medium"
category: "Credential Theft & Password"
targets:
  - "Active Directory"
  - "Cloud Services"
  - "VPN"
killChains:
  - "domain-takeover"
roles:
  c-level:
    intro: "Password spraying attacks test a small number of common passwords against every account in your organization, deliberately staying under lockout thresholds to avoid detection."
    whyCare: "Business impact: a single successful spray can give attackers a foothold in your environment, and organizations with weak password policies are especially vulnerable to mass compromise."
  it-admin:
    intro: "Attackers rotate through common passwords like 'Season+Year' or 'CompanyName1!' across all domain accounts, spacing attempts to avoid triggering account lockout policies."
    whyCare: "Detection: monitor for distributed authentication failures across many accounts within a short window — Event IDs 4625 (failed logon) and 4771 (Kerberos pre-auth failure) are key indicators."
  end-user:
    intro: "If you use simple, predictable passwords like your company name followed by a number, password spraying is specifically designed to guess your credentials."
    whyCare: "Use unique, complex passwords or passphrases — spraying attacks succeed because too many people choose the same easy-to-guess passwords."
  red-teamer:
    intro: "Tools like Spray, Ruler, or Burp Suite let you spray credentials against LDAP, OWA, O365, and VPN endpoints while respecting lockout thresholds."
    whyCare: "Effective technique for initial access. Enumerate valid usernames first via LDAP or SMTP, then spray with seasonal patterns. O365 and Azure AD endpoints are prime targets due to internet exposure."
---

Password spraying is a brute-force variant where the attacker tries a small set of commonly used passwords against a large number of accounts simultaneously. Unlike traditional brute-force attacks that target one account with many passwords, spraying distributes attempts across many accounts to avoid triggering lockout policies.

## How It Works

1. **Enumerate usernames** — harvest valid accounts via LDAP reconnaissance, email headers, LinkedIn scraping, or SMTP verification
2. **Select candidate passwords** — choose 1-3 passwords per spray round, typically based on seasonal patterns (e.g., "Spring2026!"), company name variations, or common defaults
3. **Spray credentials** — attempt authentication across all enumerated accounts using the chosen password, targeting services like LDAP, OWA, O365, ADFS, or VPN portals
4. **Respect lockout thresholds** — wait the configured lockout observation window (commonly 30 minutes) between spray rounds
5. **Exploit successful hits** — use compromised accounts for lateral movement, email access, or further privilege escalation

## Impact

- Initial foothold into the environment via any compromised account
- Access to email, SharePoint, VPN, and other corporate resources
- Difficult to detect when sprayed slowly across many accounts
- Can compromise multiple accounts in a single campaign

## Mitigations

- **Enforce strong password policies** — ban common passwords and implement passphrase requirements with a minimum of 15 characters
- **Deploy MFA** — multi-factor authentication neutralizes compromised passwords
- **Smart lockout** — use Azure AD Smart Lockout or similar adaptive lockout policies
- **Monitor authentication logs** — alert on distributed failed logon patterns across many accounts
- **Block legacy authentication** — disable protocols like POP3, IMAP, and SMTP AUTH that bypass MFA
