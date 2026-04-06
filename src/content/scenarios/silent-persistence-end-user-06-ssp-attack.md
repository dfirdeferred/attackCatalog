---
title: "The Silent Persistence — Chapter 6: SSP Attack"
chain: "silent-persistence"
chainOrder: 6
role: "end-user"
attack: "ssp-attack"
choices:
  - label: "Change your password one more time and hope this is the last"
    next: "debrief"
  - label: "Ask IT why the password resets aren't stopping the problem"
    next: "debrief"
isDebrief: false
---

IT sends out yet another password reset notice — the third one this month. You are frustrated. You just memorized your new password, and now you have to change it again. Some colleagues joke about writing passwords on sticky notes under their keyboards.

What nobody tells you is that every password you have set during this incident has been silently recorded by the attacker. Your first new password, your second new password — all captured. The attacker has installed a hidden recorder on the servers that handle logins, and every reset just gives them an updated list.

---

## What Is an SSP Attack?

An SSP (Security Support Provider) attack is when a hacker installs a hidden recording tool on the servers that process your login. Every time you type your password to log in, the hidden tool secretly saves it in a file the hacker can read. This means even when you change your password — which IT keeps asking you to do — the hacker immediately learns the new one. The recorder runs invisibly in the background and survives server restarts.
