---
title: "The Silent Persistence — Chapter 5: Skeleton Key"
chain: "silent-persistence"
chainOrder: 5
role: "it-admin"
attack: "skeleton-key"
choices:
  - label: "Reboot DC01 immediately to clear the in-memory patch"
    next: "ssp-attack"
  - label: "Capture a memory dump for forensic analysis before rebooting"
    next: "ssp-attack"
isDebrief: false
---

During a routine domain controller health check, you notice something peculiar: the LSASS process on DC01 is consuming significantly more memory than usual. You compare it with DC02 and DC03 — DC01's LSASS is 200MB larger. A deeper analysis reveals that an unauthorized DLL has been loaded into the LSASS process space.

You research the indicators and realize this is a Skeleton Key injection. The attacker has patched the authentication process on this domain controller so they can log in as any user with the password "mimikatz." Meanwhile, every legitimate user can still log in normally with their real password. The backdoor is completely transparent.

---

## What Is a Skeleton Key Attack?

A Skeleton Key attack uses Mimikatz's `misc::skeleton` command to patch the LSASS process on a domain controller. The patch modifies the authentication flow to accept a master password (by default "mimikatz") for any account, while still accepting legitimate passwords. The modification is memory-resident only — it does not persist across reboots. However, detection is difficult because no account attributes change and authentication logs show normal logon events.
