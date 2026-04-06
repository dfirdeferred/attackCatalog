---
title: "Golden Ticket Attack"
slug: "golden-ticket"
severity: "Critical"
category: "Kerberos / AD Authentication"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "domain-takeover"
  - "physical-vector"
roles:
  c-level:
    intro: "A Golden Ticket attack grants an attacker unlimited, undetectable access to every resource in your domain — effectively making them a shadow domain admin."
    whyCare: "Business impact: complete domain compromise means total loss of trust in your identity infrastructure. Recovery requires rebuilding the KRBTGT account twice, which causes widespread service disruption."
  it-admin:
    intro: "When an attacker obtains the KRBTGT hash, they can forge Ticket Granting Tickets (TGTs) for any account, bypassing all authentication controls."
    whyCare: "Detection: monitor Event IDs 4768 and 4769 for anomalous TGT requests. Look for tickets with unusually long lifetimes or issued outside normal KDC operations."
  end-user:
    intro: "You may never see a Golden Ticket attack directly, but its effects can lock you out of systems or expose your data without any visible warning."
    whyCare: "This is why strong password policies and multi-factor authentication matter — they are layers of defense that make Golden Ticket attacks harder to execute."
  red-teamer:
    intro: "With the KRBTGT hash in hand, you can forge TGTs using Mimikatz or Rubeus, granting persistent domain access that survives password resets for all accounts except KRBTGT itself."
    whyCare: "Persistence technique enabling long-term access. Pair with DCSync for hash extraction. The forged ticket is valid for the KRBTGT password rotation period — typically never rotated in most environments."
---

A Golden Ticket attack is a post-exploitation technique that targets the Kerberos authentication protocol in Active Directory environments. The attacker forges a Ticket Granting Ticket (TGT) using the KRBTGT account's password hash, granting themselves unrestricted access to any resource in the domain.

## How It Works

1. **Obtain the KRBTGT hash** — typically via DCSync, NTDS.dit extraction, or direct domain controller access
2. **Forge the TGT** — using tools like Mimikatz (`kerberos::golden`) or Rubeus
3. **Inject the ticket** — pass it into the current session to authenticate as any user
4. **Access any resource** — the forged ticket is accepted by all services in the domain

## Impact

- Complete domain compromise
- Undetectable by standard authentication logs (the ticket looks legitimate)
- Persists until the KRBTGT password is changed **twice** (to invalidate both current and previous keys)
