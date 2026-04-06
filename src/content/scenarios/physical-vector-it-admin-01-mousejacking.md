---
title: "The Physical Vector — Chapter 1: MouseJacking"
chain: "physical-vector"
chainOrder: 1
role: "it-admin"
attack: "mousejacking"
choices:
  - label: "Scan for rogue 2.4 GHz transmissions with an SDR"
    next: "rainbow-table"
  - label: "Inventory all wireless HID devices and check firmware versions"
    next: "rainbow-table"
isDebrief: false
---

An endpoint detection alert fires on the CFO's workstation: a rapid sequence of keystrokes executed 47 commands in 3.2 seconds — faster than any human can type. The command history shows a PowerShell download cradle that fetched a credential harvesting tool from a Pastebin URL. But the CFO was in a meeting when it happened. No one was at her desk.

You check the USB device logs. The only input device registered is her Logitech wireless mouse connected through a Unifying receiver. No keyboard was plugged in — yet keyboard input was received. You research the receiver model and confirm it is vulnerable to MouseJack: the dongle accepts unencrypted HID packets, allowing an attacker to inject arbitrary keystrokes from up to 100 meters away.

You grab a software-defined radio and scan the 2.4 GHz band from the server room window. There is a strong signal source in the parking garage across the street, transmitting on the same channels as your Logitech dongles.

---

## What Is MouseJacking?

MouseJacking exploits vulnerabilities in the proprietary 2.4 GHz radio protocols used by non-Bluetooth wireless mice and keyboards. These devices communicate with USB dongle receivers using protocols that often lack encryption or use weak, bypassable encryption for keystroke data. An attacker with a compatible radio transceiver (such as a CrazyRadio PA, costing approximately $30) can sniff the dongle's address from its radio traffic, then transmit spoofed HID (Human Interface Device) packets that the dongle accepts as legitimate keystrokes. The attack requires no interaction from the victim and leaves no traditional malware artifacts — the injected keystrokes appear as normal user input.
