---
title: "Ransomware Attack"
severity: "Critical"
category: "Malware & Ransomware"
targets:
  - "All endpoints"
  - "Active Directory"
  - "Backups"
killChains:
  - "domain-takeover"
  - "zero-day-cascade"
roles:
  c-level:
    intro: "Ransomware encrypts your organization's data and demands payment for recovery, often leveraging Active Directory to spread enterprise-wide in minutes."
    whyCare: "A single ransomware event can halt all operations, cost millions in recovery and ransom, and cause lasting reputational damage to the business."
  it-admin:
    intro: "Modern ransomware operators compromise AD first, deploying encryption payloads via Group Policy or PsExec to maximize coverage before defenders can react."
    whyCare: "Detection: monitor for mass file renames, suspicious GPO modifications, and lateral movement patterns. Ensure offline backups are tested and segmented from the domain."
  end-user:
    intro: "Ransomware often starts with a phishing email or malicious download — one click can trigger encryption that locks you and your entire team out of critical files."
    whyCare: "Watch for unexpected email attachments, links from unknown senders, and unusual prompts to enable macros. Report anything suspicious immediately."
  red-teamer:
    intro: "Ransomware simulation involves gaining domain admin, disabling security tooling via GPO, and deploying encryption stagers across endpoints through AD-native mechanisms."
    whyCare: "Test backup isolation, EDR kill-chain detection, and AD hardening by simulating the full attack path from initial access to domain-wide encryption deployment."
---

A ransomware attack encrypts an organization's files, databases, and systems, then demands payment — typically in cryptocurrency — for the decryption key. Modern ransomware operations have evolved far beyond opportunistic infections; they are methodical, multi-stage campaigns that specifically target Active Directory to achieve maximum blast radius.

## How It Works

1. **Initial access** — attackers gain a foothold through phishing emails, exploited VPN appliances, or exposed RDP services, deploying an initial loader or remote access trojan
2. **Reconnaissance and lateral movement** — the operator enumerates the AD environment using tools like BloodHound or ADRecon, identifies domain admins, and moves laterally via Pass-the-Hash, Kerberoasting, or credential dumping
3. **Domain dominance** — the attacker escalates to Domain Admin or compromises the KRBTGT account, gaining full control over Group Policy and the domain trust hierarchy
4. **Backup destruction** — before encrypting, the operator identifies and deletes or encrypts backup systems, Volume Shadow Copies, and disaster recovery infrastructure to eliminate recovery options
5. **Mass deployment** — ransomware payloads are pushed to all domain-joined systems via GPO, PsExec, WMI, or scheduled tasks, often timed for off-hours to delay detection
6. **Extortion** — attackers present a ransom note and may also exfiltrate sensitive data for double-extortion leverage

## Impact

- Complete operational shutdown across all encrypted endpoints and servers
- Data loss if backups are compromised or nonexistent
- Double extortion through data theft and public leak threats
- Regulatory penalties and customer trust erosion following data exposure

## Key Mitigations

- **Maintain offline, immutable backups** — ensure at least one backup set is air-gapped and regularly tested for restoration
- **Harden Active Directory** — implement tiered administration, restrict GPO modification rights, and audit privileged group membership
- **Deploy EDR with behavioral detection** — detect mass file encryption, shadow copy deletion, and suspicious process chains
- **Segment networks** — limit lateral movement by isolating critical systems and enforcing least-privilege access
- **Conduct tabletop exercises** — regularly rehearse ransomware response to reduce recovery time
