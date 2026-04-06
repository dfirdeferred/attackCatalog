---
title: "The Silent Persistence — Chapter 5: Skeleton Key"
chain: "silent-persistence"
chainOrder: 5
role: "red-teamer"
attack: "skeleton-key"
choices:
  - label: "Install an SSP backdoor for persistence that complements the Skeleton Key"
    next: "ssp-attack"
  - label: "Deploy Skeleton Key on all domain controllers for redundancy"
    next: "ssp-attack"
isDebrief: false
---

To ensure universal backdoor access that leaves no account-level artifacts, you deploy a Skeleton Key on the primary domain controller. With your Domain Admin session, you run Mimikatz's `privilege::debug` followed by `misc::skeleton`. The LSASS process is patched in memory, and you can now authenticate as any user with the master password "mimikatz."

You test the backdoor by authenticating as the CEO's account to access the executive file share — success. You then test as the DBA to access the production database — success. The Skeleton Key gives you on-demand access to any identity in the domain without modifying a single account attribute.

---

## What Is a Skeleton Key Attack?

The Skeleton Key attack patches the LSASS process on a domain controller to add a master password that works for any account. It modifies the authentication routine in memory without touching disk, accounts, or group memberships. The trade-off is that it does not survive a DC reboot — operators typically pair it with other persistence mechanisms. Detection focuses on LSASS integrity monitoring, memory analysis, and unusual DLL loading events on domain controllers.
