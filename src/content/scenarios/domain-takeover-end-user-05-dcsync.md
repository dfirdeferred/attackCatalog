---
title: "The Domain Takeover — Chapter 5: DCSync"
chain: "domain-takeover"
chainOrder: 5
role: "end-user"
attack: "dcsync"
choices:
  - label: "Reset your password immediately and enable MFA"
    next: "lateral-movement"
  - label: "Complain to your manager about the constant password resets"
    next: "lateral-movement"
isDebrief: false
---

The IT department sends out another urgent notice: all employees must reset their passwords again, and this time multi-factor authentication is being enforced immediately. The tone is more serious than before. Rumors circulate that the company has been hacked and that employee data may have been stolen.

You do not realize it, but the attacker has already copied the encrypted version of your password — along with every other employee's — from the company's directory. Even after you reset your password, the attacker still has the old hash and the knowledge of the pattern you use.

---

## What Is DCSync?

DCSync is when an attacker tricks your company's login servers into sharing their entire database of passwords. Normally, these servers share this information only with each other to stay synchronized. The attacker pretends to be one of these servers and requests a copy of everyone's credentials. This gives them the ability to access any account in the company.
