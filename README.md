# cygnet-software

Code examples by Susan Korgen. 

## hanoi - December 2020

Solves the Towers of Hanoi problem on the fly using pure, raw JavaScript, HTML, CSS, and generated SVG code. 

The animation represents the puzzle solving itself for the number of discs selected by the user (there are limits). 

Try it: Download the zip, extract files, open hanoi/index.html in a browser.

The demo adjusts animation speed by number of discs, so the user can get to the end. The demo showcases the steep rise in cost for order 2^n computation. It makes a strong case for avoiding recursion and for intelligently balancing storage with computation.

I last used these languages in late 2016, so this example shows my speed of learning and re-learning. Since 2016 I have been working in a proprietary database language unrelated to user interfaces. It took me 5-7 days to review these languages and tools, design the example to showcase specific skills, and create the first version.  

The code incorporates many UI best practices that I retain from years of experience in developing product UIs. These practices are independent of which development stack you choose. It was important to me to show they can be addressed, regardless of stack, in simple and effective ways. The list of UI best practices is long. A few examples:

- Make it easy for the app to be translated into different human languages. 
- Avoiding showing more data than the user can process (page results).
- Do not recompute what you already know (selectively stash data to re-use).

Status: Solid first version with English/French localization - December 22, 2020

Plan to add more? Yes. TO DO: comments at end of main.js.
