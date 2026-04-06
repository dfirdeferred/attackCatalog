---
title: "The Silent Persistence — Chapter 1: Credential Stuffing"
chain: "silent-persistence"
chainOrder: 1
role: "end-user"
attack: "credential-stuffing"
choices:
  - label: "Report the suspicious VPN login alert to IT security immediately"
    next: "pass-the-hash"
  - label: "Dismiss the notification — it's probably just a system glitch"
    next: "pass-the-hash"
isDebrief: false
---

You get an alert on your phone: "New VPN login from an unrecognized device." You did not log in to the VPN today — you are working from the office. You dismiss the notification, assuming it is a glitch. Maybe IT is doing maintenance.

What you do not realize is that the password you use for your company VPN is the same one you used on a shopping website that was hacked last year. A cybercriminal purchased your stolen credentials and has just logged in to your company's network pretending to be you.

---

## What Is Credential Stuffing?

Credential stuffing is when hackers take usernames and passwords stolen from one website and try them on other websites and services. If you use the same password for your work account and your personal shopping account, a breach at the shopping site gives hackers access to your work account too. This is one of the most common ways corporate networks get compromised.
