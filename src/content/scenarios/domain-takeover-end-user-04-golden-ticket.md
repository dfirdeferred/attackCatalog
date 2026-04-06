---
title: "The Domain Takeover — Chapter 4: The Golden Ticket"
chain: "domain-takeover"
chainOrder: 4
role: "end-user"
attack: "golden-ticket"
choices:
  - label: "Report the suspicious CEO calendar invite to IT security"
    next: "dcsync"
  - label: "Assume it was a scheduling mistake and decline the invite"
    next: "dcsync"
isDebrief: false
---

Strange things start happening. You receive a calendar invite from your CEO for a meeting that does not exist. A colleague in finance mentions getting an email from the CFO requesting an urgent wire transfer — but the CFO is on vacation. Someone in HR reports that confidential employee records were accessed from an unknown location.

None of these events seem connected to you. But the attacker is now using a forged master credential to impersonate executives and access sensitive systems across the company, and there is nothing any individual employee can do to stop it.

---

## What Is a Golden Ticket Attack?

A Golden Ticket attack is when a hacker creates a fake "master key" for your company's login system. This key lets them pretend to be anyone — your CEO, your IT director, anyone at all. They can access every system, read every email, and open every file. Normal password changes will not stop them because the fake key bypasses the normal login process entirely.
