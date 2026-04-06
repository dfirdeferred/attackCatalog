---
title: "The Silent Persistence — Chapter 2: Pass-the-Hash"
chain: "silent-persistence"
chainOrder: 2
role: "c-level"
attack: "pass-the-hash"
choices:
  - label: "Approve implementation of Credential Guard across all endpoints"
    next: "adminsdholder"
  - label: "Authorize migration to a tiered administration model"
    next: "adminsdholder"
isDebrief: false
---

The security team's investigation has uncovered a new technique in play. The attacker is no longer using stolen passwords — they are using encrypted password representations called "hashes" to authenticate directly, bypassing normal login processes entirely. This means changing passwords alone will not stop them if they have already harvested these hashes.

Your CISO explains that the attacker can now move between systems without ever knowing the actual passwords. Traditional security controls like password complexity requirements and account lockout policies are completely ineffective against this technique.

---

## What Is Pass-the-Hash?

Pass-the-hash is an attack technique where an attacker uses the NTLM hash of a password — rather than the plaintext password itself — to authenticate to a system. Windows authentication protocols accept hashes directly, so an attacker who extracts hashes from memory or disk can impersonate any user without cracking their password. This makes the attack fast, silent, and resistant to password-based defenses.
