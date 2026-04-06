---
title: "The Physical Vector — Chapter 2: Rainbow Table"
chain: "physical-vector"
chainOrder: 2
role: "red-teamer"
attack: "rainbow-table"
choices:
  - label: "Use the cracked admin credentials to VPN into the network"
    next: "zerologon"
  - label: "Prioritize service accounts for privilege escalation"
    next: "zerologon"
isDebrief: false
---

The SAM dump and cached credentials from the CFO's workstation yield 412 NTLM hashes. You load them into your rig: four RTX 4090 GPUs running hashcat against a custom rainbow table set covering all NTLM hashes for passwords up to 10 characters, plus common patterns to 14 characters.

The first pass completes in 47 seconds. You have 302 plaintext passwords. NTLM's lack of salting makes rainbow table lookups essentially instantaneous — no per-hash computation, just a table search. You sort the results by account privilege.

Four IT administrator accounts cracked immediately: `Admin2024!`, `Sysadm1n!`, `Helpdesk#1`, `ITsupport99`. The backup service account used `Backup2023$` — rotated annually with an incrementing year. You validate the admin credentials against the company's internet-facing VPN portal. One account has MFA enabled — you skip it. Another has MFA configured but not enforced for the VPN. You authenticate successfully and establish a tunnel to the internal network.

---

## What Is a Rainbow Table Attack?

Rainbow tables are precomputed hash chain tables that trade storage for computation time in password cracking. For unsalted hashes like NTLM, a rainbow table lookup is O(1) — effectively instantaneous regardless of password complexity, as long as the password falls within the table's coverage. Modern rainbow tables for NTLM cover the full keyspace up to 8 characters (approximately 6.6 quadrillion combinations) and extend to 10+ characters for common patterns. Tables use reduction functions to compress storage via hash chains, with typical NTLM tables requiring 2-8 TB. The defense is salting (which NTLM lacks) or passwords long enough to exceed table coverage. In practice, hashcat with GPU acceleration has largely superseded rainbow tables for targeted cracking, but tables remain useful for bulk hash resolution.
