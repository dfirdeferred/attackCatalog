---
title: "The Physical Vector — Chapter 2: Rainbow Table"
chain: "physical-vector"
chainOrder: 2
role: "it-admin"
attack: "rainbow-table"
choices:
  - label: "Audit the domain for unsalted hashes and enforce NTLMv2"
    next: "zerologon"
  - label: "Deploy a password filter to block known-compromised passwords"
    next: "zerologon"
isDebrief: false
---

The credential harvesting tool dropped by the MouseJack attack extracted the SAM database from the CFO's workstation and several cached domain credentials. You intercept the exfiltration attempt and capture the stolen data — 412 NTLM hashes.

You run the hashes through your own rainbow table to assess exposure. The results are alarming: 302 of 412 hashes (73%) crack in under five minutes. You recognize the patterns — `Summer2024!`, `Company123#`, `Welcome1!` — passwords that technically meet your complexity policy but are trivially predictable. The NTLM hashing algorithm does not use a salt, making precomputed table lookups instant.

Among the cracked credentials: four IT administrator accounts with elevated privileges, twelve finance department accounts with wire transfer authorization, and the service account used for your backup software. You check the domain password policy — minimum eight characters, complexity enabled, 90-day rotation. On paper it looks adequate. In practice, every rotation just increments the trailing number.

---

## What Is a Rainbow Table Attack?

A rainbow table attack uses precomputed hash-to-password mappings to reverse cryptographic hashes. NTLM, the default Windows authentication hash, does not incorporate a salt (random per-user value), making it vulnerable to precomputed attacks. Modern rainbow tables for NTLM cover all passwords up to eight characters and common patterns up to twelve or more characters. The tables use a time-memory tradeoff with reduction functions to compress storage, but can still require terabytes for comprehensive coverage. Defenses include salted hashing algorithms, long passphrases that exceed table coverage, and credential stuffing detection for compromised password databases.
