# PRTFL.js - Awesome Project Presentation

PRTFL.js creates a simple, clickable item grid with a clickable details overlay out of a json description.

PRTFL is built to easily integrate into any web project - no endless dependencies, just plain javascript and css.

Have a look a the demonstration. 

[Interactive Demonstration](http://ex-machina.it/uploads/PRTFL/)

![PRTFL Screenshot - Gallery](http://ex-machina.it/uploads/PRTFL/PRTFL.PNG)

## How To

download src 
or 
```markdown
npm install prtfl 
```
or
```markdown 
yarn install prtfl
```

Just add the .js and the .css-file to your resources.
Then, choose a root element (give the id "PRTFL").
Ready.

A small example:
```markdown
<html>
  <head>
    <link rel="stylesheet" href="PRTFL.min.css">
  </head>
  <body>
    <div id="PRTFL"></div>
    <script type="text/javascript" src="PRTFL.min.js"></script>
  </body>
</html>
```

Now you can add items to the grid, have a look at the .json file in /demo.

```markdown
{
  "items": 
  [
    {
      "preview": 
      {
        "title": "Project A",	
        "description": "a fancy project description",
         "thumbnail": "thumbnail_1.png"
      },
      "details": 
      {
        "title": "Project A",
        "content": 
        [
          {
            "type": "PICTURE",
            "value": ["a_picture.jpg"]
          },
          {
             "type": "TEXT",
             "value": "a single picture and a paragraph"
          }
        ]
      },
      "tags": ["A","B"],
      "date": "ISODATE"
    }
  ]
}
```

### A few notes on content types
* PICTURE: for simplicity all used images are expected to be in ./img (you can change this in the cfg object)
* YOUTUBE: use just the embed code as value, not the whole embed url
* HTML: You can use complex html structures with this type
* TEXT: Faster than html


