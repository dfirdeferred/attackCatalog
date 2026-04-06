---
title: "Rainbow Table Attack"
severity: "High"
category: "Credential Theft & Password"
targets:
  - "Legacy hash systems"
  - "NTLM"
killChains:
  - "physical-vector"
roles:
  c-level:
    intro: "Rainbow table attacks use massive precomputed lookup tables to instantly crack password hashes, turning what should take years of computation into seconds."
    whyCare: "Business impact: if your systems still use unsalted hashing algorithms like LM or basic NTLM, an attacker who obtains your password database can recover every credential almost instantly."
  it-admin:
    intro: "Rainbow tables contain precomputed hash-to-plaintext mappings for algorithms like NTLM, MD5, and SHA-1, allowing attackers to reverse hashes without brute-force computation."
    whyCare: "Detection: this is an offline attack — there is nothing to detect in real-time. Your defense is ensuring hashes are stored with salts and modern algorithms, and monitoring for the hash extraction that precedes this attack."
  end-user:
    intro: "When websites or systems store your password as a simple hash without proper protections, attackers can look it up in a precomputed table and recover your password instantly."
    whyCare: "Use long, unique passwords — rainbow tables are less effective against longer passwords, and uniqueness ensures a compromise on one site does not affect others."
  red-teamer:
    intro: "Tools like RainbowCrack and ophcrack ship with or generate tables for LM, NTLM, MD5, and SHA-1 hashes, enabling near-instant plaintext recovery for common password lengths."
    whyCare: "Most effective against LM hashes (max 14 chars, split into 7-char halves) and unsalted NTLM. Modern salted hashes make rainbow tables impractical — switch to Hashcat rules-based cracking for those targets."
---

A rainbow table attack is an offline password cracking technique that uses precomputed tables mapping hash values back to their plaintext passwords. Instead of computing hashes on the fly during a brute-force attack, the attacker simply looks up each stolen hash in the table for an instant match.

## How It Works

1. **Generate or acquire tables** — build rainbow tables for the target hash algorithm (e.g., NTLM, MD5) using tools like RainbowCrack's rtgen, or download precomputed tables covering common character sets and password lengths
2. **Obtain password hashes** — extract hashes from the target via NTDS.dit extraction, SAM database dumping, SQL injection, or application database compromise
3. **Perform lookups** — search the rainbow table for each hash. The table uses hash chain reduction functions that trade storage space for computation, enabling coverage of trillions of passwords in tables of manageable size
4. **Recover plaintexts** — matching hashes reveal the original password, typically within seconds

## Impact

- Instant recovery of passwords from unsalted hashes
- Complete compromise of legacy authentication databases using LM or basic NTLM hashing
- Enables pass-the-hash and credential reuse attacks across the environment
- Particularly devastating against organizations that have not disabled LM hash storage

## Mitigations

- **Use salted hashing** — salts make precomputed tables useless because each password produces a unique hash even if the plaintext is identical
- **Disable LM hash storage** — configure Group Policy to prevent storage of LAN Manager hashes (NoLMHash registry key)
- **Enforce long passwords** — rainbow tables become exponentially larger and less practical as password length increases beyond 12 characters
- **Adopt modern algorithms** — use bcrypt, Argon2, or PBKDF2 for application password storage; these include built-in salting and deliberate slowness
- **Protect hash stores** — restrict access to NTDS.dit, SAM databases, and application credential stores to prevent hash extraction in the first place
