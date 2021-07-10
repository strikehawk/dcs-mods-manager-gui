# `DCS World` mods manager GUI 
An [Electron](https://www.electronjs.org/)-based mods manager for [DCS World](https://www.digitalcombatsimulator.com/en/products/world/) similar to [OvGME](https://github.com/jweisner/ovgme).

# Presentation
The manager currently handles two types of mods (more user content could be supported later):
- Aircrafts
- Aircraft Liveries
- Aircraft kneeboards
- Tech modules

To keep a DCS installation clean, user content should be installed in the user profile folder for DCS, not in the main installation folder.  
This folder is located at `C:\Users\<username>\Saved Games\DCS` (for the stable release of client, end folder will be different for Beta versions, or for the standalone server).

To achieve this, as well as providing an easy way to enable or disable a mod, the manager uses symbolic links between a 'master' mods folder, where all user content should reside, and the DCS user folder.

# Instructions
## Setting up the 'master' mods folder
The 'master' mods folder is where you should put any mod for DCS. The manager will list its content and provide a graphical user interface to enable or disable the content.  
This folder can be located anywhere. It should contain the following sub-folders:
- `Aircrafts`, where all the aircraft mods should be stored.
- `Liveries`, where all the aircraft liveries should go.
- `Kneeboard`, where all the aircraft custom kneeboards should go.
- `Tech`, where all the tech modules should go.

If the sub-folders do not exist, the manager will create them.

## Running the application
Please note that running the application requires Administrator privileges in order to be able to create symbolic links.

## General notes
Do not use '.' characters in folder names, or bad things will happen. Yes. Don't even try.

## Installing an aircraft mod
### Preparing the mod
Each aircraft mod should be structured as a main folder named after the aircraft identifier. All the content of the mod should belong to this folder.  
To find the aircraft identifier, look in the `entry.lua` file of the mod. The first line should be something like this:

```
declare_plugin("<Mod identifier>",
```
Create a folder named `<Mod identifier>` in the parent `Aircrafts` folder, and copy there the content of the mod.

### Enabling the mod
Run the manager, go to 'Aircrafts', and install the desired mod.

## Installing a livery for an aircraft
### Preparing the mod
All liveries are grouped by their target aircraft. In the parent `Liveries` folder, create a folder named after the identifier of the aircraft (see above on how to find the identifier of a given aircraft). In this aircraft folder, create a folder for the livery itself, and copy the content of the mod in the new folder.  
By default, a livery appears in the game as the name of its folder, except if a specific name was provided in the `name` field of the `description.lua` file of the mod.

### Enabling the mod
Run the manager, go to 'Liveries', and install the desired mod.

## Installing custom kneeboards for an aircraft
### Preparing the kneeboards
Custom aircraft kneeboard pages are available whenever you fly the targeted aircraft. All images should be put in a single folder, named after the targeted aircraft identifier. See `Installing an aircraft mod` to get the aircraft identifier. Note that this manager does not install each page individually, it installs all pages contained in the folder.

### Enabling the mod
Run the manager, go to 'Kneeboards', and install the pages for the desired aircraft.

## Installing a tech module
### Preparing the mod
A tech module should be structured as a main folder containing all the underlying content. In the `Tech` folder, simply copy the Tech module folder.

### Enabling the mod
Run the manager, go to 'Tech modules', and install the desired mod.

# Technical notes
This app is based on the Electron + Angular bootstrap by Maxime GRIS (https://github.com/maximegris/angular-electron)
