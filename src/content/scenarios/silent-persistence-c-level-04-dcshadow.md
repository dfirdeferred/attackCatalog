---
title: "The Silent Persistence — Chapter 4: DCShadow"
chain: "silent-persistence"
chainOrder: 4
role: "c-level"
attack: "dcshadow"
choices:
  - label: "Commission a full AD forest security assessment by external experts"
    next: "skeleton-key"
  - label: "Approve an emergency project to implement real-time replication monitoring"
    next: "skeleton-key"
isDebrief: false
---

The situation has become surreal. Your security team reports that the attacker has registered a fake domain controller on your network. This rogue server is injecting malicious changes directly into Active Directory's replication stream — changes that are automatically accepted by your legitimate domain controllers as trusted updates.

Your CISO explains that this technique effectively makes the attacker's changes invisible to most monitoring tools, because the changes appear to originate from a legitimate replication process. The attacker can modify any object in Active Directory without triggering standard audit logs.

---

## What Is DCShadow?

DCShadow is an advanced attack that temporarily registers a rogue domain controller in Active Directory, then uses it to inject malicious changes through the normal replication process. Because the changes arrive via trusted DC-to-DC replication, they bypass most security monitoring and audit tools. The attacker can modify user attributes, group memberships, SPN configurations, and even security descriptors while leaving minimal forensic evidence.
