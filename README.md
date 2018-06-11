# What is This Project?
* This project is one of the main projects for Udacity's Full Stack Nanodegree.
* This is the final project for the "Frontend" section of the course.
* We were instructed to create a "Neighborhood Map" website.
* Essentially it's required to use the Google Map API to pull the map functionality, populate the map with locations that all share a theme (in my case touristy places to visit in Rome, Italy), and make sure a series of functionalities are available.
* These include, but are not limited to:
    1. Having some sort of search bar and results where the locations can be searched through.
    2. Locations show up on the map as markers.
    3. Selected locations expand their data shown in the list view, and are linked to the map, so the selected markers highlight accordingly.
    4. Use at least one other API besides Google to bring in data about the locations.
* The main purpose of this project is to demonstrate not only our ability to make a responsive, attractive interface, but to solidify our skills using third party APIs.

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
* Visit http://www.daniellaurence.com/neighborhood_map/