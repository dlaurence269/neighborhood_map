# Purpose
* This is the final "Frontend" project for Udacity's Full Stack Web Developer Nanodegree.
* This is a "Neighborhood Map" website, set in Rome, with a tourist locations theme.
* Website tasks include (but not limited to):
    1. Using the Google Map API to pull map functionality.
    2. Listing locations on a side panel that show up on the map as markers.
    3. Having a search bar where the locations and markers can be searched through.
    4. Expanding selected locations to show more data in the list view, and highlighting corresponding map markers.
    5. Using an addional third party API (Yelp in this case) to bring in data about the locations.
* This project demonstrates the ability to make a responsive, attractive interface, as well as solidifying skills using third party APIs.

# How can the code be run?
This project is run on node 9.11, npm 5.8

```
git clone ...
cd neighborhood_map
npm install
browserify static/js/data_pipe.js -o static/js/bundle.js
node server.js
```

# Live Site
* Visit http://map.daniellaurence.com