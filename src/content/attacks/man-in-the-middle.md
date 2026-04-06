---
title: "Man-in-the-Middle Attack"
severity: "Critical"
category: "Network & Communication"
targets:
  - "Networks"
  - "Endpoints"
  - "Cloud services"
killChains: []
roles:
  c-level:
    intro: "Man-in-the-Middle attacks intercept communications between two parties — employees and servers, branches and headquarters — allowing attackers to eavesdrop on and alter sensitive data in transit."
    whyCare: "MITM attacks can expose credentials, financial transactions, and strategic communications, and they undermine trust in every digital channel the organization depends on."
  it-admin:
    intro: "MITM attacks exploit weak network protocols (ARP, DNS, LLMNR) and TLS misconfigurations to position the attacker between communicating hosts, intercepting or modifying traffic transparently."
    whyCare: "Detection: monitor for ARP cache anomalies, rogue DHCP servers, certificate warnings in aggregate, and LLMNR/NBT-NS traffic on the network. Enforce TLS 1.2+ everywhere."
  end-user:
    intro: "When you connect to public Wi-Fi or ignore a browser certificate warning, you may be handing your traffic — including passwords and messages — to an attacker sitting between you and the server."
    whyCare: "Always verify HTTPS padlock icons, never bypass certificate warnings, avoid entering credentials on public Wi-Fi without a VPN, and report any unusual network behavior."
  red-teamer:
    intro: "MITM positioning can be achieved via ARP spoofing (Bettercap), LLMNR/NBT-NS poisoning (Responder), rogue Wi-Fi access points, or DNS spoofing to intercept and relay authentication traffic."
    whyCare: "Once positioned, capture NTLMv2 hashes with Responder, downgrade TLS with sslstrip, or relay credentials with ntlmrelayx for immediate access without cracking."
---

A Man-in-the-Middle (MITM) attack occurs when an adversary secretly inserts themselves into a communication channel between two parties, intercepting and potentially altering data as it flows between them. Neither party realizes the attacker is present, making this one of the most dangerous classes of network attacks.

## How It Works

1. **Network positioning** — the attacker places themselves between the victim and the target server using techniques such as ARP spoofing (sending forged ARP replies to associate the attacker's MAC with the gateway IP), LLMNR/NBT-NS poisoning, DNS spoofing, rogue DHCP servers, or setting up an evil twin Wi-Fi access point
2. **Traffic interception** — once positioned, all traffic between the victim and server passes through the attacker's machine, which transparently forwards packets to avoid detection while logging all data
3. **TLS stripping or downgrade** — if traffic is encrypted, the attacker may attempt to downgrade HTTPS to HTTP using tools like sslstrip, present a forged certificate, or exploit weak TLS configurations to decrypt traffic
4. **Credential capture and relay** — the attacker extracts credentials, session tokens, and authentication hashes from intercepted traffic. In Active Directory environments, captured NTLM hashes can be relayed directly to other services for immediate access
5. **Data manipulation** — beyond eavesdropping, the attacker can modify traffic in real time — injecting malware into downloads, altering financial transaction details, or replacing software updates with backdoored versions

## Impact

- Theft of credentials, session tokens, and sensitive data transmitted over the network
- Credential relay attacks that grant immediate access to domain resources
- Data manipulation that can compromise financial transactions or software supply chains
- Loss of confidentiality for internal communications, potentially affecting regulatory compliance

## Key Mitigations

- **Enforce TLS everywhere** — deploy TLS 1.2+ on all services, implement HSTS, and use certificate pinning for critical applications
- **Disable legacy name resolution** — turn off LLMNR, NBT-NS, and WPAD via Group Policy to prevent poisoning attacks
- **Implement 802.1X and dynamic ARP inspection** — authenticate devices at the network layer and prevent ARP spoofing at the switch level
- **Require SMB signing and LDAP signing** — prevent NTLM relay attacks by enforcing signing on all AD protocols
- **Use VPN on untrusted networks** — mandate VPN usage when connecting from public Wi-Fi or remote locations to encrypt all traffic through a trusted tunnel
