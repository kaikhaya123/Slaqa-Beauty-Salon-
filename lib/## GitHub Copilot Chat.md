## GitHub Copilot Chat

- Extension: 0.37.5 (prod)
- VS Code: 1.109.2 (591199df409fbf59b4b52d5ad4ee0470152a9b31)
- OS: win32 10.0.26200 x64
- GitHub Account: kaikhaya123

## Network

User Settings:
```json
  "http.systemCertificatesNode": false,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 20.87.245.6 (23 ms)
- DNS ipv6 Lookup: Error (5036 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): Error (3 ms): Error: net::ERR_CONNECTION_FAILED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (16 ms): Error: connect ENOBUFS 20.87.245.6:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
- Node.js fetch: Error (16 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:26151)
    at n.fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:25799)
    at d (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4781:190)
    at vA.h (file:///c:/Users/khaya/AppData/Local/Programs/Microsoft%20VS%20Code/591199df40/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: connect ENOBUFS 20.87.245.6:443 - Local (undefined:undefined)
      at internalConnect (node:net:1110:16)
      at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
      at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.22 (20 ms)
- DNS ipv6 Lookup: Error (19 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (3 ms)
- Electron fetch (configured): Error (1 ms): Error: net::ERR_CONNECTION_FAILED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (27 ms): Error: connect ENOBUFS 140.82.112.22:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
- Node.js fetch: Error (17 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:26151)
    at n.fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:25799)
    at d (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4781:190)
    at vA.h (file:///c:/Users/khaya/AppData/Local/Programs/Microsoft%20VS%20Code/591199df40/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: connect ENOBUFS 140.82.112.22:443 - Local (undefined:undefined)
      at internalConnect (node:net:1110:16)
      at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
      at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: 4.225.11.192 (18 ms)
- DNS ipv6 Lookup: Error (5050 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (2 ms)
- Electron fetch (configured): Error (1106 ms): Error: net::ERR_CONNECTION_FAILED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (29 ms): Error: connect ENOBUFS 4.225.11.192:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
- Node.js fetch: Error (16 ms): TypeError: fetch failed
    at node:internal/deps/undici/undici:14900:13
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at n._fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:26151)
    at n.fetch (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4749:25799)
    at d (c:\Users\khaya\.vscode\extensions\github.copilot-chat-0.37.5\dist\extension.js:4781:190)
    at vA.h (file:///c:/Users/khaya/AppData/Local/Programs/Microsoft%20VS%20Code/591199df40/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:116:41743)
  Error: connect ENOBUFS 4.225.11.192:443 - Local (undefined:undefined)
      at internalConnect (node:net:1110:16)
      at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
      at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
      at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)

Connecting to https://mobile.events.data.microsoft.com: Error (2 ms): Error: net::ERR_CONNECTION_FAILED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: Error (22 ms): Error: net::ERR_CONNECTION_FAILED
    at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
    at SimpleURLLoaderWrapper.emit (node:events:519:28)
    at SimpleURLLoaderWrapper.emit (node:domain:489:12)
  [object Object]
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (9 ms): Error: connect ENOBUFS 140.82.112.22:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (8 ms): Error: connect ENOBUFS 140.82.112.22:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)
Connecting to https://default.exp-tas.com: Error (7 ms): Error: connect ENOBUFS 13.107.5.93:443 - Local (undefined:undefined)
    at internalConnect (node:net:1110:16)
    at defaultTriggerAsyncIdScope (node:internal/async_hooks:472:18)
    at GetAddrInfoReqWrap.emitLookup [as callback] (node:net:1523:9)
    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:134:8)

Number of system certificates: 42

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).