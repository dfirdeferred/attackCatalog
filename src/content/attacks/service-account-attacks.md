---
title: "Service Account Attacks"
severity: "High"
category: "Post-Exploitation"
targets:
  - "Active Directory"
  - "Service Accounts"
killChains:
  - "service-account-heist"
roles:
  c-level:
    intro: "Service account attacks target the non-human accounts that run your critical business applications — accounts that often have excessive privileges and passwords that never expire."
    whyCare: "Business impact: service accounts frequently have domain admin equivalent access, never-expiring passwords, and minimal monitoring, making them the most valuable and least protected credentials in your environment."
  it-admin:
    intro: "Attackers target service accounts through Kerberoasting, credential extraction, and permission abuse because these accounts typically have static passwords, SPNs, and elevated privileges."
    whyCare: "Detection: audit all service accounts for SPN registration, password age, and privilege level. Monitor for TGS requests targeting service account SPNs (Event ID 4769) and unusual service account logon patterns."
  end-user:
    intro: "Service accounts run the applications and services you use every day behind the scenes — when they are compromised, attackers gain silent access to the systems you depend on."
    whyCare: "If an application you use starts behaving strangely or requesting unexpected information, report it to IT — it could be a sign that the service account running it has been compromised."
  red-teamer:
    intro: "Service accounts are prime targets: Kerberoast their SPNs, check for unconstrained delegation, dump their credentials from memory, or abuse their often-excessive permissions directly."
    whyCare: "Enumerate with Get-ADUser -Filter {ServicePrincipalName -ne '$null'}. Check password last set dates — accounts with passwords older than 5 years are often crackable. Kerberoast with Rubeus or GetUserSPNs.py."
---

Service account attacks encompass a range of techniques that target non-human accounts used to run applications, services, and automated tasks in Active Directory environments. These accounts are attractive targets because they frequently combine elevated privileges with weak security controls — including passwords that never expire, minimal monitoring, and broad access permissions.

## How It Works

Attackers exploit service accounts through multiple vectors:

1. **Kerberoasting** — request Kerberos service tickets for accounts with registered SPNs, then crack the tickets offline to recover the service account password. Any domain user can request these tickets.
2. **Credential extraction** — dump service account credentials from LSASS memory, Windows Credential Manager, registry keys, or configuration files where passwords are stored in plaintext or reversibly encrypted
3. **Delegation abuse** — exploit unconstrained or constrained delegation settings on service accounts to impersonate other users, potentially including Domain Admins
4. **Permission abuse** — leverage the service account's existing privileges (often Domain Admin or equivalent) for lateral movement and data access without needing to escalate further
5. **Password guessing** — target service accounts with predictable naming conventions and passwords that have not been changed in years

## Impact

- Compromise of critical infrastructure services (databases, web servers, middleware)
- Domain-wide lateral movement using over-privileged service account credentials
- Persistent access through accounts that are rarely audited or rotated
- Data exfiltration from databases and applications the service account can access
- Difficult to remediate because changing service account passwords often breaks dependent applications

## Mitigations

- **Migrate to gMSAs** — Group Managed Service Accounts automate password rotation with complex 256-byte passwords that cannot be Kerberoasted
- **Apply least privilege** — audit and reduce service account permissions to the minimum required for each application
- **Enforce password rotation** — set maximum password ages for service accounts and implement automated rotation through privileged access management (PAM) tools
- **Disable unused SPNs** — remove SPN registrations from accounts that do not need them to reduce the Kerberoasting attack surface
- **Monitor service account activity** — baseline normal logon behavior and alert on deviations such as interactive logons, new source hosts, or off-hours activity
