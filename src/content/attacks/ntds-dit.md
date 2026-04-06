---
title: "NTDS.dit Password Extraction"
severity: "Critical"
category: "Credential Theft & Password"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "service-account-heist"
roles:
  c-level:
    intro: "NTDS.dit extraction gives attackers a complete copy of every password hash in your domain — every user, every admin, every service account — in a single operation."
    whyCare: "Business impact: this is the master key to your entire identity infrastructure. A successful extraction means every credential in the domain is compromised and must be rotated, including the KRBTGT account."
  it-admin:
    intro: "The NTDS.dit file is the Active Directory database stored on every domain controller, containing all user and computer account password hashes encrypted with the system boot key."
    whyCare: "Detection: monitor for Volume Shadow Copy creation on DCs (Event ID 8222), unusual ntdsutil or vssadmin usage, DCSync replication requests from non-DC sources (Event ID 4662 with replication GUIDs), and abnormal SMB transfers of large files from DCs."
  end-user:
    intro: "The NTDS.dit file contains the hashed password for every single user in your organization — if an attacker gets it, your password is compromised even if you chose a strong one."
    whyCare: "If your organization reports that a domain controller was compromised, change your password immediately — your credentials were almost certainly extracted."
  red-teamer:
    intro: "Extract NTDS.dit via Volume Shadow Copy (vssadmin/ntdsutil), DCSync using Mimikatz or Impacket's secretsdump.py, or WMI shadow copy creation for stealth."
    whyCare: "DCSync only requires Replicating Directory Changes (All) rights — no DC shell needed. Post-extraction, crack hashes with Hashcat or use them directly for pass-the-hash and Golden Ticket attacks."
---

NTDS.dit password extraction is a critical post-exploitation technique targeting the Active Directory database file that stores all domain credentials. The NTDS.dit file, located at `C:\Windows\NTDS\ntds.dit` on every domain controller, contains the password hashes for every user, computer, and service account in the domain.

## How It Works

There are several methods to extract the NTDS.dit database:

1. **Volume Shadow Copy** — create a shadow copy of the C: drive on a domain controller using `vssadmin create shadow` or `ntdsutil "activate instance ntds" "ifm" "create full"`, then copy NTDS.dit and the SYSTEM registry hive from the shadow
2. **DCSync attack** — use Mimikatz's `lsadump::dcsync` or Impacket's `secretsdump.py` to impersonate a domain controller and request replication of password data via the MS-DRSR protocol. This requires no direct access to the DC filesystem
3. **Direct disk access** — mount the DC's disk via backup software, forensic tools, or physical access to extract the database file
4. **Extract and crack** — use `secretsdump.py` or `esedbexport` to parse the NTDS.dit file offline, extracting NTLM hashes for all accounts. Feed hashes into Hashcat or John the Ripper for cracking, or use them directly in pass-the-hash attacks

## Impact

- Complete compromise of every credential in the Active Directory domain
- Enables Golden Ticket attacks via the extracted KRBTGT hash
- Pass-the-hash attacks against any account without needing to crack the password
- Offline cracking reveals plaintext passwords for password reuse attacks against cloud and external services
- Full domain rebuild may be required if the extraction is not detected promptly

## Mitigations

- **Protect domain controllers** — restrict physical and logical access to DCs. They are Tier 0 assets and should be hardened accordingly
- **Monitor for DCSync** — alert on replication requests (Event ID 4662) from non-domain-controller sources
- **Audit shadow copy operations** — monitor for vssadmin and ntdsutil execution on DCs
- **Implement a tiered admin model** — ensure Domain Admin credentials are only used on domain controllers, never on workstations
- **Rotate KRBTGT regularly** — rotate the KRBTGT password twice periodically to limit Golden Ticket persistence if extraction occurs
