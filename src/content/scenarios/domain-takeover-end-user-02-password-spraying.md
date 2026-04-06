---
title: "The Domain Takeover — Chapter 2: Password Spraying"
chain: "domain-takeover"
chainOrder: 2
role: "end-user"
attack: "password-spraying"
choices:
  - label: "Change your password immediately to something unique and complex"
    next: "kerberoasting"
  - label: "Wait until after lunch — you're in the middle of something important"
    next: "kerberoasting"
isDebrief: false
---

You get a company-wide email from IT security announcing an emergency password reset. The email explains that a security incident has been detected and all employees must change their passwords within the next two hours. Your manager seems stressed about it in the team meeting.

What you do not know is that your account was one of the twelve compromised in the attack. Your password — "Summer2025!" — was one of the common passwords the attacker tried. They have already used your credentials to access shared drives and email, and they have been reading your inbox for the past six hours.

---

## What Is Password Spraying?

Password spraying is when an attacker tries popular passwords like "Season+Year!" or "CompanyName123" against every employee account in the organization. If your password follows a common pattern, you are at risk. The attacker only needs one attempt per account to avoid locking you out, which means you may never know your account was targeted.
