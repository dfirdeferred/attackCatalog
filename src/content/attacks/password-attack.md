---
title: "Password Attack"
severity: "Medium"
category: "Credential Theft & Password"
targets:
  - "All authentication systems"
killChains:
  - "cloud-bridge"
roles:
  c-level:
    intro: "Password attacks encompass every method adversaries use to compromise credentials — from simple guessing to sophisticated offline cracking — and remain the leading cause of breaches worldwide."
    whyCare: "Business impact: compromised passwords are involved in over 80% of breaches. Every authentication system your organization exposes is a potential target."
  it-admin:
    intro: "Password attacks span brute-force, dictionary, spraying, credential stuffing, rainbow tables, and offline cracking — each targeting different weaknesses in password storage and policy."
    whyCare: "Detection: correlate failed authentication events across all systems. Monitor for impossible travel, unusual login times, and authentication from known-bad infrastructure."
  end-user:
    intro: "Every password you create is a potential target. Attackers have automated tools that can test millions of password combinations per second against stolen databases."
    whyCare: "Use a password manager to generate unique passwords for every account, and enable multi-factor authentication wherever it is available."
  red-teamer:
    intro: "The password attack surface includes online services (spraying, stuffing), offline hashes (Hashcat, John the Ripper), and protocol-level attacks (NTLM relay, Kerberos)."
    whyCare: "Choose your method based on the target: spray internet-facing services, crack offline hashes with GPU rigs, and relay NTLM where signing is not enforced."
---

Password attacks are a broad category of techniques aimed at compromising user credentials to gain unauthorized access. These attacks range from unsophisticated guessing to advanced cryptanalytic methods and target every layer of the authentication stack.

## How It Works

Password attacks generally fall into several subcategories:

1. **Brute-force** — systematically trying every possible combination until the correct password is found. Effective against short or simple passwords but time-intensive against long ones.
2. **Dictionary attacks** — testing passwords from curated wordlists built from leaked databases, common passwords, and language dictionaries.
3. **Password spraying** — trying a few common passwords against many accounts to avoid lockout detection.
4. **Credential stuffing** — replaying username-password pairs leaked from other breaches, exploiting password reuse.
5. **Offline cracking** — obtaining password hashes (via NTDS.dit, SAM database, or application databases) and cracking them using tools like Hashcat or John the Ripper with GPU acceleration.
6. **Rainbow table attacks** — using precomputed hash-to-password lookup tables to instantly reverse unsalted hashes.

## Impact

- Unauthorized access to user accounts, email, and corporate applications
- Lateral movement using compromised domain credentials
- Privilege escalation when administrative passwords are cracked
- Data exfiltration and ransomware deployment following initial access
- Reputational damage and regulatory penalties from credential-based breaches

## Mitigations

- **Enforce password complexity and length** — require a minimum of 15 characters and ban known-breached passwords using tools like Azure AD Password Protection
- **Implement MFA everywhere** — multi-factor authentication dramatically reduces the value of stolen passwords
- **Use modern hashing algorithms** — store passwords with bcrypt, scrypt, or Argon2 with appropriate work factors
- **Deploy credential monitoring** — subscribe to breach notification services and force resets for exposed credentials
- **Adopt passwordless authentication** — FIDO2 security keys and passkeys eliminate password attacks entirely
