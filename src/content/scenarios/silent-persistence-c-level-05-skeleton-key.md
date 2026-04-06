---
title: "The Silent Persistence — Chapter 5: Skeleton Key"
chain: "silent-persistence"
chainOrder: 5
role: "c-level"
attack: "skeleton-key"
choices:
  - label: "Order immediate reboot of all domain controllers to clear the memory patch"
    next: "ssp-attack"
  - label: "Approve Credential Guard deployment on all domain controllers"
    next: "ssp-attack"
isDebrief: false
---

Your CISO's latest briefing reveals the most alarming development yet. The attacker has installed a "Skeleton Key" on your domain controllers — a backdoor that allows them to log in as any user in the organization using a single master password, while all legitimate users continue to authenticate normally.

The elegance of this attack is terrifying: it does not change any passwords, does not modify any accounts, and does not create any new users. It simply patches the authentication process in memory, allowing the attacker to use a universal password alongside every user's real password. No one notices anything different.

---

## What Is a Skeleton Key Attack?

A Skeleton Key attack injects a malicious patch into the LSASS process on a domain controller, allowing the attacker to authenticate as any user using a master password while legitimate passwords continue to work. The patch exists only in memory and does not survive a reboot, but an attacker with persistent access can simply reapply it. Because no accounts are modified and no passwords are changed, the attack leaves virtually no artifacts in standard audit logs.
