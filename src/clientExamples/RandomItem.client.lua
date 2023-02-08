local ReplicatedStorage = game:GetService("ReplicatedStorage");
local Players = game:GetService("Players");

local Common = ReplicatedStorage:WaitForChild("Common");
local Repli = require(Common:WaitForChild("Repli"));

local RandomItems = Repli.fromValue("RandomItems");
local Player = Players.LocalPlayer;
local PlayerGui = Player:WaitForChild("PlayerGui");
local ScreenGui = PlayerGui:WaitForChild("ScreenGui");
local Template = script.RandomItem;

-- Reconcile the items in the frame
local function Reconcile(items)
    for _, item in pairs(ScreenGui.RandomItemFrame.Items:GetChildren()) do
        if (item:IsA("Frame") and items[tostring(item.Name)] == nil) then
            item:Destroy();
        end;
    end;
end

-- When the random items change, update the frame
local function randomItemsChanged(newValue)
    -- Reconcile the items in the frame
    Reconcile(newValue);

    -- Add new items
    for id, itemName in newValue do
        if (ScreenGui.RandomItemFrame.Items:FindFirstChild(id)) then
            continue;
        end;

        local newFrame = Template:Clone();
        newFrame.Name = id;
        newFrame.TextLabel.Text = itemName;
        newFrame.Parent = ScreenGui.RandomItemFrame.Items;
    end;
end
RandomItems:subscribe(randomItemsChanged);

-- When the player clicks the button, add a random item
ScreenGui.RandomItemFrame.AddRandomItem.MouseButton1Click:Connect(function()
    ReplicatedStorage.AddRandomItem:FireServer();
end);

