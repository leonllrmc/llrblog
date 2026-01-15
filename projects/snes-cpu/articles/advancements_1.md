#### Hey everyone, 
as usual sorry for the few months of delay,
To begin, happy new year to everyone !

It's now been a little more than a year since I started working on this project and since the last time, I'm happy to finally announce that there has been some promising advancements,
![eva activation patterns](/projects/snes-cpu/img/jj5r4WN.gif)

First I decided to shift my approach from trying to get [snestang](https://github.com/nand2mario/snestang) to work, and instead to write a new gateware based on the real hardware, so I setted to transcribe the [internal schematics](https://github.com/rgalland/SNES_S-CPU_Schematics) (excluding the 65C816 softcore, which I took from snestang),

And after approximately 20h of work, the schematic was transcribed, but there still were problem, which happened to be caused by the toolchain and softcore (bad sv to verilog conversion)

I also had the idea to implement a module I call the "bootloader", which basically just allows me to inject up to 512 Bytes of code and data, negating the need for a custom debug cartridge.

<br><br>
This is one of the latest debug capture of the CPU, with a simple "bootloader" program, that just reads register _$4016_ (triggering a joypad clock pulse), and reads and write a byte to ram.
![logic analyzer capture](/projects/snes-cpu/img/Screenshot_2026-01-15_083129.png)<br>

I have also tried simple test with the PPU, with _results_... (far less than ideal)

This is supposed to draw a sprite on screen:<br>
![logic analyzer capture](/projects/snes-cpu/img/IMG_20260112_183206.jpg)<br>
At least, it seamed to appear consitently when I had the test code doing writes to the PPU.<br>

I am still not sure whether this is caused by my gateware or a PPU-2 failure, I'm not sure of the route I will take, 

But it will probably be te design the new S-LCL version, so that I can test it on the other SNES that [FFVIMAN](https://www.ffviman.fr/) kindly lended me (thanks to him again !)<br>

For more frequent updates, you can go to the [BSX mod](https://discord.gg/HAaK9XfDqG) discord server when I have my own channel (Thanks to _Bowlsnapper_) or to the CabriDIY discord server for French updates.
