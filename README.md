#INTERSECTION
Yours.co Challenge

# How I implemented what you currently see:

 * I structure the intersection and roads as tables within tables.

Using jQuery, I:
* Measure elements representing the intersection and specific lanes. 
* Represent cars as blue divs, which, on a timer implemented via a setInterval,  I both:
  * Append cars to the intersection.
  * Move the cars along their respective roads.
 Cars will only move if corresponding lights (on the same setInterval timer) are either green or yellow. 

# How I would approach the remaining tasks:

* Currently, there are no cars turning left or right. To handle left-turning cars, I would simply create a signal with a “state” that’s contingent on that of other lights, similar to how the two main lights currently operate (changing in tandem with one another). A car turning left might, toward the middle of the intersection, change classeses and become a westbound “westCar”, for example.
* Right turns would work similarly, though with fewer restrictions.
* In order to ensure lights remain red if there are no cars waiting, I would create ‘hot-zones’, covering ~100px of road before any intersection. I would use the running setInterval to poll for whether there are any cars in these spaces. If there are no cars, I wouldn’t change the lights’ colors.
* Similarly, for a proposed crosswalk, I would pause the appropriate lights for ~2 seconds or so.
