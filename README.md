# Udacity: Make effective Data Visualizations


## Summary
Work consists of many activites: Writing papers, talking to colleagues, having meetings, and much more. Some activites, like talking to colleagues, are important for social purposes but are not productive per se. Since the end of 2013 I documented my own *productive work*. This visualization displays the amount of productive work I have done *on a weekly basis* since then. 
<!-- in no more than 4 sentences, briefly introduce your data visualization and add any context that can help readers understand it -->

## Design
As I was interested in depicting a **comparison** I chose a [barchart](http://www.storytellingwithdata.com/blog/2013/04/chart-chooser). My data is *continuous* and *categorial*. The amount of work per week is *continuous* and the weeks are *categorial*. Having only two variables, a two-dimensional visualization was appropriate. A barchart allowed me to combine the two variable types. The x-axis can be used for the continuous and the y-axis for the categorial variable.

I started with a simple barcart. The barchart depicted the amount of work on a weekly basis. I did not have any interactive elements at the beginning. It troubled me that the x-axis was heavily overloaded due to the amount of weeks since 2013. The labels on the x-axis could not be read because it was too dense. I decided to remove the labels from the x-axis and use a mouse-over effect instead. When a user hovers over a bar the week and the hours of work should be displayed in another window. I did not really know where to place this window. In the end I decided to put it in the lower left corner of the barchart. This position safed some valuable space and allowed a close proximity to the selected bar. This kind of visualization was not ideal though. The mouse over effect would not work if the mouse was placed in the lower left corner where the text was displayed. In the end I decided to put the amount of work on top of the barchart. I realized that a more personal message would be more appropriate. I started with an impersonal *2015 - Week 14 - 38.5 h* message. To make it more personal I changed it to *You worked 38.5 hours in week 14 of 2015*. In order to align the text with the hover effect I decided to use the same color for the bar that was hovered and the text color. 

During the design process I wanted a feature that allows users to see the distribution for specific weeks. It is interesting to see the whole distribution since 2013. A visualization on a yearly bases would give the user a more fine-grained analysis of the data. I therefore decided to add buttons to select particular weeks. In order to jump back to the whole presentation I decided to add a button for all weeks. 

A feature that I wanted to realize was the sort functionality. Wouldn't it be interesting to see on which week I worked the most in a sorted fashion? It was very important the the sorted display was kept even if the year was changed. I had some difficulties to accomplish it, but it worked out in the end.

<!-- explain any design choices you made including changes to the visualization after collecting feedback -->

## Feedback
<!-- include all feedback you received from others on your visualization from the first sketch to the final visualization -->
All in all I asked four people for feedback on my visualization. 

## Resources
<!-- list any sources you consulted to create your visualization -->

* [Sort functionality](http://bl.ocks.org/mbostock/3885705)
* [Axis legend](https://bost.ocks.org/mike/nations/)
* [Grid](http://bl.ocks.org/hunzy/11110940)
* [Update barcharts](https://bl.ocks.org/RandomEtc/cff3610e7dd47bef2d01)