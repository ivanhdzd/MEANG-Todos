var thereAreChangesOnBeforeUnload = false;

window.onbeforeunload = function() {
	return CheckChangesOnBeforeUnload();
};

function CheckChangesOnBeforeUnload() {
	if (thereAreChangesOnBeforeUnload) return true;
}