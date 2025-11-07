##### Hey everyone,
<br>
First of all, I appologize for not posting anything for about 5 month.

As already stated by the article name, the initial test failed, 
In the following text is laid the tale of this event

<br><br>
So, First I went to HEPIA since a professor proposed to help me soldering the FPGA (Thanks to him again)<br>
![BGA placing](/projects/snes-cpu/img/1753797947472.jpg)
![BGA placing](/projects/snes-cpu/img/1753797947445.jpg)
![BGA placing](/projects/snes-cpu/img/1753797947418.jpg)
<br>Side die picture<br>
![Die Side pics](/projects/snes-cpu/img/20250627_084501.jpg)
<br>Really cool X-ray shot of the die<br>
![Cool X-ray shot](/projects/snes-cpu/img/asic.jpg)
<br>Fun fact: It's allegedly one of the best BGA solder that the imagers ever saw

<small>
Credits:<br>
<b>HEPIA / CoRES</b> montage BGA (Translation: BGA soldering)

<b>UNIGE / DPNC</b> inspection xray (Translation: xray inspection)
</small>

<br><br>
Hepia also has a really cool led display for room number that can be controlled via a slack bot<br>
![hepia awesome door sign](/projects/snes-cpu/img/1753797947390.jpg)

<br><br><br>

After that came soldering the other component, which thankfully a teacher from my school agreed to help me (Also Thanks to him again) with (my hand is not very steady and I was very scared to damage the FPGA board), He also soldered the S-LCL MK1 flex interfaces<br>

![S_LCL solder](/projects/snes-cpu/img/1753797947361.jpg)
![S_LCL solder](/projects/snes-cpu/img/1754898800716.jpg)
<br><br>
"Fun fact": I got my first real electric shock, I was setting up the snes testbench, I had already plugged in the HDMI and was about to plug in the power, unfortunately my aliexpress SNES PSU had one of the 230V wire shorted, which created a flow of electricity from one arm of my body to the other, luckily my school workshop is equiped with fast reacting EFI default current breaker.<br>
Moral of the story: Don't trust aliexpress for sensitive and potentially dangerous stuff.
<br>

<br>The board just before the first test (along with the soldered programmer)<br>
![soldered board](/projects/snes-cpu/img/1753797947334.jpg)
<br><br>
The result of the initial test were a present video signal but outputing only black screen, the same happens when the CPU is entirely disconnected<br>
Conclusion: Nothing got damaged

<br><br>
Then after going home since it was already pretty late at school and everyone was going on vacations, I started analyzing the problem more deeply<br>
![Clock Oscilloscope](/projects/snes-cpu/img/1753797947125.jpg)<br>
Here, CH2 is the SNES main system clock passed trough the level shifter (XIN), and CH1 is the debug output (In this test, I put a simple program that is supposed to output the clock onto the debug ouput)<br>
Conclusion: The XIN signal is probably too deformed for the FPGA to process, <br>since there is no internal Oscillator to test and the programing phase only care about a Flash being present it may also be due to a defective FPGA (injecting a function generator signal doesn't seam to cause a reaction, so it's plausible)<br>
This may be fixed by adding a schmit trigger to the clock input.<br><br>

I will be meeting the same professor who helped me with the soldering to diagnose the input sometime after the end of August, I may need to postpone that until the end of september due to my participation in the [SwissSkills competition](https://swiss-skills2025.ch/fr) that requires heavy training.<br><br>

To end this article, bellow are few more pics of the FPGA board:<br>
![FPGA board with SNES](/projects/snes-cpu/img/1754845579731_thumbnail.jpg)
![FPGA board](/projects/snes-cpu/img/1754845164034.jpg)
![FPGA board](/projects/snes-cpu/img/1754845163946.jpg)