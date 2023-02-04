local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Promise = require(script.Parent.Promise);
local Signal = require(script.Parent.Signal);

-- Client side of the replication system
local RepliClient = {};
RepliClient.__index = RepliClient;

-- Example
--[[
    local Repli = require(ReplicatedStorage.Repli)
    local Value = Repli.fromClass("TestValue")

    Value:subscribe(function(value)
        print(value)
    end)

    Value:get() -- returns the value
]]

-- Connect to the server
local NewClassConnected = Signal.new();
local ClassesConnected = {};
local ClassConnectRemote = script.Parent._RepliConnect;
ClassConnectRemote.OnClientEvent:Connect(function(classConnectedTo, initialValue)
    -- Update classes connected to and fire the signal with the initial value
    ClassesConnected[classConnectedTo] = initialValue;
    NewClassConnected:Fire(classConnectedTo, initialValue);
end);

-- Wait for a class to be connected to
function WaitForClass(class)
    return Promise.new(function(resolve, reject)
        if (ClassesConnected[class]) then
            resolve(ClassesConnected[class]);
            return;
        end;

        local connection
        connection = NewClassConnected:Connect(function(classConnectedTo, initialValue)
            if (classConnectedTo ~= class) then
                return;
            end;

            connection:Disconnect();
            resolve(initialValue);
        end);
    end);
end

function RepliClient.fromClass(class)
    local self = setmetatable({}, RepliClient);
    self._isReady = false;
    self._changedSignal = Signal.new();
    self._value = nil;
    self._R = script.Parent._R;

    -- Tell server we are ready to receive data and whatnot
    local ClassReadyRemote = script.Parent._RepliClassReady;
    ClassReadyRemote:FireServer(class);

    -- Wait for the server to allow us to connect to the class
    WaitForClass(class):await();
    self._remoteEvent = self._R:FindFirstChild("RepliEvent_" .. class);
    self._value = ClassesConnected[class];
    self._isReady = true;

    -- Once we are connected, we can start listening for changes
    self:onReady():andThen(function()
        self._changedSignal:Fire(self._value);

        -- Listen for further changes
        self._furtherChanges = self._remoteEvent.OnClientEvent:Connect(function(value)
            if (value == self._value) then
                return;
            end;

            self._value = value;
            self._changedSignal:Fire(value);
        end);
    end);
    
    return self;
end

-- Check if this client class is ready
function RepliClient:isReady()
    return self._isReady;
end

-- Wait for the remote to be ready and fire the initial value
function RepliClient:onReady()
    if (self._isReady) then
        Promise.resolve(self._value);
    end

    return Promise.fromEvent(self._remoteEvent.OnClientEvent, function(value)
		self._value = value
		self._isReady = true
		return true
	end)
    :andThen(function()
		return self._value
	end)
end

-- Subscribe to changes
-- Does initial value and any further changes
function RepliClient:subscribe(callback)
    task.defer(function()
        if (self._isReady) then
            callback(self._value);
        end
    end)

    return self._changedSignal:Connect(callback);
end

-- Get the current value
function RepliClient:get()
    return self._value;
end

return table.freeze(RepliClient);