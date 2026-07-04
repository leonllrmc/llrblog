##### Hey everyone,
First of all, as always, I apologize for again not posting anything for a few months,<br>
<br>

Before starting thanks a lot to the 2 recent GoFundMe donors:
- "Anonymous" for giving 161 CHF
- Erik Mårtensson for giving 10 CHF


### New flex interfaces
This change was made before the latest update update but I forgot to mention it, <br>
as the old interfaces's solder joints were starting to crack, I tried to rework them but I only ended up trashing the pads, so I setted out on a goal that was a requirement for the production version anyway: **S-LCL MK2**<br>

![closeup of the new interfaces solder joints](/projects/snes-cpu/img/IMG_20260218_091958.jpg)<br>
closeup of the new interfaces solder joints
<br><br>

The new interfaces use a fully castellated pad, combined with a crescent shape at the pads start and a hole in the middle of the pad, this allows to make the solder easily flow onto the pad despite its highly capricious surface tension,<br>
On first test it only took me 15 minutes to install and connection-check the flex pcb <small>(keep in mind that I'm not amazingly good at soldering and I had no specific techique in mind, so installers will probably be able to do the job in about 5 minutes).</small>

![closeup of the new interfaces solder joints](/projects/snes-cpu/img/IMG_20260202_180033_rt90.jpg)<br>
All the pads soldered to the interfaces
<br>
<br>
### New gateware
Since the last time, after trying to reproduce the reverse engineered schematic,
I tried another approach, to use everything I've learned from the reimplementation and my FPGA class from uni, to try to implement in a feature based approach (trying to reproduce the behavior in a more FPGA oriented fashion) (Let's call it _reimp2_ for now).

With _reimp2_ and the _dummy DMA_ I had made for the first reimplementation (I couldn't get _nextpnr-ice40_ to accept the reproduced DMA module), I was able to get the burnin cartridge to boot up to the menu and the burnin test to run (and crash) at it first test and strangely enough the mouse test menu (all the other options like controller test would just start the burnin test).

Then, with a few things I had learned from _reimp2_, I wanted to just try to get snestang working, I wasn't expecting much after the first time failing to use it, <br>
but surprisingly out of the box within my custom top-level it wasn't too bad looking at the debugger,
Then by doing some modifications to the snestang code I was able to get surprisingly good results and even startup some roms my *Super everdrive* (the SD2SNES wouldn't work, but I have a theory of why) (RIP the japanese games I had just bought to be able to test _reimp2_).<br>

Here is a small trailer featuring a few roms I had on my everdrive:

<iframe width="1047" height="589" src="https://www.youtube.com/embed/Ch9ixcgKhtA" title="DSCPU trailer 1 release candidate 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

There's still a few glitches, and the probable cause according to me is sadly something more dire:<br>
**Timing issues**

<img src="/projects/snes-cpu/img/look-inside-v0-fo2dg2mg6uhf1.webp" style="object-fit:contain;height:70vh;"><br>

With the current snestang test, the resource usage for the FPGA is about 70%, but the max clock frequency is _23.3 MHz_ only about 8% over the snes clock frequency (~21.5 MHz), on top of that there another 8-10ns round trip latency added by the level shifters that doesn't help.

That is also my guess of why the SD2SNES/FXPAK fails, since on the troubleshooting page they write that even something as innocuous as dirty pads may cause enough delay for the cart to malfunction, I would assume that the delay from my board inaccuracies is enough to cause issues.

##### How to fix that ?

###### 1. bigger FPGA

One of the first thing I want to try, is testing a bigger FPGA, that would confirm if the timing issues are due to the FPGA having not enough space to route everything in a timing optimised fashion or if the timing issue is caused by the snestang core itself.

I designed a board (refered to as the [unit 4444.C](https://wiki.evageeks.org/Evangelion_Mark.04#Eva_4444C) in reference to evangelion) sometime ago, that would allow connecting the SNES S-LCL adapters to a big FPGA devboard (here a nexsys video) through a standard [FMC](https://en.wikipedia.org/wiki/FPGA_Mezzanine_Card) interface.

![unit 4444.C board picture](/projects/snes-cpu/img/Screenshot_2026-07-04_125306.png)
![unit 4444.C board picture](/projects/snes-cpu/img/Screenshot_2026-07-04_125357.png)

Sadly the board wasn't sent to production before the exam period, so to assemble (and borrow the devboard) I will probably have to wait until class restarts in september

###### 2. official 65C816 IP core

Currently, for all implementations I've always used the 65C816 core taken from snestang, but as it is not made to be 100% accurate but close enough (ex: missing the PHI2 clock, replacing it with a "usual" clock pin).

The primary issue would be the price to licence the IP, but at the time, I couldn't even get a hold of someone from the WDC sales team, they didn't respond to my message on the contact form, and even when I called them about 2 weeks ago, I was sent to voicemail. 

###### 3. physical 65C816 processor

This is actually something that someone on a project similar to mine is using, I would prefer keeping everything in the FPGA as even if the 65C816 processor is still being produced and sold, it would be pretty annoying to redesign everything once it is not being sold anymore.

###### 4. Finding a more accurate IP core

I'm actually currently rewriting the Mister FPGA snes core from VHDL to systemverilog in hopes for it to be more accurate to snestang in some aspect.

One problem I've noticed with both core is that, as far as I know, they are not made to interact with a physical cartridge, which would explain why some timings may not be fully accurate.

The ideal core from what I've researched looks to be the one used in the [Super NT](https://www.analogue.co/super-nt) from analog, the biggest problem with that is that the IP is closed source and even encrypted.
I could maybe try to contact them, since the super NT is not even sold anymore, but even with that I'm not sure if they would just give me the IP like that.

If anyone from analog is reading this and would like to give me a shot, please contact me :)
<br>

---
<br>
Also, Thanks again for the constant support, especially from the people of the BSX mod and Cabridiy discord,
It always gives me motivation to continue working on the project.

For more frequent updates, you can go to the [BSX mod](https://discord.gg/HAaK9XfDqG) discord server when I have my own channel (Thanks to _Bowlsnapper_) or to the CabriDIY discord server for French updates.

<br>

If you have any question or just want to react, don't hesitate to leave a comment bellow !