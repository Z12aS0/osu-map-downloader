# osu-map-downloader
python script for downloading osu maps in the background using selenium.

Rate limits of 6/minute and 200/hour 

### other links
[original script](https://osu.ppy.sh/community/forums/topics/692972)


[downloads for all ranked/loved osu maps with no rate limits](https://osu.ppy.sh/community/forums/topics/330552)

## Running
	After installing the project as zip, run maps.bat or the python file directly.
 	Maybe check for suspicious code if you are paranoid :)

## Requirements:
- google chrome browser or any other selenium supported browser(edit line 125 and related lines)
- python
- selenium
- requests module
- api key(<https://osu.ppy.sh/p/api/>)
- osu cookie(<https://chrome.google.com/webstore/detail/cookie-tab-viewer/fdlghnedhhdgjjfgdpgpaaiddipafhgk>)

## config file:
	To edit:
		cookies - for osu cookies
		apikey - for osu api key
		osudir - path to osu as shown in example
		mode - osu gamemode 0-std 1-taiko 2-catch 3-mania
	Not to edit:
		last_download - keep blank as default
		fastdb - keep as 0 by default for when running it the first time


## how to get osu cookie:
	get this chrome extension(or similar ones for other browsers)
	https://chrome.google.com/webstore/detail/cookie-tab-viewer/fdlghnedhhdgjjfgdpgpaaiddipafhgk
	go to osu site
	be logged in and use the extension to get the "osu_session" cookie

## how to get osu api key: 
	visit this link
	https://osu.ppy.sh/p/api/
	bottom of the page

## imports:
	in cmd or powershell type
	"pip install requests" -for api requests
	"pip install selenium" -webdriver required for it to run

## misc:
	at the  bottom of the script you can enable opening download folder after downloading 




## [osu!taiko Bulgaria discord server](https://discord.gg/ryNtbzqJH4)
