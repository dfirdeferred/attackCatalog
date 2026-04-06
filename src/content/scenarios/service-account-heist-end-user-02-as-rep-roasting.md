---
title: "The Service Account Heist — Chapter 2: AS-REP Roasting"
chain: "service-account-heist"
chainOrder: 2
role: "end-user"
attack: "as-rep-roasting"
choices:
  - label: "Complete the mandatory password update IT just pushed to your account"
    next: "gmsa-exploitation"
  - label: "Ask IT why the emergency password change is necessary"
    next: "gmsa-exploitation"
isDebrief: false
---

On Tuesday morning, you receive a company-wide notification: "All employees must change their passwords by end of day. This is a mandatory security measure." You groan — you just changed your password two months ago. The new policy requires at least sixteen characters, and your usual trick of adding a number to the end of your old password will not work anymore.

Behind the scenes, something you never see has gone wrong. The systems that run your company's applications — the email server, the database, the backup system — each have their own special accounts. Think of them like robot employees that work around the clock. Some of these robot accounts had a security setting accidentally turned off years ago, and an attacker figured out how to steal their passwords without anyone noticing. The company-wide password reset is a precaution because IT cannot be sure which accounts were affected. Your password was probably safe, but the "robot accounts" running the company's systems were not.

---

## What Is AS-REP Roasting?

AS-REP Roasting is an attack that targets accounts with a specific security setting turned off. Normally, when any account — whether a person or a service — tries to log in, it must first prove its identity before receiving its login ticket. When this proof step is disabled, an attacker can request the login ticket without any verification, take it away, and try to guess the password offline at their leisure. You will never see this attack directly, but you may experience its consequences: emergency password resets, new password requirements, or temporary service disruptions while IT fixes the affected accounts. When IT pushes security updates or mandatory password changes, cooperating quickly helps protect everyone.
