# jsemaphore

[![Coverage Status](https://coveralls.io/repos/github/Jannchie/jsemaphore/badge.svg?branch=main)](https://coveralls.io/github/Jannchie/jsemaphore?branch=main) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Jannchie/jsemaphore.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Jannchie/jsemaphore/context:javascript)

## Usage

``` ts
import { parseCookies, stringifyCookies } from "jsemaphore";
cookies = "test=value; name=jsemaphore";
let cookiesMap = parseCookies(cookies);
cookiesMap.set("test", "new_value");
const cookiesString = stringifyCookies(cookiesMap);

// jest
expect(cookiesString).toBe("test=new_value; name=jsemaphore");
```
