---
title: "The Silent Persistence — Chapter 4: DCShadow"
chain: "silent-persistence"
chainOrder: 4
role: "red-teamer"
attack: "dcshadow"
choices:
  - label: "Deploy a Skeleton Key on the domain controller for universal backdoor access"
    next: "skeleton-key"
  - label: "Modify the krbtgt account's SID history for another persistence vector"
    next: "skeleton-key"
isDebrief: false
---

With Domain Admin access, you implement DCShadow for stealthy persistence. Using Mimikatz's `lsadump::dcshadow` module, you temporarily register your compromised workstation as a domain controller by creating the necessary `nTDSDSA` and `server` objects in the Configuration partition.

You push several changes through replication: adding your controlled account to the `adminCount` attribute list, modifying the `msDS-AllowedToDelegateTo` attribute on a service account for constrained delegation abuse, and planting a backdoor SPN. After the changes replicate to all legitimate DCs, you deregister the rogue DC. The changes exist in AD but the event logs on the real DCs show only replication traffic — no LDAP modification events.

---

## What Is DCShadow?

DCShadow leverages the DRSUAPI replication protocol to push changes from an attacker-controlled "domain controller" into the legitimate AD database. The operator registers a rogue DC using the `nTDSDSA` object class, pushes changes, then deregisters. Because changes arrive via replication, they bypass LDAP audit logging (Event ID 5136/5137) and most SIEM detections. Detection requires monitoring for unexpected `nTDSDSA` object creation or replication source changes in the Configuration partition.
