const models = require("./models");
const fs = require("fs");
const Realm = require("realm");
const output = {};
(async () => {
	let realm_db = process.argv[2];

	const realm = await Realm.open({
		path: realm_db,
		schema: [
			models.BeatmapSet,
			models.File,
			models.Beatmap,
			models.KeyBinding,
			models.Ruleset,
			models.BeatmapDifficulty,
			models.BeatmapMetadata,
			models.RealmNamedFileUsage,
			models.RealmUser,
			models.BeatmapUserSettings
		],
		schemaVersion: 43,
	});

	try {
		const beatmaps = realm.objects('Beatmap');
		beatmaps.forEach(beatmap => {
			if (beatmap.OnlineID && beatmap.MD5Hash) {
				output[beatmap.OnlineID] = { file_md5: beatmap.MD5Hash };
			}
		});
		console.log("Total maps: " + beatmaps.length)
	} catch (e) {
		console.log(e)
	} finally {
		realm.close();
	}
	try {
		fs.writeFileSync('clientrealm.json', JSON.stringify(output, null, 2));
	} catch (error) {
		console.error('Error writing file:', error);
	}
	process.exit();
})().catch((error) => {
	if (error == "Error: History schema version not consistent") {
		console.log('Please close osu!lazer before retrying.')
	} else {
		console.log(`An error occurred: ${error}`)
	}
	process.exit();
});

