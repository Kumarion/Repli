"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[66],{49164:n=>{n.exports=JSON.parse('{"functions":[{"name":"new","desc":"Constructs a new Signal","params":[],"returns":[{"desc":"","lua_type":"Signal"}],"function_type":"static","source":{"line":147,"path":"src/shared/Repli/Signal.lua"}},{"name":"Wrap","desc":"Constructs a new Signal that wraps around an RBXScriptSignal.\\n\\n\\nFor example:\\n```lua\\nlocal signal = Signal.Wrap(workspace.ChildAdded)\\nsignal:Connect(function(part) print(part.Name .. \\" added\\") end)\\nInstance.new(\\"Part\\").Parent = workspace\\n```","params":[{"name":"rbxScriptSignal","desc":"Existing RBXScriptSignal to wrap","lua_type":"RBXScriptSignal"}],"returns":[{"desc":"","lua_type":"Signal"}],"function_type":"static","source":{"line":168,"path":"src/shared/Repli/Signal.lua"}},{"name":"Is","desc":"Checks if the given object is a Signal.","params":[{"name":"obj","desc":"Object to check","lua_type":"any"}],"returns":[{"desc":"`true` if the object is a Signal.","lua_type":"boolean"}],"function_type":"static","source":{"line":186,"path":"src/shared/Repli/Signal.lua"}},{"name":"Connect","desc":"Connects a function to the signal, which will be called anytime the signal is fired.\\n```lua\\nsignal:Connect(function(msg, num)\\n\\tprint(msg, num)\\nend)\\n\\nsignal:Fire(\\"Hello\\", 25)\\n```","params":[{"name":"fn","desc":"","lua_type":"ConnectionFn"}],"returns":[{"desc":"","lua_type":"SignalConnection"}],"function_type":"method","source":{"line":203,"path":"src/shared/Repli/Signal.lua"}},{"name":"ConnectOnce","desc":"","params":[{"name":"fn","desc":"","lua_type":"ConnectionFn"}],"returns":[{"desc":"","lua_type":"SignalConnection"}],"function_type":"method","deprecated":{"version":"v1.3.0","desc":"Use `Signal:Once` instead."},"source":{"line":219,"path":"src/shared/Repli/Signal.lua"}},{"name":"Once","desc":"Connects a function to the signal, which will be called the next time the signal fires. Once\\nthe connection is triggered, it will disconnect itself.\\n```lua\\nsignal:Once(function(msg, num)\\n\\tprint(msg, num)\\nend)\\n\\nsignal:Fire(\\"Hello\\", 25)\\nsignal:Fire(\\"This message will not go through\\", 10)\\n```","params":[{"name":"fn","desc":"","lua_type":"ConnectionFn"}],"returns":[{"desc":"","lua_type":"SignalConnection"}],"function_type":"method","source":{"line":238,"path":"src/shared/Repli/Signal.lua"}},{"name":"DisconnectAll","desc":"Disconnects all connections from the signal.\\n```lua\\nsignal:DisconnectAll()\\n```","params":[],"returns":[],"function_type":"method","source":{"line":270,"path":"src/shared/Repli/Signal.lua"}},{"name":"Fire","desc":"Fire the signal, which will call all of the connected functions with the given arguments.\\n```lua\\nsignal:Fire(\\"Hello\\")\\n\\n-- Any number of arguments can be fired:\\nsignal:Fire(\\"Hello\\", 32, {Test = \\"Test\\"}, true)\\n```","params":[{"name":"...","desc":"","lua_type":"any"}],"returns":[],"function_type":"method","source":{"line":294,"path":"src/shared/Repli/Signal.lua"}},{"name":"FireDeferred","desc":"Same as `Fire`, but uses `task.defer` internally & doesn\'t take advantage of thread reuse.\\n```lua\\nsignal:FireDeferred(\\"Hello\\")\\n```","params":[{"name":"...","desc":"","lua_type":"any"}],"returns":[],"function_type":"method","source":{"line":315,"path":"src/shared/Repli/Signal.lua"}},{"name":"Wait","desc":"Yields the current thread until the signal is fired, and returns the arguments fired from the signal.\\nYielding the current thread is not always desirable. If the desire is to only capture the next event\\nfired, using `ConnectOnce` might be a better solution.\\n```lua\\ntask.spawn(function()\\n\\tlocal msg, num = signal:Wait()\\n\\tprint(msg, num) --\x3e \\"Hello\\", 32\\nend)\\nsignal:Fire(\\"Hello\\", 32)\\n```","params":[],"returns":[{"desc":"","lua_type":"... any"}],"function_type":"method","yields":true,"source":{"line":338,"path":"src/shared/Repli/Signal.lua"}},{"name":"Destroy","desc":"Cleans up the signal.\\n\\nTechnically, this is only necessary if the signal is created using\\n`Signal.Wrap`. Connections should be properly GC\'d once the signal\\nis no longer referenced anywhere. However, it is still good practice\\nto include ways to strictly clean up resources. Calling `Destroy`\\non a signal will also disconnect all connections immediately.\\n```lua\\nsignal:Destroy()\\n```","params":[],"returns":[],"function_type":"method","source":{"line":365,"path":"src/shared/Repli/Signal.lua"}}],"properties":[],"types":[{"name":"SignalConnection","desc":"Represents a connection to a signal.\\n```lua\\nlocal connection = signal:Connect(function() end)\\nprint(connection.Connected) --\x3e true\\nconnection:Disconnect()\\nprint(connection.Connected) --\x3e false\\n```","fields":[{"name":"Connected","lua_type":"boolean","desc":""},{"name":"Disconnect","lua_type":"(SignalConnection) -> ()","desc":""}],"source":{"line":67,"path":"src/shared/Repli/Signal.lua"}},{"name":"ConnectionFn","desc":"A function connected to a signal.","lua_type":"(...any) -> ()","source":{"line":122,"path":"src/shared/Repli/Signal.lua"}}],"name":"Signal","desc":"Signals allow events to be dispatched and handled.\\n\\nFor example:\\n```lua\\nlocal signal = Signal.new()\\n\\nsignal:Connect(function(msg)\\n\\tprint(\\"Got message:\\", msg)\\nend)\\n\\nsignal:Fire(\\"Hello world!\\")\\n```","source":{"line":139,"path":"src/shared/Repli/Signal.lua"}}')}}]);