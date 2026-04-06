---
title: "Skeleton Key Attack"
severity: "Critical"
category: "AD Infrastructure"
targets:
  - "Active Directory"
  - "Domain Controllers"
killChains:
  - "silent-persistence"
roles:
  c-level:
    intro: "A Skeleton Key attack patches the domain controller's authentication process to create a master password that works for every account — while all legitimate passwords continue to function normally."
    whyCare: "Business impact: attackers gain a universal backdoor to every account in the domain. The attack is invisible to users since their normal passwords still work, making detection extremely challenging."
  it-admin:
    intro: "Skeleton Key injects malicious code into the LSASS process on a domain controller, adding a secondary password (the skeleton key) that is accepted alongside every user's real password."
    whyCare: "Detection: monitor for LSASS process injection or memory modification on DCs. The attack does not survive a DC reboot. Use Credential Guard and restrict physical and remote access to domain controllers."
  end-user:
    intro: "A Skeleton Key attack does not affect your password or your ability to log in, but it allows attackers to log in as you using a secret master password."
    whyCare: "You cannot detect this attack yourself. Follow security policies, enable MFA where available, and report any suspicious account activity immediately."
  red-teamer:
    intro: "Deploy via Mimikatz (`misc::skeleton`) with Domain Admin access to a DC. The default skeleton key password is 'mimikatz', which is accepted for any account alongside the real password."
    whyCare: "Provides domain-wide persistence that does not modify any objects in AD. Limitation: does not survive DC reboots and only affects the patched DC. Must be redeployed after restarts."
---

A Skeleton Key attack is an Active Directory persistence technique that patches the LSASS (Local Security Authority Subsystem Service) process on a domain controller to install a master password backdoor. Once deployed, the attacker can authenticate as any domain user using the skeleton key password while all legitimate user passwords continue to work normally.

## How It Works

1. **Obtain Domain Admin access** — the attacker must have administrative privileges on the target domain controller
2. **Inject into LSASS** — using Mimikatz (`misc::skeleton`), the attacker patches the LSASS process in memory on the domain controller, hooking the authentication routine
3. **Skeleton key is active** — the patched LSASS now accepts two passwords for every account: the user's real password and the skeleton key (default: "mimikatz")
4. **Authenticate as any user** — the attacker can now log in as any domain user using the skeleton key password, gaining their full privileges and access

## Impact

- Universal backdoor to every account in the domain
- Legitimate user authentication is unaffected, making the attack invisible to users
- No Active Directory objects are modified, so directory-based detection is blind
- Attacker can access any resource by authenticating as any user
- Does not survive a domain controller reboot (must be redeployed)
- Only affects the specific DC where it is deployed

## Key Mitigations

- **Enable LSASS protection** — configure LSASS as a Protected Process Light (PPL) to prevent memory injection on domain controllers
- **Deploy Credential Guard** — uses virtualization-based security to isolate LSASS, blocking skeleton key injection
- **Restart domain controllers regularly** — scheduled reboots clear in-memory patches (though this is a compensating control, not a primary defense)
- **Monitor LSASS integrity** — use endpoint detection tools to alert on process injection, memory modification, or suspicious DLL loading in LSASS
- **Require smart card authentication for privileged accounts** — reduces the effectiveness of password-based backdoors for the most sensitive accounts
