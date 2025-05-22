const allOnEvent = global.GoatBot.onEvent;

module.exports = {
	config: {
		name: "onEvent",
		version: "1.1",
		author: "NTKhang",
		description: "Handle all bot events globally (works in both group and inbox)",
		category: "events"
	},

	onStart: async (props) => {
		for (const item of allOnEvent) {
			if (typeof item === "string") continue;

			try {
				await item.onStart(props);
			} catch (err) {
				console.error(`Error in onEvent handler "${item.config?.name || 'unknown'}":`, err);
			}
		}
	}
};
