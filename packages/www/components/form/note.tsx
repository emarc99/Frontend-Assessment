import { useState } from "react";
import api from "../../pages/api";

export default function NoteForm({ updateNote, owner, setIsCollapsed }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const note = { title, description, owner };
					const res = await api.post(`/notes/create`, note);

					await updateNote(res.data.data);
					setTitle("");
					setDescription("");
					setIsCollapsed(true);
				} catch (error) {
					console.log(error?.message);
				}
			}}
		>
			<input
				type="text"
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Title"
			/>
			<textarea
				name="description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Description"
			/>
			<button type="submit">Submit</button>
		</form>
	);
}