Steps to complete
Start by downloading the 3DSinGames-Template folder.

Step 1: Using a nested for loop, create a grid of boxes of size 50x50x50 from -400 to 400 in the x-axis and -400 to 400 on the z-axis. Place the camera at location (800, -600, 800) and have it point at the centre of the scene. If you’ve done things right you should be seeing something like the image below.


Step 2: Set the material to normal, set the stroke to zero and use a stroke weight of two to better distinguish the boxes.

Step 3: For each box in the nested for loop, calculate its distance from the centre of the coordinate system using its x and z coordinates and dist(), then save it in a variable called distance.

Create a new variable length and modulate its value from 100 to 300 using the sin() function and the distance variable. Use the length variable to set the height of the boxes. If you have done things right you should have a wavy structure like the one below with boxes ranging in height from 100 to 300 depending on their distance from the centre. Add frameCount to distance in order to animate the wave.


Step 4: Amend the camera() command and get the camera to fly in a circle around the structure we have created, as it does in the animation at the top of the page. The animation at the top resets after 10 seconds. Your camera should fly continuously, uninterrupted around the object. (Hint: look at the video lecture on moving the camera for how to do this).

Step 5: Time for confetti! Create two global arrays, one called confLocs to store the location of each confetti and one called confTheta to store the initial angle of each confetti.

In the setup() function use a for loop to push 200 3D vectors into confLocs. Make the x component of the vector have random values ranging from -500 to 500, the y component from -800 to 0 and the z component from -500 to 500. This way we’ll have spread confetti all over the structure.

Push also a random angle from 0 to 360 onto the confTheta array. Create a function called confetti() where you’ll loop over the confLocs array. For each entry translate to that location the 3D vector describes, rotate by the corresponding theta and draw a plane of size 15x15. Remember to  apply these transformations within a push()/pop() pair so that it looks right.

Step 6: Let’s animate the confetti! Increment the y-coordinate of the specific confetti by 1 so that it keeps travelling downwards, and increment the rotation by 10 so that it keeps spinning. At the bottom of the for loop add an if statement to check if the y-coordinate of the confetti is greater than 0, that is, if it has reached the middle of the coordinate system. If it has, set the specific vector’s y component to -800, so that the confetti starts at the top of our world. Leave the other two components intact.

Step 7: Make the sketch your own by implementing two of the ideas for further development. If you choose to implement different materials please leave the code for step 2 (material and stroke weight) commented out in your code submission. Keep performance and frame rate in mind for all code implementations. Points given to ambitious learners.  

Ideas for further development:
Customize the sketch by adding different materials that are affected by lights and add lights. Look at the p5.js documentation on lights and materials if needed. Can you add a different material only to the cubes and not the confetti? HINT: think back to push() and pop(). 

Create some p5.js sliders to make some of your variables for the cube grid dynamic, for example the height of the cubes or the speed of the sine wave or potentially resolution of the 2D noise.       

Marking Rubric
Step 1 - [2 points]: A grid of tiles of the right size, spread over the right area, has been produced.

Step 2 - [1 point]: Correct material and stroke is on display.

Step 3 - [2 points]: Structure is wavy like the demo at the top of the page.

Step 4 - [1 point]: Camera flies around like in the demo at the top of the page.

Step 5 - [2 points]: Confetti appear on top of the structure like in the demo, at random locations and random angles, but do not necessarily animate.

Step 6 - [1 point]: Confetti is falling downwards and is also rotating. When it reaches 0 on the y axis it resets to the top.

Step 7 - [3 points]: Has the student implemented ideas for further development?