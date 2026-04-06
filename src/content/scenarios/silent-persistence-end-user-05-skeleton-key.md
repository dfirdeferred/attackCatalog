---
title: "The Silent Persistence — Chapter 5: Skeleton Key"
chain: "silent-persistence"
chainOrder: 5
role: "end-user"
attack: "skeleton-key"
choices:
  - label: "Continue your workday normally — everything seems fine"
    next: "ssp-attack"
  - label: "Mention to IT that you've been thinking about security lately"
    next: "ssp-attack"
isDebrief: false
---

Everything seems normal. You log in every morning, access your files, send emails, attend meetings. You have no idea that the attacker can also log in as you — or as your manager, or as the CEO — at any time, using a single secret password.

The hacker has installed an invisible master key on the servers that handle logins. Your password still works perfectly, and there is no sign that anything has changed. But the attacker has a skeleton key that opens every door in the building.

---

## What Is a Skeleton Key Attack?

A Skeleton Key attack is when a hacker installs a secret master password on the server that verifies everyone's logins. After the installation, the hacker can log in as any employee using this master password, while everyone else's regular passwords continue working normally. It is completely invisible to users — there are no signs of tampering, no locked accounts, no changed passwords. Only a careful inspection of the server's memory would reveal the backdoor.
