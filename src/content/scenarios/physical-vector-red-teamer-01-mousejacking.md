---
title: "The Physical Vector — Chapter 1: MouseJacking"
chain: "physical-vector"
chainOrder: 1
role: "red-teamer"
attack: "mousejacking"
choices:
  - label: "Inject a keystroke payload to deploy a RAT"
    next: "rainbow-table"
  - label: "Enumerate the target environment through injected recon commands"
    next: "rainbow-table"
isDebrief: false
---

Your physical reconnaissance identified 14 Logitech Unifying receivers visible through the target building's windows — the distinctive orange USB dongles are easy to spot with binoculars. You set up in a rented parking space 60 meters from the building with a CrazyRadio PA and a directional Yagi antenna.

Using the MouseJack firmware on the CrazyRadio, you enumerate the 2.4 GHz spectrum and identify 23 active Unifying receiver addresses. You select the receiver belonging to the CFO's workstation — identified during your OSINT phase by correlating the desk location with LinkedIn office tour photos.

You craft a Ducky Script payload: it opens a hidden PowerShell window, bypasses execution policy, downloads a lightweight credential harvester from your staging server, executes it, and exfiltrates the output — all in 3.2 seconds of injected keystrokes. You transmit the HID frames at the receiver's sync rate. The dongle accepts every packet. On the staging server, you watch the SAM database dump arrive 4.7 seconds after injection.

---

## What Is MouseJacking?

MouseJacking targets the 2.4 GHz proprietary radio protocols used by wireless HID devices. Vulnerable dongles (Logitech Unifying, Dell KM714, HP, Microsoft, and others) either lack encryption entirely or fail to authenticate the source of keystroke packets. Using a CrazyRadio PA ($30) or similar SDR with modified firmware, an attacker sniffs dongle addresses from their radio emissions, then transmits spoofed HID keyboard frames. The dongle processes these as legitimate keystrokes, delivering arbitrary input to the target system at up to 100 meters. The attack is undetectable by network security tools, leaves no traditional IOCs, and requires only physical proximity — not network access.
