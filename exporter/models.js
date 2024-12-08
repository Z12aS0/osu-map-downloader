exports.Beatmap = {
	name: 'Beatmap',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		DifficultyName: 'string?',
		Ruleset: 'Ruleset',
		Difficulty: 'BeatmapDifficulty',
		Metadata: 'BeatmapMetadata',
		UserSettings: 'BeatmapUserSettings',
		BeatmapSet: 'BeatmapSet',
		Status: 'int',
		OnlineID: { type: 'int', indexed: true },
		Length: 'double',
		BPM: 'double',
		Hash: 'string?',
		StarRating: 'double',
		MD5Hash: 'string?',
		OnlineMD5Hash: 'string?',
		LastLocalUpdate: 'date?',
		LastOnlineUpdate: 'date?',
		Hidden: 'bool',
		EndTimeObjectCount: 'int',
		TotalObjectCount: 'int',
		AudioLeadIn: 'double',
		StackLeniency: 'float',
		SpecialStyle: 'bool',
		LetterboxInBreaks: 'bool',
		WidescreenStoryboard: 'bool',
		EpilepsyWarning: 'bool',
		SamplesMatchPlaybackRate: 'bool',
		LastPlayed: 'date?',
		DistanceSpacing: 'double',
		BeatDivisor: 'int',
		GridSize: 'int',
		TimelineZoom: 'double',
		EditorTimestamp: 'double?',
		CountdownOffset: 'int'
	}
}

exports.BeatmapCollection = {
	name: 'BeatmapCollection',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		Name: 'string?',
		BeatmapMD5Hashes: 'string?[]',
		LastModified: 'date'
	}
}

exports.BeatmapDifficulty = {
	name: 'BeatmapDifficulty',
	embedded: true,
	properties: {
		DrainRate: 'float',
		CircleSize: 'float',
		OverallDifficulty: 'float',
		ApproachRate: 'float',
		SliderMultiplier: 'double',
		SliderTickRate: 'double'
	}
}

exports.BeatmapMetadata = {
	name: 'BeatmapMetadata',
	properties: {
		Title: 'string?',
		TitleUnicode: 'string?',
		Artist: 'string?',
		ArtistUnicode: 'string?',
		Author: 'RealmUser',
		Source: 'string?',
		Tags: 'string?',
		PreviewTime: 'int',
		AudioFile: 'string?',
		BackgroundFile: 'string?'
	}
}

exports.BeatmapSet = {
	name: 'BeatmapSet',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		OnlineID: { type: 'int', indexed: true },
		DateAdded: 'date',
		DateSubmitted: 'date?',
		DateRanked: 'date?',
		Beatmaps: 'Beatmap[]',
		Files: 'RealmNamedFileUsage[]',
		Status: 'int',
		DeletePending: 'bool',
		Hash: 'string?',
		Protected: 'bool'
	}
}

exports.BeatmapUserSettings = {
	name: 'BeatmapUserSettings',
	embedded: true,
	properties: {
		Offset: 'double'
	}
}

exports.File = {
	name: 'File',
	primaryKey: 'Hash',
	properties: {
		Hash: 'string?'
	}
}

exports.KeyBinding = {
	name: 'KeyBinding',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		RulesetName: 'string?',
		Variant: 'int?',
		Action: 'int',
		KeyCombination: 'string?'
	}
}

exports.ModPreset = {
	name: 'ModPreset',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		Ruleset: 'Ruleset',
		Name: 'string?',
		Description: 'string?',
		Mods: 'string?',
		DeletePending: 'bool'
	}
}

exports.RealmNamedFileUsage = {
	name: 'RealmNamedFileUsage',
	embedded: true,
	properties: {
		File: 'File',
		Filename: 'string?'
	}
}

exports.RealmUser = {
	name: 'RealmUser',
	embedded: true,
	properties: {
		OnlineID: 'int',
		Username: 'string?',
		CountryCode: 'string?'
	}
}

exports.Ruleset = {
	name: 'Ruleset',
	primaryKey: 'ShortName',
	properties: {
		ShortName: 'string?',
		OnlineID: { type: 'int', indexed: true },
		Name: 'string?',
		InstantiationInfo: 'string?',
		LastAppliedDifficultyVersion: 'int',
		Available: 'bool'
	}
}

exports.RulesetSetting = {
	name: 'RulesetSetting',
	properties: {
		RulesetName: { type: 'string?', indexed: true },
		Variant: { type: 'int', indexed: true },
		Key: 'string',
		Value: 'string'
	}
}

exports.Score = {
	name: 'Score',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		BeatmapInfo: 'Beatmap',
		ClientVersion: 'string?',
		BeatmapHash: 'string?',
		Ruleset: 'Ruleset',
		Files: 'RealmNamedFileUsage[]',
		Hash: 'string?',
		DeletePending: 'bool',
		TotalScore: 'int',
		TotalScoreWithoutMods: 'int',
		TotalScoreVersion: 'int',
		LegacyTotalScore: 'int?',
		BackgroundReprocessingFailed: 'bool',
		MaxCombo: 'int',
		Accuracy: 'double',
		Date: 'date',
		PP: 'double?',
		OnlineID: { type: 'int', indexed: true },
		LegacyOnlineID: { type: 'int', indexed: true },
		User: 'RealmUser',
		Mods: 'string?',
		Statistics: 'string?',
		MaximumStatistics: 'string?',
		Rank: 'int',
		Combo: 'int',
		IsLegacyScore: 'bool'
	}
}

exports.Skin = {
	name: 'Skin',
	primaryKey: 'ID',
	properties: {
		ID: 'uuid',
		Name: 'string?',
		Creator: 'string?',
		InstantiationInfo: 'string?',
		Hash: 'string?',
		Protected: 'bool',
		Files: 'RealmNamedFileUsage[]',
		DeletePending: 'bool'
	}
}

