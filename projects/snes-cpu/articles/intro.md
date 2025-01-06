### Project story
A few weeks ago, I purchased my very own SNES console (as I've long been interested in the internal working of retro consoles), but sadly it was struck by the curse of a defectuous *S-CPU revision A*.

But when I searched for a replacement, the cheapest I could see was **50CHF** (about 50$), and even then it's ripped away from a probably perfectly lively console.

So then I decided that I was going to try to fix that, using a FPGA.

### plans for the project
The interface with the old motherboard will be made using 2 flex PCB, that will solder onto the old socket in a similar fashion than the image below

![Flex pcb replacement](/projects/snes-cpu/img/Flex-PCB-Rework-Alt.webp)

These will connect to a rigid PCB, housing a **ICE40HX8K** FPGA chip, this was choosed for it's low price of only about *12CHF*, despite it's limited number of logic cells (97% usage, compiling the S-CPU IP from the [*snestang*](https://github.com/nand2mario/snestang) project)

The rigid *"mainboard"* is only comprised of that, some voltage shifter, as the 5V CMOS input high level is sadly over the 3.3V CMOS output level (if anyone knows a way to run the FPGA I/O at 5V for outputs, **please let me know**), And a memory flash (the internal OTP from the FPGA could be used, but it's not fun if it's set in stone)

### Roadmap
- [2/5] Design the flex PCB
- [ ] Design the FPGA mainboard
- [ ] Program or adapt a S-CPU IP
- [ ] Test the replacement
- [ ] {Maybe} commercialise it



<br><br>
Just got to my mind, but this could techically have been called the snes complementarity/instrumentality project (yes I'm an evangelion fan)<br>