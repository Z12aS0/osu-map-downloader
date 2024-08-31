import time
import datetime
import urllib.request
import json
import os
import hashlib
import collections
import requests
import webbrowser
import subprocess
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

settings = {}
fastdb_ = ""

with open('mapDLsettings.json', 'r') as settings:
    settings = json.loads(settings.read())
    

cookies = settings['cookies']
api_key = settings["apikey"]
osudir = settings["osudir"]
fastdb = settings["fastdb"]
lastdltime = settings["last_download"]
mode = settings["mode"]

if lastdltime == "":
    lastdltime = "2007-01-01 00:00:00.000000"

date_format = '%Y-%m-%d'
start_date_stamp_ = datetime.datetime.strptime(lastdltime, '%Y-%m-%d %H:%M:%S.%f')
start_date_stamp = start_date_stamp_.strftime(date_format)
page_date = datetime.datetime.strptime(start_date_stamp, date_format)




db = {}

def get_next_date(ordered_dict):
    bm_key = next(reversed(ordered_dict))
    bm = ordered_dict[bm_key]
    date_str = (bm['approved_date'].split(' '))[0]
    return datetime.datetime.strptime(date_str, date_format)

def get_page(key, date):
    url_base = 'https://osu.ppy.sh/api/get_beatmaps?'
    url = url_base + 'k=' + key + '&since=' + date.strftime(date_format) + '&m=' + mode
    page = urllib.request.urlopen(url)
    return page.read()

def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

if fastdb == "1" and os.access('lastdownload', os.F_OK):
    with open('lastdownload', 'r') as lastdl:
        fastdb_ = json.loads(lastdl.read())
else: 
    if os.access('md5_mtime_db', os.F_OK):
        with open('md5_mtime_db', 'r') as mmdb:
            db = json.loads(mmdb.read())
    # Get a list of all beatmap md5s in songs folder
    walk = next(os.walk(osudir))
    dirs = walk[1]
    path = walk[0]
    md5s = {}
    for i, d in enumerate(dirs):
        print(f'Scanning songs folder... |{"█" * int(50 * i // len(dirs))}{"-" * (50 - int(50 * i // len(dirs)))}| ({(i/len(dirs)) * 100:.2f}%) [maps: {len(md5s):d}] ', end='\r')
        dir_path = os.path.join(path, d)
        files = next(os.walk(dir_path))[2]
        for f in files:
            if f[-3:] == 'osu':
                rel_path = os.path.join(d, f)
                abs_path = os.path.join(dir_path, f)
                f_mtime = os.path.getmtime(abs_path)
                if (rel_path in db) and (db[rel_path][0] == f_mtime):
                    md5s[db[rel_path][1]] = None
                else:
                    f_md5 = md5(abs_path)
                    md5s[f_md5] = None
                    db[rel_path] = (f_mtime, f_md5)

    with open('md5_mtime_db', 'w') as mmdb:
        mmdb.write(json.dumps(db))
                
    print(f'Scanning songs folder... |{"█" * 50}| (100%) [maps: {len(md5s):d}]', end='\n')

maps = collections.OrderedDict([])

num_maps = -1

while (num_maps != len(maps)):
    num_maps = len(maps)
    print(f'Downloading ranked/loved map list... [maps: {num_maps}]', end='\r')
    
    page = get_page(api_key, page_date)
    parsed_page = json.loads(page)

    for bm in parsed_page:
        if bm['approved'] != '3':
            maps[bm['file_md5']] = bm
    
    page_date = get_next_date(maps)

    time.sleep(1.1)

timenow = datetime.datetime.now()
stampnow = timenow.timestamp()
stampyesterday = stampnow - 24*60*60
timeyesterday = datetime.datetime.fromtimestamp(stampyesterday)


settings["last_download"] = str(timeyesterday)



    
driver = webdriver.Chrome()
time.sleep(0.5)
driver.minimize_window()
# Generate a set of all mapsets that are not present
missing = {}
ranked = 0
loved = 0
errors = 0

for key in maps:
    if maps[key]['approved'] == '4':
        loved += 1
    elif maps[key]['approved'] in ('1', '2'):
        ranked += 1
    else:
        errors += 1
    if fastdb == "1" and fastdb_ != "":
        if key not in fastdb_:
            missing[maps[key]['beatmapset_id']] = None
    else:
        if key not in md5s:
            missing[maps[key]['beatmapset_id']] = None

print('Map composition:')
print('    Ranked:  ' + str(ranked))
print('    Loved:   ' + str(loved))
print('    Unknown: ' + str(errors))
driver.get("https://osu.ppy.sh/")
for cookie in cookies:
    driver.add_cookie(cookie)
    
    
x_ = len(missing.keys())
if x_ == 0:
    settings["fastdb"] = "1"
    print('All ranked/loved maps accounted for.')
else:
    print('Missing maps by song id:')
    y_ = 1
    
    if(x_ >= 200):
        settings["fastdb"] = "0"
    else:
        settings["fastdb"] = "1"


    for key in missing.keys():
        driver.get("https://osu.ppy.sh/beatmapsets/" + key)
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//a[@class='btn-osu-big btn-osu-big--beatmapset-header ']"))).click()
        for i in range(10):
            sleft = int((((x_ - y_) * 10) - i) % 60)
            mleft = int(((x_ - y_) * 10) // 60)
            print(f'\r{key} |{"█" * int(50 * y_ // x_)}{"-" * (50 - int(50 * y_ // x_))}| {y_}/{x_} ({100 * y_ / float(x_):.2f}%) ({mleft}m{sleft}s left)', end="\n")
            time.sleep(1.0)
        y_ += 1
        if (y_ % 200) == 0:
            print('Osu rate limit exceeded. You may continue downloading later(about 1-2 hours)')
            break
driver.quit()





#save files
if settings["fastdb"] == "1":
    with open('lastdownload', 'w') as lastdl:
        lastdl.write(json.dumps(maps))
with open('mapDLsettings.json', 'w') as settingsdb:
    settingsdb.write(json.dumps(settings))
#subprocess.Popen('explorer "C:\\Users\\YOUR_USERNAME_HERE\\Downloads"')
#if you want to open downloads folder after finishing