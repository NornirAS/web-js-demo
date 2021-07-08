# WebJS demo
This demo is for testing communication against Morphic service. Users can send or receive data inside the browser without thinking about the webserver. First, when a connection is established, the user will get WebJS that should build a whole webpage or just a component(widget) to visualize incoming data. Morphic service details like data schema, command schema, and how data will look after WebJS will build the component.
```
This demo working with Chrome and Firefox browser. Safari is not supported for now.
```
## Technology used
[VueJS](https://v3.vuejs.org/) - Easy to use front-end framework.

[Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - To make a requests from the browser without installing any packages.

[ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams) - Refactored from using then to async/await.
