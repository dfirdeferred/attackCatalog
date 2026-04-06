---
title: "The Domain Takeover — Chapter 5: DCSync"
chain: "domain-takeover"
chainOrder: 5
role: "it-admin"
attack: "dcsync"
choices:
  - label: "Revoke replication permissions and isolate the compromised system"
    next: "lateral-movement"
  - label: "Begin emergency extraction of the NTDS.dit to assess full scope"
    next: "lateral-movement"
isDebrief: false
---

Your domain controller logs show something terrifying: DRS replication requests originating from an IP address that is not a domain controller. Event ID 4662 shows that an account with `Replicating Directory Changes All` permissions has been used to pull the full NTDS database.

You verify the replication topology — this IP belongs to a compromised workstation in the IT subnet. The attacker has performed a DCSync, extracting every password hash in the domain. Your KRBTGT hash, every admin hash, every service account — all compromised. You realize the Golden Ticket was just the beginning.

---

## What Is DCSync?

DCSync abuses the Directory Replication Service Remote Protocol (MS-DRSR), the same protocol domain controllers use to synchronize with each other. An attacker with `Replicating Directory Changes` and `Replicating Directory Changes All` privileges can impersonate a domain controller and request password data for any account. Tools like Mimikatz automate this with the `lsadump::dcsync` command.
