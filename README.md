## About
This is a demo on how to use Hapi.js with i18n-2 localization package.

## Instruction
```
npm install
port=4000 node server.js
# default port to 3000
```

## To test
```
curl http://localhost:3000/echo
# should respond 'Hello'

curl http://localhost:3000/echo/Rico
# should respond 'Hello Rico'

curl -H 'lang: tw' http://localhost:3000/echo
# should respond '你好'

curl -H 'lang: tw' http://localhost:3000/echo/Rico
# should respond 'Rico你好'
```
