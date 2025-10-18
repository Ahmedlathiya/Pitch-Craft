import React from "react";
import { useLocation } from "react-router-dom";

export default function GeneratedPitch() {
	const { state } = useLocation();
	const data = state?.generated || {};
	return (
		<div className="container">
			<h3>Generated Pitch</h3>
			<p className="small-muted">
				You can edit this later in Firestore or regenerate from Create Pitch.
			</p>
			<div className="pre-box">
				{typeof data === "string" ? (
					data
				) : (
					<pre style={{ margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
				)}
			</div>
			<div style={{ marginTop: 12 }}>
				<button onClick={() => window.print()}>Export as PDF (Print)</button>
			</div>
		</div>
	);
}
