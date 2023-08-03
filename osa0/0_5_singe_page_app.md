```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server -->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server -->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server -->>browser: the js file
    deactivate server

    note right of browser: selain hakee datan serveriltä javascript-tiedoston lataamisen myötä
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server -->> browser: [{content: "new post", date: "2023-08-03T11:33:13.204Z"},…]
    deactivate server
    note right of browser: selain piirtää muistiinpanot datan saavuttua
```
