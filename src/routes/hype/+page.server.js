// src/routes/+page.server.js
import { fail, redirect } from "@sveltejs/kit";
import { achievementActions } from "$lib/stores"; // Assuming stores can be used on the server

/** @type {import('./$types').Actions} */
export const actions = {
  save: async ({ request }) => {
    const data = await request.formData();

    const id = data.get("id");
    const title = data.get("title");
    const category = data.get("category");
    const description = data.get("description");

    // Basic server-side validation
    if (!title || !category || !description) {
      return fail(400, { message: "Please fill in all fields." });
    }

    // Reconstruct the original fields from the new description field if needed
    // For this example, we'll just store the new consolidated fields.
    const achievementData = {
      title,
      date: new Date().toISOString().split("T")[0],
      description,
      context: "",
      impact: "",
    };

    if (id) {
      achievementActions.update(id.toString(), achievementData);
    } else {
      achievementActions.add(achievementData);
    }

    // Success, redirect back to hype page
    throw redirect(303, "/hype");
  },
};
