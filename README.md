# Udacity: Make effective Data Visualizations


## Summary
Work consists of many activites: Writing papers, talking to colleagues, having meetings, and much more. Some activites, like talking to colleagues, are important for social purposes but are not productive per se. Since the end of 2013 I documented my *productive work on a weekly basis*. In this visualization am particularly interested in the work I have done since the 14th week of 2016 when I started working *full-time*. The main point I want to get across is that I worked considerably more since then.
<!-- in no more than 4 sentences, briefly introduce your data visualization and add any context that can help readers understand it -->

## Design
As I was interested in depicting a **comparison** I chose a [barchart](http://www.storytellingwithdata.com/blog/2013/04/chart-chooser). My data is *continuous* and *categorial*. The amount of work per week is *continuous* and the weeks are *categorial*. Having only two variables, a two-dimensional visualization was appropriate. A barchart allowed me to combine the two variable types. The x-axis can be used for the continuous and the y-axis for the categorial variable.

I started with a simple barchart. The barchart depicted the amount of work on a weekly basis. I did not have any interactive elements at the beginning. It troubled me that the x-axis was heavily overloaded due to the amount of weeks since 2013. The labels on the x-axis could not be read because it was too dense. I decided to remove the labels from the x-axis and use a mouse-over effect instead. When a user hovers over a bar the week and the hours of work should be displayed in another window. I did not really know where to place this window. In the end I decided to put it in the lower left corner of the barchart. This position safed some valuable space and allowed a close proximity to the selected bar. This kind of visualization was not ideal though. The mouse over effect would not work if the mouse was placed in the lower left corner where the text was displayed. In the end I decided to put the amount of work on top of the barchart. I realized that a more personal message would be more appropriate. I started with an impersonal *2015 - Week 14 - 38.5 h* message. To make it more personal I changed it to *You worked 38.5 hours in week 14 of 2015*. In order to align the text with the hover effect I decided to use the same color for the bar that was hovered and the text color. 

During the design process I wanted a feature that allows users to see the distribution for specific weeks. It is interesting to see the whole distribution since 2013. A visualization on a yearly basis would give the user a more fine-grained analysis of the data. I therefore decided to add buttons to select particular weeks. In order to jump back to the whole presentation I decided to add a button for all weeks. 

A feature that I wanted to realize was the sort functionality. Wouldn't it be interesting to see on which week I worked the most in a sorted fashion? It was very important the the sorted display was kept even if the year was changed. I had some difficulties to accomplish it, but it worked out in the end.

In order to get my main point across (the work I did since week 14 of 2016) I decided to add a simple line in my visualization. Now users could instantly see if I managed to work 40 hours in a given week.

<!-- explain any design choices you made including changes to the visualization after collecting feedback -->

## Feedback
<!-- include all feedback you received from others on your visualization from the first sketch to the final visualization -->
I asked four people for feedback on my visualization. At the beginning users could not update the data for any year. I implemented a hover effect for each year. The bars that corresponded to the year were highlighted. The users expected a click event though. Every one of them tried to click the cards of the years, but the system did not respond. I therefore decided to implement an update event on each click. When the users clicks a specific year the data is updated to the year. 

There were some problems with the event handlers. One user rapidly clicked two different years. The transition from one to another was buggy then. The bars did not render properly because of the rapid click event. I decided to turn off the event listeners for half a second when the data is update for a specific year. Half a second seemed to be the appropriate choice. Users did not experience any usability problems due to the click event delay. 

Another user mentioned that I did not highlight the selected year. When the data was updated the only feedback about the year yielded the hover effect of a specific week. I needed another approach. I decided to highlight the year card (e.g. 2016) in a distinct color. Thereby users would now, where they were.  
Most users did not use the sort functionality. This came as a surprise as the overall design is not too complex. In order to make it visible to the user I improved the font-size and font-weight of the text. 


## Resources
<!-- list any sources you consulted to create your visualization -->

* [Sort functionality](http://bl.ocks.org/mbostock/3885705)
* [Axis legend](https://bost.ocks.org/mike/nations/)
* [Grid](http://bl.ocks.org/hunzy/11110940)
* [Update barcharts](https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01)