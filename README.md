# Testibly.io

Testibly is a small framework that utilises a bunch of tools and techniques gathered together and refiend from countless projects and applications. It provides robust, scalable and pragmatic developer-driven acceptance (BDD) testing of applications.

##CucumberJS

The spec files use a framework called [CucumberJS]('https://cucumber.io/') to help keep a clean separation between the BDD feature files and tests; and the code-based ste_definitions that drive the logic behind the natural language steps.

##Webdriver.IO

The step_defition files use a framework called [Webdriver.IO]('https://webdriver.io/') which is a much more lightweight command-driven alternative to WebdriverJS. As it's node-based it also allows
a great deal of flexibility in how and when we want to perform partocular actions as part of the test suite.

##Development

###Prerequisites

To run the tests you will need:
 - The UI app running locally on http://localhost:3000
 - Latest JRE installed (this is for the standalone selenium server to run)
 - Latest Node LTS
 - Chrome v90 or greater
 - \<Insert any other browsers you may wish to test\>
 - A valid STS session with AWS (this is so the tests can pull variables from SSM)
 
###Commands

The basic run command for the tests is: `npm run cucumber`.

Alternatively you can run the suite headless using: `npm run cucumber-headless`

Finally, if you have valid BrowserStack credentials, you can run: `npm run cucumber-bs`. NOTE - more on this in a later section

####Options

In order to allow you to debug the suite, run in various modes and provide different sets of tests there are a number of options available on the CLI.

#####Tags
Firstly to identify a feature or scenario with a tag simply add `@tagName` on the line before the relevant keyword statement.
e.g.
```
@tag
Sceanrio: This is a test
  Given I do a thing
```

You can then either target that tag specifically by running:
```$xslt
npm run cucumber -- --tags @tag
```

Alternatively, you can choose to run all tests BUT that one by doing:
```$xslt
npm run cucumber -- --tags ~@tag
```
you can read a bit more about tags here - https://cucumber.io/docs/cucumber/api/#tags

NOTE - we have our own tagProcessor just to help with common scenarios but this can be altered as seen fit if it's more useful.

#####Video

The tests can also record video that allows you to see where any failures occur. In order to run the tests with video turned on use:
```$xslt
npm run cucumber -- --video
```

Videos can be found in the `_results_` directory at the root of the app.

#####Environment

The tests can run against any environment and are controlled by doing:
```$xslt
npm run cucumber -- --env dev
```
The default is to local.

NOTE - prod is not currently supported

###Attribute syntax

There is a helper function that allows us to have our own shorthand similar to CSS to access different forms of HTML node via `data-text` attributes. 

The first of these is the `|` character that denotes "And then" e.g. `header|title` means "the title element inside the header element"

The second of these is the `.` character that denotes "Also" e.g. `table-item.odd` means "items with data-test of "table-item" AND "odd" (i.e. ignores any even rows)

####The config lookup

There are times when we might be using 3rd party libraries or just code we have no control over in terms of annotating required HTML elements with friendly and meaningful data attributes. In these instances we can utilise the `support/config.js` and it's lookup table.
This table allows us to map internal and meaningful names to arbitrary CSS selectors that target the 3rd party code. The helper functions in the test suite will always look at this table to see if there are any mappings it needs.

NOTE - a common anti-pattern to avoid here is mapping `friendly-name` to `[data-test="friendly-name"]` which has been seen WAY too many times!

###FAQ

####Why do all the step defs have regexes of varying complexities in them?
That's how cucumberJS matches the natural language to function calls. They are complicated in parts to allow for variations in natural language as well as variable injection.

####Why are the step defs all declared as functions rather than arrow functions?
Firstly because arrow functions really aren't all that, and secondly because each step definition is explicitly scoped to the context of the World (see cucumber docs and world.js). Arrow funcs cannot do this.

####Why is `this` declared as a parameter in EVERY step def even when it's not referenced?
Because above and because Typescript..(and consistency)

####What's all this syntax stuff for elements in feature files?
This is some coded shorthand that allows us to quickly target HTML elements with `data-test` attributes on them. These names should be semantic and meaningful. The notation is described above.

 
