##### Hey everyone,
<br>
First of all, I appologize for again not posting anything for a few months,<br>
<br>

### First of all Thanks to all the contributors & donors
#### Donors <small>(ordered by total amount)</small>
- Arnaud Loumy, 253 CHF
- RST Games, 93 CHF
- Gregory P Howlett, 79 CHF
- Blake Willig, 31 + 39 CHF
- Cristian Bargans Marín, 46 CHF
- (Anonyme), 17 CHF
- Travis Brendelson, 16 CHF
- Ben Leo Landon, 10 CHF
- Tim Böttiger, 9 CHF
- Gerster Nicolas, 9 CHF

Thanks a lot to everyone and especially to *Arnaud Loumy*

#### Contributors <small>(unordered)</small>
- QB and OB, from HEPIA, for their help in design and assembly
- DC, for help with MK1 and S-LCL assembly
- PL, for the MK2 initial design
- FFVIMAN, for lending me 2 consoles to help with testing
- (indirect) nand2mario, for snestang
<br><br>
Update: Special thanks to *CabriDIY* for [his video featuring my project](https://www.youtube.com/watch?v=qHtgzeYHhX4)

### Cause of failure of MK1
So this is where the first part of the title comes in: <br>
after vacations where I didn't touch the board, a professor from <a href="https://www.hesge.ch/hepia/" target="_blank">HEPIA</a> (same one who helped with the board assembly, will refer to him as QB), <br>
advised me to try probing the SPI lines of the flash during FPGA boot, I did without measuring any signals <br><br>


After that I gave my schematic to another professor (will refer to him as OB), who quickly spotted the mistake,<br> I had reversed the SPI lines between the FPGA and the flash thanks to them not being clearly labeled on the schematic and my own inatention.<br>
But that was quite an easy fix and was successfully corrected by board modifications<br>
![flash SPI modifications](/projects/snes-cpu/img/Screenshot_2025-09-26_095321.png)
<br><br>

However It still wasn't working, The issue turned out to be that I "forgot" to wire one of the FPGA power supply causing it to be stuck in POR reset (or more accurately I tought it was only necessary for internal programming), <br>
Luckily the FPGA ball for it was on the side and with no traces underneath<br>
![BGA VPP_2V5](/projects/snes-cpu/img/image002.png)<br>
The plan was to drill a small hole and solder a wire to the ball, but that failed due to inaccurate drilling, and so the MK1 was dead<br>


### Unit 02
The Version 2 is based on the layout that the person I refered to in the "proto_1 / Physical boards arrived !" article (who I will now refer to as PL) provided to me<br><br>
His design had the issue of MK1 already fix, with the only problem being one of the signals missing, and using a via size that would increase the JLCPCB costs.<br>
Despite that his design featured already a smaller form factor (50x50mm) and proper FPGA power filtering (decoupling) matching the Lattice datasheet advices.
<br><br>
The V1 of MK2 adjusted the size of vias, put back the missing link, placed the XIN on a global buffered input (should be better for timing) and replaced the transistor + input level shifter combination by a bidirectional open-drain level shifter<br><br>
Then came the first round of review with OB, he first advised me to change the LDO into buck regulator as he feared the FPGA setup current spike might create overheat, and a fan connector just in case<br>
He also advised to put a ferrite bead for snes power filtering, both to filter the FPGA PSU and to prevent digital noise from seeping into the SNES analog circuitry.

![ferrite graph](/projects/snes-cpu/img/Screenshot_2025-10-20_185736.png)<br><br>
The second round of review, focusing on the PCB, first added the idea of putting the level shifter enable pin on a FPGA I/O to prevent driving the bus before the FPGA was ready.<br>
Furthermore, I added the modification while keeping all the original layout (PSU stuff to the right), which created a mess, so I rerouted most of the board, while following a "star distribution" for the power layer (was advised as it stops noise from being shared between components), as a replacement for the previously used power planes.<br><br>

After a final round of verification with OB and QB, the PCB has now been ordered, and I should be able to assemble it at hepia next thursday (best case scenario).