---
title: "The Physical Vector — Chapter 2: Rainbow Table"
chain: "physical-vector"
chainOrder: 2
role: "c-level"
attack: "rainbow-table"
choices:
  - label: "Mandate a new enterprise password complexity standard"
    next: "zerologon"
  - label: "Fast-track deployment of enterprise single sign-on"
    next: "zerologon"
isDebrief: false
---

The attack progressed faster than anyone anticipated. Using the keystroke injection, the attacker downloaded a credential harvesting tool and extracted password hashes from several workstations. Your incident response team now reports that the attacker cracked 73% of the stolen hashes within hours using precomputed rainbow tables.

The CISO's briefing is sobering: despite the company's password policy requiring eight characters with complexity, most employees chose predictable patterns — a capitalized word, a number, and a symbol. These patterns are well represented in modern rainbow tables. The attacker now holds working credentials for over 200 employees, including twelve in the finance department and four IT administrators.

Your chief legal officer raises a pointed question: the company represented in its last SOC 2 audit that it enforced "strong password controls." Do crackable-in-hours passwords meet that standard? The audit committee will want an answer.

---

## What Is a Rainbow Table Attack?

A rainbow table is a precomputed lookup table that maps password hashes back to their original plaintext passwords. Instead of trying every possible password combination in real time (brute force), an attacker generates a massive table of hash values in advance and simply looks up a stolen hash to find the matching password. This trades storage space for computation time, making password cracking nearly instantaneous for common passwords. Rainbow tables can crack any password hashed without a salt (a random value added before hashing) and are particularly effective against older hashing algorithms like NTLM and MD5.
