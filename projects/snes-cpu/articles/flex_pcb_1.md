So, after a few hours of copying the S-CPU package by hand, I finally got the schematic for the flex connectors

#### Here is the one for "Part 1" (Back, Pins 1-50)
![Part 1 schematic](/projects/snes-cpu/img/S_CPU_flex_MK1_part1.svg)

#### And for "Part 2" (Front, Pins 51-100)
![Part 1 schematic](/projects/snes-cpu/img/S_CPU_flex_MK1_part2.svg)

Here a download link of this version for anyone curious: [here, kicad schematics] (/projects/snes-cpu/files/fpga_cpu.zip)

### probably much needed explanations
To explain more about how these cable are going to work, here's a (very bad) drawing:<br>
![bad drawing :( about LCL](/projects/snes-cpu/img/flex_LCL_drawing.jpg)

P1 and P2 are obviously the previously discussed part 1 and 2, (P.S. the solder is not going to be different, I just wanted them not to mix-up, as that would ruin the overlap)
Both are soldered to about half of the socket and got to the FPGA board

#### Bonus
here a flex PCB prototype (design unrelated), that I 3D printed in preparation to prototype this
<!-- was: ![smol PLA flex PCB](/projects/snes-cpu/img/IMG_20241226_185425.jpg) -->
<img alt="smol PLA flex PCB" src="/projects/snes-cpu/img/IMG_20241226_185425.jpg" style="max-width: 80vw;">