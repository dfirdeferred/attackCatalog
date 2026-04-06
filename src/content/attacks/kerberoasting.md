---
title: "Kerberoasting"
severity: "High"
category: "Kerberos / AD Authentication"
targets:
  - "Active Directory"
  - "Service Accounts"
killChains:
  - "domain-takeover"
roles:
  c-level:
    intro: "Kerberoasting lets any authenticated domain user request encrypted service tickets and crack them offline to reveal service account passwords — no special privileges required."
    whyCare: "Business impact: service accounts often have elevated privileges and rarely-changed passwords. A single cracked service account can be the entry point to full domain compromise."
  it-admin:
    intro: "Kerberoasting exploits the Kerberos TGS-REQ process to obtain RC4-encrypted service tickets for any account with a Service Principal Name, then cracks them offline."
    whyCare: "Detection: monitor for high volumes of TGS requests (Event ID 4769) with RC4 encryption (0x17) from a single source. Audit all accounts with SPNs and enforce strong passwords or gMSAs."
  end-user:
    intro: "Kerberoasting does not target end users directly, but if a service account you depend on is compromised, attackers can access the systems and data that account protects."
    whyCare: "Use strong, unique passwords for any accounts you manage, and report if you are asked to create service accounts with SPNs — they need special protection."
  red-teamer:
    intro: "Any domain user can request TGS tickets for SPN-registered accounts using Rubeus, GetUserSPNs.py, or PowerView, then crack them offline with Hashcat or John the Ripper."
    whyCare: "Low-risk, high-reward technique requiring only basic domain authentication. Target accounts with adminCount=1 or membership in privileged groups for maximum impact."
---

Kerberoasting is a credential extraction attack that targets service accounts in Active Directory by exploiting the Kerberos ticket-granting process. Any authenticated domain user can request service tickets for accounts with registered Service Principal Names (SPNs), then crack those tickets offline to recover plaintext passwords.

## How It Works

1. **Enumerate SPN-registered accounts** — the attacker queries Active Directory for user accounts with Service Principal Names using tools like PowerView, Rubeus, or Impacket's `GetUserSPNs.py`
2. **Request TGS tickets** — for each target SPN, the attacker requests a Ticket Granting Service ticket through normal Kerberos protocol operations
3. **Extract the encrypted ticket** — the TGS ticket is encrypted with the service account's NTLM hash (often using the weaker RC4 cipher)
4. **Crack offline** — the attacker uses Hashcat (mode 13100) or John the Ripper to brute-force the ticket encryption, recovering the service account's plaintext password
5. **Leverage the credentials** — the cracked password grants access to all resources the service account can reach

## Impact

- Service account credentials exposed without triggering account lockout or alerting the target
- Entirely offline cracking phase leaves no forensic trail after the initial ticket request
- Service accounts often have Domain Admin or other elevated privileges
- Passwords for service accounts are frequently weak and rarely rotated
- Can lead to full domain compromise when privileged service accounts are cracked

## Key Mitigations

- **Use Group Managed Service Accounts (gMSAs)** — automatically rotated, 120-character random passwords that are immune to offline cracking
- **Enforce AES encryption** — disable RC4 for Kerberos to make cracking computationally infeasible
- **Set strong passwords on SPN accounts** — 25+ character random passwords for any legacy service accounts
- **Audit SPN registrations** — remove unnecessary SPNs and review accounts with `servicePrincipalName` attributes
- **Monitor TGS request patterns** — alert on bulk 4769 events requesting RC4 tickets from a single source
