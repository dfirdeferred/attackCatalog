---
title: "Plaintext Password Extraction"
severity: "High"
category: "Credential Theft & Password"
targets:
  - "Active Directory"
  - "Group Policy"
killChains:
  - "zero-day-cascade"
roles:
  c-level:
    intro: "Plaintext password extraction exploits a legacy Group Policy feature that stored local administrator passwords in an easily decryptable format, accessible to any domain user."
    whyCare: "Business impact: if your environment ever used Group Policy Preferences to set local admin passwords, those credentials may still be sitting in SYSVOL, readable by every employee and any attacker who gains domain access."
  it-admin:
    intro: "Group Policy Preferences (GPP) stored passwords encrypted with a publicly known AES key in XML files on the SYSVOL share, making decryption trivial with tools like gpp-decrypt."
    whyCare: "Detection: audit SYSVOL for any remaining Groups.xml, Services.xml, Scheduledtasks.xml, or Datasources.xml files containing cpassword attributes. Deploy MS14-025 and migrate to LAPS immediately."
  end-user:
    intro: "Passwords set through certain older Windows administrative tools were stored in a way that any colleague on the network could decrypt them — you would never know your local admin password had been exposed."
    whyCare: "If IT ever set your local administrator password through Group Policy Preferences, that password may have been visible to everyone on the domain for years."
  red-teamer:
    intro: "Use findstr or PowerShell to search SYSVOL for cpassword entries in GPP XML files, then decrypt with gpp-decrypt or Metasploit's smb_enum_gpp module for instant plaintext recovery."
    whyCare: "Despite MS14-025 patching new GPP password creation in 2014, existing entries persist unless manually removed. Also check for passwords in NETLOGON scripts, unattend.xml, and web.config files."
---

Plaintext password extraction targets credentials stored insecurely within Active Directory infrastructure, most notably through Group Policy Preferences (GPP). Microsoft introduced GPP in Windows Server 2008 to allow administrators to configure local accounts, map drives, and schedule tasks via Group Policy — but the passwords were encrypted with a static AES key that Microsoft published in their documentation.

## How It Works

1. **Access SYSVOL** — any authenticated domain user can read the SYSVOL share (\\domain\SYSVOL), which contains all Group Policy objects
2. **Locate GPP XML files** — search for files like Groups.xml, Services.xml, Scheduledtasks.xml, Drives.xml, and Datasources.xml that contain a `cpassword` attribute
3. **Decrypt the password** — use the publicly known AES-256 key (published by Microsoft in MSDN) to decrypt the cpassword value. Tools like gpp-decrypt, Get-GPPPassword, or Metasploit automate this instantly
4. **Reuse credentials** — the recovered plaintext passwords are often local administrator credentials reused across many machines, enabling widespread lateral movement

Beyond GPP, attackers also hunt for plaintext credentials in:
- **Unattend.xml** and **sysprep.xml** files from automated deployments
- **NETLOGON scripts** containing hardcoded passwords
- **Registry entries** storing credentials for services and scheduled tasks
- **Web.config** and application configuration files on servers

## Impact

- Immediate recovery of local administrator passwords, often shared across the entire fleet
- Lateral movement to every machine using the same local admin password
- Privilege escalation when GPP was used to configure domain-level service accounts
- Legacy exposure that persists years after the vulnerability was patched

## Mitigations

- **Apply MS14-025** — this patch prevents creation of new GPP passwords but does not remove existing ones
- **Audit and purge SYSVOL** — scan for and delete all XML files containing cpassword attributes
- **Deploy LAPS** — use Microsoft's Local Administrator Password Solution to manage unique local admin passwords per machine
- **Search for embedded credentials** — regularly scan NETLOGON, deployment shares, and configuration files for hardcoded passwords
- **Restrict SYSVOL access** — while all domain users need read access for policy processing, monitor for bulk enumeration of GPO files
