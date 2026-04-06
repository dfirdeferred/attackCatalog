---
title: "The Silent Persistence — Chapter 2: Pass-the-Hash"
chain: "silent-persistence"
chainOrder: 2
role: "end-user"
attack: "pass-the-hash"
choices:
  - label: "Ask IT what else you should do to protect your accounts"
    next: "adminsdholder"
  - label: "Feel embarrassed but cooperate fully with the investigation"
    next: "adminsdholder"
isDebrief: false
---

IT contacts you directly. They explain that your workstation has been compromised and they need to take it for forensic analysis. You are given a loaner laptop and told to reset all your passwords. You feel a knot in your stomach — did you do something wrong?

What happened is that when the attacker accessed the network using your reused password, they extracted something called a "password hash" from your computer's memory. This hash is like a digital fingerprint of your password, and the attacker is using it to log into other computers as if they were you — or as the local administrator.

---

## What Is Pass-the-Hash?

Pass-the-hash is a technique where hackers steal the digital fingerprint of your password from your computer's memory and use it to access other systems. They do not need to know your actual password — the fingerprint alone is enough to get in. This is why even strong passwords are not enough on their own; the way computers store and transmit password data creates vulnerabilities that attackers exploit.
