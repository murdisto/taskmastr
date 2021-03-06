export const collatedTasks = [
	{ key: 'INBOX', name: 'Inbox' },
	{ key: 'TODAY', name: 'Today' },
	{ key: 'THIS_WEEK', name: 'This Week' },
];

export const getTitle = (projects, projectId) =>
	projects.find((project) => project.projectId === projectId);

export const getCollatedTitle = (projects, key) =>
	projects.find((project) => project.key === key);

export const collatedTasksExist = (selectedProject) =>
	collatedTasks.find((task) => task.key === selectedProject);

// Generate a new id for when a new task or project is created
export const generatePushId = (() => {
	const PUSH_CHARS =
		'-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

	const lastRandChars = [];

	return () => {
		let now = new Date().getTime();

		const timeStampChars = new Array(8);
		for (let i = 7; i >= 0; i--) {
			timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
			now = Math.floor(now / 64);
		}

		let id = timeStampChars.join('');

		for (let i = 0; i < 12; i++) {
			id += PUSH_CHARS.charAt(lastRandChars[i]);
		}

		return id;
	};
})();
