---
title: "Mousejacking Attack"
severity: "High"
category: "Network & Communication"
targets:
  - "Wireless peripherals"
  - "Workstations"
killChains:
  - "physical-vector"
roles:
  c-level:
    intro: "Mousejacking exploits vulnerabilities in wireless keyboard and mouse receivers to inject keystrokes from up to 100 meters away, giving an attacker remote control of an employee's workstation without any software exploit."
    whyCare: "This physical-layer attack bypasses all software security controls and can deploy malware, exfiltrate data, or create backdoors in seconds — all from a nearby parking lot or adjacent office."
  it-admin:
    intro: "Mousejacking targets non-Bluetooth 2.4 GHz wireless peripherals that use unencrypted or weakly encrypted radio protocols, allowing attackers to pair with the USB dongle and inject arbitrary keystrokes."
    whyCare: "Detection: inventory all wireless peripherals, watch for unexpected USB HID device enumeration, and consider endpoint agents that detect rapid keystroke injection patterns inconsistent with human typing."
  end-user:
    intro: "If you use a wireless keyboard or mouse, an attacker nearby could silently type commands on your computer as if they were sitting at your desk — you might see a brief flash of a command window."
    whyCare: "If you notice your cursor moving on its own, unexpected windows opening, or commands running without your input, disconnect your wireless dongle immediately and alert IT."
  red-teamer:
    intro: "Mousejacking uses a CrazyRadio PA or similar nRF24L01+ transceiver with the MouseJack firmware to discover vulnerable dongles, spoof device pairing, and inject keystrokes at up to 1000 characters per second."
    whyCare: "Effective for physical red team engagements: combine with a Rubber Ducky-style payload to drop a reverse shell in under 5 seconds from the parking lot of the target facility."
---

Mousejacking is a wireless attack that exploits security vulnerabilities in non-Bluetooth wireless mice and keyboards. Discovered by Bastille Networks in 2016, the attack targets the 2.4 GHz radio protocol used by many popular wireless peripherals, allowing an attacker to inject keystrokes into a victim's computer from distances of up to 100 meters using inexpensive radio hardware.

## How It Works

1. **Discover wireless dongles** — using a CrazyRadio PA USB dongle (or similar nRF24L01+-based transceiver) running the MouseJack firmware, the attacker scans the 2.4 GHz spectrum to identify nearby wireless keyboard and mouse receivers
2. **Identify vulnerable devices** — the attacker fingerprints the discovered dongles to determine the manufacturer and protocol, checking against the list of vulnerable chipsets (primarily Nordic Semiconductor nRF24L-series based devices from Logitech, Dell, HP, Lenovo, Microsoft, and others)
3. **Spoof the peripheral** — the attacker forces pairing or exploits the dongle's willingness to accept unencrypted packets, masquerading as a legitimate keyboard even when the original device is a mouse
4. **Inject keystrokes** — the attacker transmits keystroke packets to the dongle at high speed, which the receiver passes to the operating system as legitimate keyboard input. This can type commands, open terminals, download payloads, and execute arbitrary code
5. **Deploy payload** — a pre-scripted injection sequence (similar to USB Rubber Ducky scripts) opens a command prompt, downloads and executes a reverse shell or malware dropper, and closes the window — often completing in under 10 seconds

## Impact

- Remote code execution on the target workstation without any software vulnerability
- Bypasses all endpoint security software since input arrives via a trusted USB HID device
- Attacker can operate from significant distance (100+ meters with directional antenna)
- Rapid payload delivery makes detection by the user or security tools extremely difficult

## Key Mitigations

- **Replace vulnerable peripherals** — switch to Bluetooth peripherals with proper pairing security or wired keyboards and mice in sensitive environments
- **Apply firmware updates** — some manufacturers (notably Logitech) released firmware patches for affected dongles; ensure these are applied
- **Monitor USB device enumeration** — use endpoint agents to detect and alert on new HID device connections, especially unexpected keyboard registrations
- **Enforce physical security perimeters** — in high-security environments, implement RF shielding and restrict who can operate within range of sensitive workstations
- **Use endpoint input monitoring** — deploy tools that detect superhuman typing speeds or keystroke injection patterns inconsistent with normal user behavior
