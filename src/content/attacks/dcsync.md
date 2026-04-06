---
title: "DCSync Attack"
severity: "Critical"
category: "Identity and Directory Services"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "domain-takeover"
roles:
  c-level:
    intro: "A DCSync attack lets an attacker silently extract every credential in your domain by impersonating a domain controller — no malware on the DC required."
    whyCare: "Business impact: full credential compromise means attackers can access any system, forge tickets, and persist indefinitely. Detection and response must be immediate to prevent total domain loss."
  it-admin:
    intro: "DCSync abuses the MS-DRSR replication protocol to request password hashes from a domain controller, requiring only Replicating Directory Changes privileges."
    whyCare: "Detection: monitor Event ID 4662 for DS-Replication-Get-Changes-All rights exercised by non-DC accounts. Audit and restrict replication permissions aggressively."
  end-user:
    intro: "You will not see this attack directly, but if it succeeds, every password in your organization — including yours — is in the attacker's hands."
    whyCare: "This is why password changes and MFA matter: even if credentials are stolen via DCSync, additional authentication factors can limit the blast radius."
  red-teamer:
    intro: "With Replicating Directory Changes (All) rights, you can use Mimikatz or Impacket's secretsdump to pull any account's NTLM hash without touching the DC's disk."
    whyCare: "Primary extraction technique for KRBTGT, domain admin, and service account hashes. Pair with Golden Ticket or Pass-the-Hash for full domain persistence."
---

A DCSync attack is a credential extraction technique that exploits Active Directory's built-in replication protocol. Instead of compromising a domain controller directly, the attacker tricks the DC into sharing password data by pretending to be a fellow domain controller requesting replication.

## How It Works

1. **Gain replication privileges** — the attacker compromises an account with Replicating Directory Changes and Replicating Directory Changes All permissions, or escalates to one (e.g., Domain Admin, Enterprise Admin)
2. **Initiate replication request** — using tools like Mimikatz (`lsadump::dcsync`) or Impacket's `secretsdump.py`, the attacker sends a `DRSGetNCChanges` request to a domain controller
3. **DC responds with credentials** — the target DC treats the request as legitimate replication and returns password hashes (NTLM, Kerberos keys) for the requested accounts
4. **Extract target hashes** — the attacker can request specific accounts (e.g., KRBTGT, domain admins) or dump the entire directory

## Impact

- Complete credential compromise across the domain without touching the DC's filesystem
- Enables follow-on attacks: Golden Ticket (via KRBTGT hash), Pass-the-Hash, and Silver Ticket
- Extremely difficult to detect without targeted monitoring since it uses legitimate AD protocols
- No artifacts left on the domain controller's disk or memory

## Key Mitigations

- **Audit replication permissions** — regularly review who holds Replicating Directory Changes All and remove unnecessary grants
- **Monitor replication events** — alert on Event ID 4662 where non-DC machine accounts exercise replication rights
- **Implement tiered administration** — isolate Tier 0 accounts and restrict their exposure
- **Deploy honeypot accounts** — create decoy accounts with replication rights and alert on their use
- **Rotate KRBTGT regularly** — limit the window of exploitation if hashes are extracted
