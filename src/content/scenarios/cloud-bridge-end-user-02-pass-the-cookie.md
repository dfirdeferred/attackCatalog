---
title: "The Cloud Bridge — Chapter 2: Pass-the-Cookie"
chain: "cloud-bridge"
chainOrder: 2
role: "end-user"
attack: "pass-the-cookie"
choices:
  - label: "Log out of all sessions and clear your browser data"
    next: "abusing-entra-id"
  - label: "Contact IT to report that your account is still compromised"
    next: "abusing-entra-id"
isDebrief: false
---

IT security reset your password and set up multi-factor authentication on your account. You thought the ordeal was over. But the next day, a colleague mentions receiving a strange email from you — a link to a shared document you never created. You check your Sent folder and find dozens of emails you did not write, all sent in the last few hours.

How is this possible? You just changed your password. It turns out that before IT locked down your account, the attacker captured a small file from your browser — a session cookie — that acts like a temporary backstage pass. With this cookie, they can walk right past the new password and the new MFA setup, because the cookie tells the system they already proved who they are. Your password change did not invalidate this stolen pass.

---

## What Is a Pass-the-Cookie Attack?

A Pass-the-Cookie attack happens when someone steals the small data files — called cookies — that your browser uses to remember that you are logged in. When you sign into a website, the site gives your browser a cookie so you do not have to enter your password on every page. If an attacker copies that cookie, they can paste it into their own browser and the website thinks they are you — no password or MFA needed. This is why it is important to log out of sensitive accounts when you are done, avoid clicking suspicious links that could steal your cookies, and report any strange account activity to IT immediately so they can revoke all your active sessions.
