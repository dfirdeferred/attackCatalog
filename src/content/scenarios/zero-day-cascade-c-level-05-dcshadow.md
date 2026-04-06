---
title: "The Zero-Day Cascade — Chapter 5: DCShadow"
chain: "zero-day-cascade"
chainOrder: 5
role: "c-level"
attack: "dcshadow"
choices:
  - label: "Commission a full Active Directory integrity audit"
    next: "ransomware"
  - label: "Authorize a parallel AD environment build for migration"
    next: "ransomware"
isDebrief: false
---

The situation has escalated beyond anything your incident response playbook anticipated. The attackers have registered a rogue domain controller on your network — a ghost machine that can inject changes directly into Active Directory replication. They are modifying security group memberships, creating hidden administrative accounts, and altering audit policies to cover their tracks.

Your CISO explains that the integrity of your entire identity infrastructure is now in question. Every permission, every group membership, every trust relationship could have been tampered with. The forensic team cannot determine with certainty which directory changes are legitimate and which were injected by the attacker.

Insurance carriers are requesting a meeting. Your cyber liability policy has a $10 million sublimit for "failure of security" events, and the adjuster's initial assessment suggests this incident may approach that threshold.

---

## What Is a DCShadow Attack?

DCShadow is an advanced Active Directory attack that abuses the domain replication protocol. The attacker registers a rogue domain controller by modifying the AD configuration, then uses the normal replication process to push malicious changes — such as new admin accounts, modified group memberships, or altered security descriptors — to all legitimate domain controllers. Because the changes arrive through trusted replication channels, they bypass most security monitoring and appear as legitimate directory updates. This makes DCShadow exceptionally difficult to detect and remediate.
