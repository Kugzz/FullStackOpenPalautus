```mermaid
sequenceDiagram
    participant browser
    participant server

    note right of browser: selain luo uuden muistiinpanon ja ilmoittaa siitä serverille
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
    note left of server: sivun uudelleen lataamisen sijaan serveri vain vahvistaa uuden muistiinpanon luonnin
    note left of server: sen lisäksi serveri lisää muistiinpanon niitä hallinoivaan listaan

```
