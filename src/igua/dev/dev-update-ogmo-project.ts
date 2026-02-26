import { DataItem } from "../objects/data-item";

export async function devUpdateOgmoProject() {
    const ogmoJson = await (await fetch("/fs/raw/ogmo/asshat-project.ogmo")).json();
    for (const entity of ogmoJson.entities) {
        for (const value of entity.values) {
            if (value.definition !== "Enum") {
                continue;
            }
            if (value.name === "itemId") {
                value.choices = DataItem.listIds();
            }
        }
    }
    await fetch("/fs/raw/ogmo/asshat-project.ogmo", {
        method: "POST",
        body: JSON.stringify(ogmoJson, undefined, 2),
    });
}
